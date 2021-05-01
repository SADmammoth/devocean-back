module.exports = {
  friendlyName: 'Task',

  description: 'Post task',

  inputs: {
    title: {
      type: 'string',
      required: true,
      meta: { swagger: { in: 'body' } },
    },
    priority: {
      type: 'string',
      description: 'Name of priority level',
      required: true,
      meta: { swagger: { in: 'body' } },
    },
    estimate: {
      type: 'number',
      description: 'In milliseconds',
      meta: { swagger: { in: 'body' } },
    },
    reportedTime: {
      type: 'number',
      description: 'In milliseconds',
      meta: { swagger: { in: 'body' } },
    },
    list: {
      type: 'string',
      defaultsTo: 'Root list',
      description: 'List id or name',
      meta: { swagger: { in: 'body' } },
    },
    status: {
      type: 'string',
      defaultsTo: 'backlog',
      description: 'Id or name of status',
      meta: { swagger: { in: 'body' } },
    },
    teammate: {
      type: 'string',
      description: 'Id of teammate to assign task',
      meta: { swagger: { in: 'body' } },
    },
    template: {
      type: 'string',
      meta: { swagger: { in: 'body' } },
    },
    customFields: {
      type: 'json',
      meta: { swagger: { in: 'body' } },
    },
  },

  exits: {},

  fn: async function ({
    title,
    priority,
    estimate,
    reportedTime,
    list,
    status,
    teammate,
    template,
    customFields,
  }) {
    const foundStatus = await Status.findOne({ name: status });
    const foundList = await TaskCollection.findOne({
      or: [{ name: list }, { id: list }],
    });

    const foundTemplate = await Template.findOne({
      name: template || 'No template',
    });

    const task = await Task.create({
      title,
      priority,
      estimate,
      reportedTime,
      list: foundList.id,
      status: foundStatus.id,
      timeInStatus: new Date(),
      template: foundTemplate.id,
      customFields,
    }).fetch();

    if (!teammate) {
      return task;
    }

    await sails.helpers.assignTask(task.id, teammate.id, new Date());

    const query = () => Task.findOne({ id: task.id });

    return await sails.helpers.populateFullTask(query);
  },
};
