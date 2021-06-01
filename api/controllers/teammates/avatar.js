module.exports = {
  friendlyName: 'Teammate',

  description: 'Get teammates.',

  inputs: {
    file: {
      type: 'string',
    },
  },

  exits: {},

  fn: async function ({ file }) {
    let downloading = await sails.startDownload('.tmp/uploads/' + file);
    return downloading;
  },
};
