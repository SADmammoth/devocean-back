module.exports = {
  friendlyName: 'Task',

  description: 'Post task',

  inputs: {
    title: {
      type: 'string',
      required: true,
    },
    priority: {
      type: 'string',
      description: 'Name of priority level',
      required: true,
    },
    estimate: {
      type: 'number',
      description: 'In milliseconds',
    },
    reportedTime: {
      type: 'number',
      description: 'In milliseconds',
    },
    list: {
      type: 'string',
      defaultsTo: 'Root list',
      description: 'List id or name',
    },
    status: {
      type: 'string',
      defaultsTo: 'backlog',
      description: 'Id or name of status',
    },
    teammate: {
      type: 'string',
      description: 'Id of teammate to assign task',
    },
    template: {
      type: 'string',
      defaultsTo: 'No template',
    },
    customFields: {
      type: 'json',
    },
  },

  exits: {},

  fn: async function ({
    title,
    priority,
    estimate,
    reportedTime,
    list,
    status,
    teammate,
    template,
    customFields,
  }) {
    const foundStatus = await Status.findOne({
      or: [{ name: status }, { id: status }],
    });
    const foundList = await TaskCollection.findOne({
      or: [{ name: list }, { id: list }],
    });

    const foundTemplate = await Template.findOne({
      or: [{ name: template }, { id: template }],
    });

    const task = await Task.create({
      title,
      priority,
      estimate,
      reportedTime,
      list: foundList.id,
      status: foundStatus.id,
      timeInStatus: new Date(),
      template: foundTemplate.id,
      customFields,
    }).fetch();

    if (!teammate) {
      return task;
    }

    await sails.helpers.assignTask(task.id, teammate, new Date());

    const query = () => Task.findOne({ id: task.id });

    return await sails.helpers.populateFullTask(query);
  },
};
