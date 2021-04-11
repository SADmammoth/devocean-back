module.exports = {
  friendlyName: 'Folder',

  description: 'Get collection of task folders and lists',

  inputs: {},

  fn: async function () {
    const lists = await TaskCollection.find();

    if (!lists) {
      return [];
    }

    let newList;

    const list = await Promise.all(
      lists.map(async (list) => {
        newList = await sails.helpers.populateListWithType(list);
        if (newList.type === 'list') {
          newList = await sails.helpers.populateListWithTasks(newList);
        } else {
          newList = await sails.helpers.populateListWithChildren(newList);
        }
        return newList;
      })
    );

    return list;
  },
};
