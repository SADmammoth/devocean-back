module.exports = {
  attributes: {
    name: { type: 'string', required: true, unique: true },
    children: {
      collection: 'taskcollection',
      via: 'parent',
    },
    parent: {
      model: 'taskcollection',
    },
    tag: {
      model: 'tag',
    },
  },

  customToJSON: function () {
    let type = 'unknown';
    if (this.children && this.children.length) {
      type = 'list';
    }
    if (this.tag) {
      type = 'folder';
    }
    const { id, ...fields } = this;
    return { id, type, ...fields };
  },
};
