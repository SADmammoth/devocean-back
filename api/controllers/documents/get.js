module.exports = {
  friendlyName: 'Document',

  description: 'Get documents.',

  inputs: {},

  exits: {},

  fn: async function () {
    const document = await Document.find().populate('contributors');
    return document;
  },
};
