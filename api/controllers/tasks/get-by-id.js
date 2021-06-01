module.exports = {
  friendlyName: 'Task',

  description: 'Get full task content by id',

  inputs: {
    id: { type: 'string', required: true, meta: { swagger: { in: 'path' } } },
  },

  exits: {
    success: {},
    notFound: {
      responseType: 'notFound',
    },
  },

  fn: async function ({ id }) {
    const query = () => Task.findOne({ id });
    const fullTask = await sails.helpers.populateFullTask(query);

    if (!fullTask) {
      throw 'notFound';
    }

    return fullTask;
  },
};
