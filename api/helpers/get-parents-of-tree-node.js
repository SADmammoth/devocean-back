module.exports = {
  friendlyName: 'Get parents of tree node',

  description: '',

  inputs: {
    node: {
      type: 'ref',
      required: true,
    },
    Model: {
      type: 'ref',
    },
  },

  exits: {},

  fn: async function ({ node, Model }) {
    const nodes = [];

    const getParent = async (node) => {
      nodes.push(node);
      if (node.parent) {
        return getParent(await Model.findOne({ id: node.parent }));
      }

      return node;
    };

    await getParent(node);

    return nodes;
  },
};
