module.exports = {
  friendlyName: 'Folder',

  description: 'Post folder',

  inputs: {
    name: { type: 'string', required: true, meta: { swagger: { in: 'body' } } },
    type: {
      type: 'string',
      isIn: ['list', 'folder'],
      required: true,
      meta: { swagger: { in: 'body' } },
    },
    tag: { type: 'json', meta: { swagger: { in: 'body' } } },
    parent: { type: 'string', meta: { swagger: { in: 'body' } } },
    authorization: {
      type: 'string',
    },
  },

  exits: {
    success: { outputType: 'ref' },
    notUnique: { responseType: 'notUnique' },
    notModified: { responseType: 'notModified' },
    badRequest: {
      responseType: 'badRequest',
    },
  },

  fn: async function ({ type, name, tag, parent, authorization }) {
    let { workspaceId } = await sails.helpers.requestUserData(
      authorization || this.req.headers.authorization.replace('Bearer ', ''),
    );
    const typeByFields = sails.helpers.getCollectionTypeByFields(tag);

    if (
      (typeByFields === 'unknown' && !type) ||
      (typeByFields !== 'unknown' && (typeByFields !== type || !typeByFields))
    ) {
      throw {
        badRequest: {
          message:
            'Ambiguous request params: ' +
            'unable to determine is it collection ' +
            'with children collections or with tasks/tag',
        },
      };
    }

    type = typeByFields !== 'unknown' ? typeByFields : type;

    let tagToSaveId;
    if (tag) {
      const tagToSave = await sails.helpers.getTag(tag, workspaceId);
      tagToSaveId = tagToSave ? tagToSave.id : null;
    }

    if (type === 'list' && !tagToSaveId && !tag) {
      const tagToSave = await Tag.create({ color: '', name, workspaceId })
        .intercept((err) => {
          if (err.code === 'E_UNIQUE') {
            return {
              notUnique:
                'List is already created or database is not consistent',
            };
          }
          return err;
        })
        .fetch();

      tagToSaveId = tagToSave.id;

      if (!tagToSaveId) {
        throw {
          badRequest: {
            message: `Please provide id or {color, name} in "tag" field`,
          },
        };
      }
    }

    const parentFolder = await sails.helpers.findListParent(
      parent,
      workspaceId,
    );
    if (!parentFolder) {
      throw {
        badRequest: {
          message: 'Bad request: list cannot be parent or parent not found',
        },
      };
    }

    const folder = await TaskCollection.create({
      name,
      type,
      tag: tagToSaveId,
      parent,
      workspaceId,
    }).fetch();

    return folder;
  },
};
