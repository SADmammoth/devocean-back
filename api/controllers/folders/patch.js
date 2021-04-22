module.exports = {
  friendlyName: 'Folder',

  description: 'Patch folder',

  inputs: {
    id: { type: 'string', required: true, meta: { swagger: { in: 'path' } } },
    name: { type: 'string', meta: { swagger: { in: 'body' } } },
    children: { type: 'ref', meta: { swagger: { in: 'body' } } },
    tasks: { type: 'ref', meta: { swagger: { in: 'body' } } },
    tag: { type: 'json', meta: { swagger: { in: 'body' } } },
  },

  exits: {
    success: { outputType: 'ref' },
    badRequest: {
      responseType: 'badRequest',
    },
  },

  fn: async function ({ id, name, parent, tag }) {
    const folder = await TaskCollection.findOne({ id })
      .populate('children')
      .populate('tasks');

    if (folder.isConstant) {
      throw {
        badRequest: {
          message: 'Collection you trying to change is not editable',
        },
      };
    }

    const typeByFields = sails.helpers.getCollectionTypeByFields.with({
      children: folder.children,
      tasks: folder.tasks,
      tag: tag || folder.tag,
    });

    console.log(folder, tag);
    if (!typeByFields) {
      throw {
        badRequest: {
          message:
            'Ambiguous request params: ' +
            'unable to collection type' +
            'or try to change collection type',
        },
      };
    }

    let tagToSaveId;
    if (tag) {
      const tagToSave = await sails.helpers.getTag(tag);
      tagToSaveId = tagToSave ? tagToSave.id : null;
    }

    const parentFolder = await sails.helpers.findListParent(parent);
    if (!parentFolder) {
      throw {
        badRequest: {
          message: 'Bad request: list cannot be parent or parent not found',
        },
      };
    }

    const updatedFolder = await TaskCollection.updateOne(
      { id },
      {
        name,
        parent,
        tag: tagToSaveId,
      }
    );

    return updatedFolder;
  },
};
