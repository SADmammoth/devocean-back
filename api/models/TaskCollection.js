module.exports = {
  attributes: {
    name: { type: 'string', required: true, unique: true },
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
  },

  customToJSON: function () {
    return sails.helpers.populateListWithType(this);
  },
};
