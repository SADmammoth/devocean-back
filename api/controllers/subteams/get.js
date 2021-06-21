module.exports = {
  friendlyName: 'Subteam',

  description: 'Get subteams.',

  inputs: {
    authorization: {
      type: 'string',
    },
  },

  exits: {},

  fn: async function ({ authorization }) {
    let { workspaceId } = await sails.helpers.requestUserData(
      authorization || this.req.headers.authorization.replace('Bearer ', ''),
    );
    const subteams = await Subteam.find({ workspaceId })
      .populate('teammates')
      .populate('children');
    return await Promise.all(
      subteams.map(async ({ teammates, children, ...rest }) => ({
        ...rest,
        teammates: teammates.map(({ id }) => id),
        children: children.map(({ id }) => id),
      })),
    );
  },
};
