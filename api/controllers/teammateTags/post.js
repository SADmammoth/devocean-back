module.exports = {
  friendlyName: 'Teammate tag',

  description: 'Post teammate tag.',

  inputs: {
    id: {
      type: 'string',
    },
    tagName: {
      type: 'string',
    },
    authorization: {
      type: 'string',
    },
  },

  exits: {},

  fn: async function ({ id, tagName }) {
    const tag = await TeammateTag.create({ name: tagName }).fetch();
    if (id) await Teammate.addToCollection(id, 'tags').members([tag.id]);
  },
};
