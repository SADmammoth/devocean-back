module.exports = {
  friendlyName: 'Folder',

  description: 'Post folder',

  inputs: {
    name: { type: 'string', required: true, meta: { swagger: { in: 'body' } } },
    children: { type: 'ref', meta: { swagger: { in: 'body' } } },
    tasks: { type: 'ref', meta: { swagger: { in: 'body' } } },
    tag: { type: 'json', meta: { swagger: { in: 'body' } } },
    listId: { type: 'string', meta: { swagger: { in: 'body' } } },
    parent: { type: 'string', meta: { swagger: { in: 'body' } } },
  },

  exits: {
    badRequest: {
      responseType: 'badRequest',
    },
  },

  fn: async function ({ name, children, tasks, tag, parent }) {
    if ((tag && children) || (children && tasks)) {
      throw {
        badRequest: {
          message:
            'Ambiguous request params: ' +
            'unable to determine is it collection ' +
            'with children collections or with tasks/tag',
        },
      };
    }

    let tagToSaveId;
    if (tag) {
      const tagToSave = await sails.helpers.getTag(tag, tasks);
      tagToSaveId = tagToSave ? tagToSave.id : null;
    }

    if (!tagToSaveId && !tag) {
      tagToSaveId = await Tag.create({ color: '', name, tasks }).fetch();
    }

    if (!tagToSaveId) {
      throw {
        badRequest: {
          message: `Please provide id or {color, name} in "tag" field`,
        },
      };
    }

    if (!parent) {
      const rootFolder = await TaskCollection.findOne({ name: 'Root folder' });
      parent = rootFolder.id;
    }

    const folder = await TaskCollection.create({
      name,
      children,
      tag: tagToSaveId,
      parent,
    }).fetch();

    return folder;
  },
};
