module.exports = {
  friendlyName: 'Task',

  description: 'Post task',

  inputs: {
    title: {
      type: 'string',
      required: true,
    },
    priority: {
      type: 'string',
      description: 'Name of priority level',
      required: true,
    },
    estimate: {
      type: 'number',
      description: 'In milliseconds',
    },
    reportedTime: {
      type: 'number',
      description: 'In milliseconds',
    },
    tag: { type: 'string', description: 'Tag id' },
    status: { type: 'string', description: 'Id or name of status' },
    teammate: { type: 'string', description: 'Id of teammate to assign task' },
    description: {
      type: 'string',
    },
  },

  exits: {},

  fn: async function ({
    title,
    priority,
    estimate,
    reportedTime,
    tag,
    status,
    teammate,
    description,
  }) {
    const defaultStatus = await Status.findOne({ name: 'backlog' });
    const defaultTag = await Tag.findOne({ name: 'Root' });

    const task = await Task.create({
      title,
      priority,
      estimate,
      reportedTime,
      tag: tag || defaultTag.id,
      status: status || defaultStatus.id,
      timeInStatus: new Date(),
      description,
    }).fetch();

    if (!teammate) {
      return task;
    }

    return await sails.helpers.assignTask(task.id, teammate.id, new Date());
  },
};
