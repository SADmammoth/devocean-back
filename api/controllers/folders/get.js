const _ = require('@sailshq/lodash');

module.exports = {
  friendlyName: 'Folder',

  description: 'Get collection of task folders and lists',

  inputs: {},

  fn: async function () {
    const lists = await TaskCollection.find()
      .populate('tasks')
      .populate('children');

    if (!lists) {
      return [];
    }

    const list = await Promise.all(
      lists.map(async (list) => {
        return await sails.helpers.populateList(_.omit(list, 'tag'));
      })
    );

    return list;
  },
};
