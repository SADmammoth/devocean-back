module.exports = {
  friendlyName: 'Folder',

  description: 'Get collection of task folders and lists',

  inputs: {},

  fn: async function () {
    const lists = await TaskCollection.find();

    const list = await Promise.all(
      lists.map(async (list) => {
        const newList = await sails.helpers.populateListWithTasks(list);
        return await sails.helpers.populateListWithType(newList);
      })
    );

    return list;
  },
};
