module.exports = {
  friendlyName: 'Generate update value',

  description: '',

  sync: true,

  inputs: {
    updateValues: { type: 'ref', required: true },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: function ({ updateValues }) {
    const updateValue = {};
    Object.entries(updateValues).forEach(([key, value]) => {
      if (value) {
        updateValue[key] = value;
      }
    });

    return updateValue;
  },
};
