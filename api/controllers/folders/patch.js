module.exports = {
  friendlyName: 'Folder',

  description: 'Patch folder',

  inputs: {
    id: { type: 'string', required: true, meta: { swagger: { in: 'head' } } },
    name: { type: 'string', required: true, meta: { swagger: { in: 'body' } } },
    children: { type: 'ref', meta: { swagger: { in: 'body' } } },
    tasks: { type: 'ref', meta: { swagger: { in: 'body' } } },
    tag: { type: 'json', meta: { swagger: { in: 'body' } } },
  },

  exits: {},

  fn: async function ({ id, name, children, tasks, tag }) {
    let tagToSave;
    if (typeof tag === 'string') {
      tagToSave = await Tag.updateOne({ id: tag }, { tasks }).fetch();
    } else if (tag && tag.color && tag.name) {
      tagToSave = await Tag.create({ ...tag, tasks }).fetch();
    }

    let tagToSaveId;
    if (tagToSave) {
      tagToSaveId = tagToSave.id;
    }

    const folder = await TaskCollection.updateOne(
      { id },
      {
        name,
        children,
        tag: tagToSaveId,
      }
    );

    return folder;
  },
};
