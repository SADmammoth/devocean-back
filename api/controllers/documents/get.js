module.exports = {
  friendlyName: 'Document',

  description: 'Get documents.',

  inputs: {
    authorization: {
      type: 'string',
    },
  },

  exits: {},

  fn: async function ({ authorization }) {
    let { workspaceId } = await sails.helpers.requestUserData(
      authorization || this.req.headers.authorization.replace('Bearer ', ''),
    );
    const documents = await Document.find({ workspaceId }).populate(
      'contributors',
    );
    return await Promise.all(
      documents.map(
        async (document) =>
          await sails.helpers.populateDocumentWithAuthor(document),
      ),
    );
  },
};
