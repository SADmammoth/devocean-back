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

  fn: async function ({ name, parent, authorization }) {
    let { workspaceId } = await sails.helpers.requestUserData(
      authorization || this.req.headers.authorization.replace('Bearer ', ''),
    );
    const actualParent =
      parent ||
      (
        await Subteam.findOne({
          name: 'All',
          workspaceId,
        })
      ).id;
    const subteam = await Subteam.create({
      name,
      parent: actualParent,
      workspaceId,
    });
    return subteam;
  },
};
