module.exports = {
  attributes: {
    name: { type: 'string', required: true, unique: true },
    children: {
      collection: 'taskcollection',
      via: 'parent',
      custom: function () {
        return !this.tag;
      },
    },
    parent: {
      model: 'taskcollection',
    },
    tag: {
      model: 'tag',
      custom: function () {
        return !this.children || !this.children.length;
      },
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
