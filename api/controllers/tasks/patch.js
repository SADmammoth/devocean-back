module.exports = {
  friendlyName: 'Task',

  description: 'Patch task.',

  inputs: {
    id: { type: 'string', required: true, meta: { swagger: { in: 'path' } } },

    priority: {
      type: 'string',
      description: 'Name of priority level',
      meta: { swagger: { in: 'body' } },
    },
    estimate: {
      type: 'number',
      description: 'In milliseconds',
      meta: { swagger: { in: 'body' } },
    },
    reportedTime: {
      type: 'number',
      description: 'In milliseconds',
      meta: { swagger: { in: 'body' } },
    },
    list: {
      type: 'string',
      description: 'List id or name',
      meta: { swagger: { in: 'body' } },
    },
    status: {
      type: 'string',
      description: 'Id or name of status',
      meta: { swagger: { in: 'body' } },
    },
    teammate: {
      type: 'string',
      description: 'Id of teammate to assign task',
      meta: { swagger: { in: 'body' } },
    },
    description: {
      type: 'string',
      meta: { swagger: { in: 'body' } },
    },
    customFields: {
      type: 'json',
      meta: { swagger: { in: 'body' } },
    },
    authorization: {
      type: 'string',
      meta: { swagger: { in: 'query' } },
    },
  },

  exits: {},

  fn: async function ({
    id,
    title,
    priority,
    estimate,
    reportedTime,
    list,
    status,
    teammate,
    description,
    authorization,
  }) {
    const foundStatus = status
      ? await Status.findOne({ name: status })
      : undefined;
    const foundList = list
      ? await TaskCollection.findOne({
          or: [{ name: list }, { id: list }],
        })
      : undefined;

    let { teammateId: author, login } = await sails.helpers.requestUserData(
      authorization || this.req.headers.authorization.replace('Bearer ', ''),
    );

    if (!author) author = login;

    const result = await Task.addToCollection(id, 'contributors').members([
      author,
    ]);

    const task = await Task.updateOne(
      { id },
      {
        title,
        priority,
        estimate,
        reportedTime,
        list: foundList?.id,
        status: foundStatus?.id,
        timeInStatus: foundStatus ? new Date() : undefined,
        description,
      },
    ).fetch();

    const query = () => Task.findOne({ id: task.id });

    if (!teammate || teammate !== task.teammate) {
      return await sails.helpers.populateFullTask(query);
    }

    await sails.helpers.assignTask(task.id, teammate.id, new Date());

    return await sails.helpers.populateFullTask(query);
  },
};
