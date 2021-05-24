module.exports = {
  friendlyName: 'Teammate tag',

  description: 'Post teammate tag.',

  inputs: {
    id: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    authorization: {
      type: 'string',
    },
  },

  exits: {},

  fn: async function ({ id, name }) {
    const tag = await TeammateTag.create({ name: name }).fetch();
    if (id) await Teammate.addToCollection(id, 'tags').members([tag.id]);
  },
};
