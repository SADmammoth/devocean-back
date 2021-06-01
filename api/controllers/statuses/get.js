module.exports = {
  friendlyName: 'Status',

  description: 'Get statuses',

  inputs: {},

  exits: {},

  fn: async function () {
    const statuses = await Status.find().populate('tasks');
    return statuses.map(({ id, tasks, ...fields }) => ({
      ...fields,
      tasks: tasks.map(({ id }) => id),
    }));
  },
};
