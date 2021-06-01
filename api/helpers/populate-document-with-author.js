module.exports = {
  friendlyName: 'Populate document with author',

  description: '',

  inputs: {
    document: {
      type: 'ref',
      required: true,
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function ({ document }) {
    const { author } = document;
    const teammate = await Teammate.findOne({ id: author });

    return { ...document, author: teammate };
  },
};
