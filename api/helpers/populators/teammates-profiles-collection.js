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
    return await Promise.all(
      teammates.map(
        async (teammate) =>
          await sails.helpers.populators.teammateProfile(
            teammate,
            authorization,
          ),
      ),
    );
  },
};
