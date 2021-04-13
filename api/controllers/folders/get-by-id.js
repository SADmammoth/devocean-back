const _ = require('@sailshq/lodash');

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

  exits: {
    success: {},
    notFound: {
      responseType: 'notFound',
    },
  },

  fn: async function ({ id }) {
    const list = await TaskCollection.findOne({ id })
      .populate('tag')
      .populate('tasks')
      .populate('children');

    if (!list) {
      throw 'notFound';
    }
    const parent = await TaskCollection.findOne({ id: list.parent });

    const newList = {
      ...list,
      parent: { id: parent.id, name: parent.name },
      tag: _.omit(list.tag, 'id'),
    };

    return newList;
  },
};
