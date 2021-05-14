module.exports = {
  friendlyName: 'Task',

  description: 'Set status to task',

  inputs: {
    id: {
      type: 'string',
      description: 'Task id to set status',
      required: true,
      meta: { swagger: { in: 'path' } },
    },
    status: {
      type: 'string',
      description: 'Status name or id',
      required: true,
    },
    assignedDate: {
      type: 'string',
      description: 'Date status assigned',
    },
    text: {
      type: 'string',
      description: 'Comment to status change',
    },
    author: {
      type: 'string',
    },

    authorization: {
      type: 'string',
    },
  },

  exits: {},

  fn: async function (
    { id, status, assignedDate, text, author, authorization },
    res,
  ) {
    const foundStatus = await Status.findOne({
      or: [
        {
          id: status,
        },
        {
          name: status,
        },
      ],
    });

    if (foundStatus) {
      const oldTask = await Task.findOne({ id });
      if (oldTask.status !== foundStatus.id) {
        await sails.helpers.statusChanges.post.with({
          id,
          fromStatus: oldTask.status,
          toStatus: foundStatus.id,
          time: assignedDate ? new Date(assignedDate) : new Date(),
          text,
          author,
        });
      }
    }

    const updatedTask = await Task.updateOne(
      { id },
      {
        status: foundStatus.id,
        timeInStatus: assignedDate ? new Date(assignedDate) : new Date(),
      },
    );

    if (!updatedTask) {
      throw 'notFound';
    }

    let { teammateId, login } = await sails.helpers.requestUserData(
      authorization || this.req.headers.authorization.replace('Bearer ', ''),
    );

    if (!teammateId) teammateId = login;

    await Task.addToCollection(id, 'contributors').members([teammateId]);

    const query = () => Task.findOne({ id: updatedTask.id });

    return await sails.helpers.populateFullTask(query);
  },
};
