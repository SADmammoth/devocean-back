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
    const tagToSave = await sails.helpers.getTag(tag, tasks);

    let tagToSaveId;
    if (tagToSave) {
      tagToSaveId = tagToSave.id;
    }

    const folder = await TaskCollection.create({
      name,
      children,
      tag: tagToSaveId,
    });

    return folder;
  },
};
