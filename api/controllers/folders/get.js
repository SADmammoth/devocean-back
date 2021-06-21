const _ = require('@sailshq/lodash');

module.exports = {
  friendlyName: 'Folder',

  description: 'Get collection of task folders and lists',

  inputs: {
    authorization: {
      type: 'string',
    },
  },

  fn: async function ({ authorization }) {
    let { workspaceId } = await sails.helpers.requestUserData(
      authorization || this.req.headers.authorization.replace('Bearer ', ''),
    );
    const lists = await TaskCollection.find({ workspaceId })
      .populate('tasks')
      .populate('children')
      .populate('tag');

    if (!lists) {
      return [];
    }

    const list = await Promise.all(
      lists.map(async (list) => {
        return await sails.helpers.populateList(list);
      }),
    );

    return list;
  },
};
