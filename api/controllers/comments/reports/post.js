module.exports = {
  friendlyName: 'Comment',

  description: 'Post reports.',

  inputs: {
    id: {
      type: 'string',
      meta: { swagger: { in: 'path' } },
    },
    time: { type: 'string', required: true, meta: { swagger: { in: 'body' } } },
    author: {
      type: 'string',
      required: true,
      meta: { swagger: { in: 'body' } },
    },
    reportedTime: {
      type: 'number',
      required: true,
      meta: { swagger: { in: 'body' } },
    },
    activity: {
      type: 'string',
      meta: { swagger: { in: 'body' } },
    },
  },

  exits: {},

  fn: async function ({ id, time, author, reportedTime, activity }) {
    const task = await Task.findOne({ id });

    const report = await Report.create({
      task: id,
      time,
      author,
      estimate: task.estimate,
      reportedTime,
      activity,
    }).fetch();

    await Task.updateOne(
      { id },
      { reportedTime: (task.reportedTime || 0) + reportedTime }
    );

    return report;
  },
};
