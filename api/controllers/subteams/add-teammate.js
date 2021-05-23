module.exports = {
  friendlyName: 'Subteam',

  description: 'Get subteams.',

  inputs: {
    id: {
      type: 'string',
      required: true,
      meta: {
        swagger: {
          in: 'path',
        },
      },
    },
    teammateId: {
      type: 'string',
      required: true,
      meta: {
        swagger: {
          in: 'body',
        },
      },
    },
    authorization: {
      type: 'string',
    },
  },

  exits: {},

  fn: async function ({ id, teammateId }) {
    const subteam = await Subteam.findOne({ id });
    const parentsOfSubteam = await sails.helpers.getParentsOfTreeNode(
      subteam,
      Subteam,
    );

    await Teammate.removeFromCollection(teammateId, 'subteams').members(
      parentsOfSubteam.slice(1).map(({ id }) => id),
    );

    const updatedSubteam = await Subteam.addToCollection(
      id,
      'teammates',
    ).members(teammateId);
    return updatedSubteam;
  },
};
