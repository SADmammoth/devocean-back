module.exports = {
  friendlyName: 'Teammates profiles collection',

  description: '',

  inputs: {
    teammates: {
      type: 'ref',
      required: true,
    },
    authorization: {
      type: 'string',
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function ({ teammates, authorization }) {
    let { teammateId } = await sails.helpers.requestUserData(
      authorization || this.req.headers.authorization.replace('Bearer ', ''),
    );

    return await Promise.all(
      teammates
        .filter(({ hidden, id }) => {
          return !hidden || teammateId === id;
        })
        .map(
          async (teammate) =>
            await sails.helpers.populators.teammateProfile(
              teammate,
              authorization,
            ),
        ),
    );
  },
};
