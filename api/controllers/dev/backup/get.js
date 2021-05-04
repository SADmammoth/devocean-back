const _ = require('@sailshq/lodash');

module.exports = {
  friendlyName: 'Dev',

  description: '',

  inputs: {},

  fn: async function () {
    const tags = await Tag.find();
    const collections = await TaskCollection.find();
    const teammates = await Teammate.find();
    const assignees = await Assignee.find();
    const notifications = await Notification.find();
    const statuses = await Status.find();
    const templates = await Template.find();
    const tasks = await Task.find();

    return {
      tags,
      collections,
      teammates,
      assignees,
      notifications,
      statuses,
      templates,
      tasks,
    };
  },
};
