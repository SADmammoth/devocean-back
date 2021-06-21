module.exports = {
  friendlyName: 'Status',

  description: 'Get statuses',

  inputs: {
    authorization: {
      type: 'string',
    },
  },

  fn: async function ({ authorization }) {
    let { workspaceId } = await sails.helpers.requestUserData(
      authorization || this.req.headers.authorization.replace('Bearer ', ''),
    );
    const statuses = await Status.find({ workspaceId }).populate('tasks');
    return statuses.map(({ id, tasks, ...fields }) => ({
      ...fields,
      tasks: tasks.map(({ id }) => id),
    }));
  },
};
