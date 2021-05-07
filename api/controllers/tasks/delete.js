module.exports = {
  friendlyName: 'Task',

  description: 'Delete task.',

  inputs: {
    id: {
      type: 'string',
      meta: { swagger: { in: 'path' } },
    },
  },

  exits: {},

  fn: async function ({ id }) {
    const task = await Task.destroyOne({ id });
    return task;
  },
};
