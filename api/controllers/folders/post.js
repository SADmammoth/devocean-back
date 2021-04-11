module.exports = {
  friendlyName: 'Folder',

  description: 'Post folder',

  inputs: {
    name: { type: 'string', required: true, meta: { swagger: { in: 'body' } } },
    children: { type: 'ref', meta: { swagger: { in: 'body' } } },
    tasks: { type: 'ref', meta: { swagger: { in: 'body' } } },
    tag: { type: 'json', meta: { swagger: { in: 'body' } } },
  },

  exits: {},

  fn: async function ({ name, children, tasks, tag }) {
    let tagToSave;
    if (typeof tag === 'string') {
      tagToSave = await Tag.updateOne({ id: tag }, { tasks }).fetch();
    } else if (tag.color && tag.name) {
      tagToSave = await Tag.create({ ...tag, tasks }).fetch();
    }

    const folder = await TaskCollection.create({
      name,
      children,
      tag: tagToSave.id,
    });

    return folder;
  },
};
