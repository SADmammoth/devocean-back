module.exports = {
  friendlyName: 'Populate list with children',

  description: '',

  inputs: {
    list: { type: 'ref', required: true },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function ({ list }) {
    const children = await TaskCollection.find({
      where: { parent: list.id },
      select: ['id'],
    });

    const { tag, ...listFields } = list;

    return { ...listFields, children: children.map(({ id }) => id) };
  },
};
