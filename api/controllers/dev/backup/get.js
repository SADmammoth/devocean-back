const _ = require('@sailshq/lodash');

module.exports = {
  friendlyName: 'Dev',

  description: '',

  inputs: {},

  fn: async function () {
    const tags = await Tag.find();
    const collections = await TaskCollection.find();
    const subteams = await Subteam.find();
    const teammateTags = await TeammateTag.find();
    const teammates = await Teammate.find();
    const assignees = await Assignee.find();
    const notifications = await Notification.find();
    const statuses = await Status.find();
    const templates = await Template.find();
    const history = await History.find();
    const reports = await Report.find();
    const statusChanges = await StatusChange.find();
    const discussions = await Discussions.find();
    const navitems = await NavItem.find();
    const tasks = await Task.find();
    const documents = await Document.find();

    return {
      tags,
      collections,
      subteams,
      teammateTags,
      teammates,
      assignees,
      notifications,
      statuses,
      templates,
      history,
      reports,
      statusChanges,
      discussions,
      navitems,
      tasks,
      documents,
    };
  },
};
