module.exports = {
  friendlyName: 'Folder',

  description: 'Get task folder or list',

  inputs: {
    id: {
      type: 'string',
      description: 'List id',
      required: true,
    },
  },

  fn: async function ({ id }) {
    const lists = await TaskCollection.findOne({ id });

    const list = await Promise.all(
      lists.map(async (list) => {
        const newList = await sails.helpers.populateListWithTasks(list);
        return await sails.helpers.populateListWithType(newList);
      })
    );

    return list;
  },
};
