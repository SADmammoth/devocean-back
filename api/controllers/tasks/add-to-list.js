module.exports = {
  friendlyName: 'Task',

  description: '',

  inputs: {
    id: { type: 'string', required: true, meta: { swagger: { in: 'path' } } },
    list: {
      type: 'string',
      description: 'List id or name to add task',
      required: true,
      meta: { swagger: { in: 'body' } },
    },
    authorization: {
      type: 'string',
    },
  },

  exits: {},

  fn: async function ({ id, list, authorization }) {
    let { teammateId, login, workspaceId } =
      await sails.helpers.requestUserData(
        authorization || this.req.headers.authorization.replace('Bearer ', ''),
      );
    const foundList = await TaskCollection.findOne({
      or: [
        { id: list, workspaceId },
        { name: list, workspaceId },
      ],
    });

    const task = await Task.updateOne({ id }, { list: foundList.id });

    if (!teammateId) teammateId = login;

    await Task.addToCollection(id, 'contributors').members([teammateId]);

    return task;
  },
};
