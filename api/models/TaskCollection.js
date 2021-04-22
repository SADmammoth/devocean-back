const collectionTypes = require('../types/enums/collectionTypes');

module.exports = {
  attributes: {
    name: { type: 'string', required: true, unique: true },
    type: { type: 'string', isIn: collectionTypes, required: true },
    children: {
      collection: 'taskcollection',
      via: 'parent',
    },
    tasks: { collection: 'task', via: 'list' },
    parent: {
      model: 'taskcollection',
    },
    tag: {
      model: 'tag',
    },

    isConstant: {
      type: 'boolean',
    },
  },
};
