module.exports = {
  friendlyName: 'Subteam',

  description: 'Post subteams.',

  inputs: {
    name: {
      type: 'string',
      required: true,
    },
    parent: {
      type: 'string',
    },
    authorization: {
      type: 'string',
    },
  },

  exits: {},

  fn: async function ({ name, parent }) {
    const actualParent =
      parent ||
      (
        await Subteam.findOne({
          name: 'All',
        })
      ).id;
    const subteam = await Subteam.create({ name, parent: actualParent });
    return subteam;
  },
};
