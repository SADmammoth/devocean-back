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
      defaultsTo: 'sails.config.custom.rootListName',
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
      defaultsTo: 'No template',
      meta: { swagger: { in: 'body' } },
    },
    customFields: {
      type: 'json',
      meta: { swagger: { in: 'body' } },
    },

    authorization: {
      type: 'string',
      meta: { swagger: { in: 'query' } },
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
    authorization,
  }) {
    let {
      teammateId: author,
      login,
      workspaceId,
    } = await sails.helpers.requestUserData(authorization);
    const foundStatus = await Status.findOne({
      or: [
        { name: status, workspaceId },
        { id: status, workspaceId },
      ],
    });
    const foundList = await TaskCollection.findOne({
      or: [
        { name: list, workspaceId },
        { id: list, workspaceId },
      ],
    });

    const foundTemplate = await Template.findOne({
      or: [
        { name: template, workspaceId },
        { id: template, workspaceId },
      ],
    });

    if (!author) author = login;

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
      author,
      contributors: [author],
    }).fetch();

    const query = () => Task.findOne({ id: task.id });

    if (!teammate) {
      return await sails.helpers.populateFullTask(query);
    }

    await sails.helpers.assignTask(task.id, teammate, new Date());

    return await sails.helpers.populateFullTask(query);
  },
};
