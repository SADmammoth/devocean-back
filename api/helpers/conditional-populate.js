module.exports = {
  friendlyName: 'Conditional populate',

  description: '',

  inputs: {
    query: {
      type: 'ref',
      required: true,
    },
    criteria: {
      type: 'ref',
    },
    subcriteria: {
      type: 'ref',
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function ({ query, criteria, subcriteria }) {
    let result;
    if (criteria) {
      result = await query().populate(criteria, subcriteria);
    } else {
      result = await query();
    }

    return result;
  },
};
