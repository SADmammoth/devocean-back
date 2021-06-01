const _ = require('@sailshq/lodash');

module.exports = {
  friendlyName: 'Folder',

  description: 'Get collection of task folders and lists',

  inputs: {},

  fn: async function () {
    const lists = await TaskCollection.find()
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
