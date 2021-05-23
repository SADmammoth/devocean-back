module.exports = {
  friendlyName: 'Subteam',

  description: 'Get subteams.',

  inputs: {
    authorization: {
      type: 'string',
    },
  },

  exits: {},

  fn: async function () {
    const subteams = await Subteam.find().populate(['teammates', 'children']);
    return await Promise.all(
      subteams.map(async ({ teammates, children, ...rest }) => ({
        ...rest,
        teammates: teammates.map(({ id }) => id),
        children: children.map(({ id }) => id),
      })),
    );
  },
};
