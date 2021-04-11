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
  },

  exits: {},

  fn: async function ({ id, status, assignedDate }, res) {
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

    const updatedTask = await Task.updateOne(
      { id },
      {
        status: foundStatus.id,
        timeInStatus: assignedDate ? new Date(assignedDate) : new Date(),
      }
    );

    if (!updatedTask) {
      throw 'notFound';
    }

    const query = () => Task.findOne({ id: updatedTask.id });

    return await sails.helpers.populateFullTask(query);
  },
};
