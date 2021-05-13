module.exports = {
  friendlyName: 'Document',

  description: 'Get documents.',

  inputs: {},

  exits: {},

  fn: async function () {
    const documents = await Document.find().populate('contributors');
    return await Promise.all(
      documents.map(
        async (document) =>
          await sails.helpers.populateDocumentWithAuthor(document),
      ),
    );
  },
};
