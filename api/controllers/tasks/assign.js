module.exports = {
  friendlyName: 'Task',

  description: 'Assign teammate to task',

  inputs: {
    id: {
      type: 'string',
      description: 'Task id to add assignee',
      required: true,
      meta: { swagger: { in: 'path' } },
    },
    teammateId: {
      type: 'string',
      require: true,
      meta: { swagger: { in: 'body' } },
    },
    assignedDate: {
      type: 'string',
      meta: { swagger: { in: 'body' } },
    },
    authorization: {
      type: 'string',
    },
  },

  exits: {},

  fn: async function ({ id, teammateId, assignedDate, authorization }) {
    const task = await sails.helpers.assignTask(id, teammateId, assignedDate);
    if (!task) {
      return 'notFound';
    }

    let { teammateId: author, login } = await sails.helpers.requestUserData(
      authorization || this.req.headers.authorization.replace('Bearer ', ''),
    );

    if (!author) author = login;

    await Task.addToCollection(id, 'contributors').members([author]);

    const query = () => Task.findOne({ id: task.id });

    return await sails.helpers.populateFullTask(query);
  },
};
