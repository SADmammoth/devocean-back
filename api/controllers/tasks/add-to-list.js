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
  },

  exits: {},

  fn: async function ({ id, list }) {
    const foundList = await TaskCollection.findOne({
      or: [{ id: list }, { name: list }],
    });
    const tag = foundList.tag;
    const task = await Task.updateOne({ id }, { tag });
    return task;
  },
};
