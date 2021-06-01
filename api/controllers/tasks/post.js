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
    return await sails.helpers.actions.postTask(
      title,
      priority,
      estimate,
      reportedTime,
      list,
      status,
      teammate,
      template,
      customFields,
      authorization || this.req.headers.authorization.replace('Bearer ', ''),
    );
  },
};
