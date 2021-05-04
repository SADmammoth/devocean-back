const _ = require('@sailshq/lodash');

module.exports = {
  friendlyName: 'Dev',

  description: '',

  inputs: {
    tags: { type: 'ref', meta: { swagger: { in: 'body' } } },
    collections: { type: 'ref', meta: { swagger: { in: 'body' } } },
    teammates: { type: 'ref', meta: { swagger: { in: 'body' } } },
    assignees: { type: 'ref', meta: { swagger: { in: 'body' } } },
    notifications: { type: 'ref', meta: { swagger: { in: 'body' } } },
    statuses: { type: 'ref', meta: { swagger: { in: 'body' } } },
    templates: { type: 'ref', meta: { swagger: { in: 'body' } } },
    tasks: { type: 'ref', meta: { swagger: { in: 'body' } } },
  },

  fn: async function ({
    tags,
    collections,
    teammates,
    assignees,
    notifications,
    statuses,
    templates,
    tasks,
  }) {
    await Task.destroy({});
    await Template.destroy({});
    await Status.destroy({});
    await Notification.destroy({});
    await Assignee.destroy({});
    await Teammate.destroy({});
    await TaskCollection.destroy({});
    await Tag.destroy({});

    await Tag.createEach(tags);
    await TaskCollection.createEach(collections);
    await Teammate.createEach(teammates);
    await Assignee.createEach(assignees);
    await Notification.createEach(notifications);
    await Status.createEach(statuses);
    await Template.createEach(templates);
    await Task.createEach(tasks);

    return {};
  },
};
