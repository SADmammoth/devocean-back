module.exports = {
  friendlyName: 'Comment',

  description: 'Post reports.',

  inputs: {
    id: {
      type: 'string',
      meta: { swagger: { in: 'path' } },
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

  exits: {
    badRequest: {
      responseType: 'badRequest',
    },
  },

  fn: async function ({ id, reportedTime, activity }) {
    const task = await Task.findOne({ id });

    if (!task) {
      throw 'badRequest';
    }

    let { teammateId, login } = await sails.helpers.requestUserData(
      authorization || this.req.headers.authorization.replace('Bearer ', ''),
    );

    if (!teammateId) teammateId = login;

    const report = await Report.create({
      task: id,
      author: teammateId,
      estimate: task.estimate,
      reportedTime,
      activity,
    }).fetch();

    await Task.updateOne(
      { id },
      { reportedTime: (task.reportedTime || 0) + reportedTime },
    );

    return report;
  },
};
