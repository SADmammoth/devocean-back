module.exports = {
  friendlyName: 'Assingee to assigned task',

  description: '',

  inputs: {
    assignee: { type: 'ref' },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function ({ assignee }) {
    const { id, teammate, ...fields } = assignee;
    return fields;
  },
};
