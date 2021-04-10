module.exports = {
  attributes: {
    name: { type: 'string', required: true },
    children: {
      collection: 'taskcollection',
      via: 'parent',
    },
    parent: {
      model: 'taskcollection',
    },
    tag: { model: 'tag' },
  },

  customToJSON: function () {
    const type =
      !this.collection || !this.collection.length ? 'list' : 'folder';
    const { id, ...fields } = this;
    return { id, type, ...fields };
  },
};
