const _ = require('@sailshq/lodash');

module.exports = {
  friendlyName: 'Dev',

  description: '',

  inputs: {
    tags: { type: 'ref', meta: { swagger: { in: 'body' } } },
    collections: { type: 'ref', meta: { swagger: { in: 'body' } } },
    subteams: { type: 'ref', meta: { swagger: { in: 'body' } } },
    teammateTags: { type: 'ref', meta: { swagger: { in: 'body' } } },
    teammates: { type: 'ref', meta: { swagger: { in: 'body' } } },
    assignees: { type: 'ref', meta: { swagger: { in: 'body' } } },
    notifications: { type: 'ref', meta: { swagger: { in: 'body' } } },
    statuses: { type: 'ref', meta: { swagger: { in: 'body' } } },
    templates: { type: 'ref', meta: { swagger: { in: 'body' } } },
    history: { type: 'ref', meta: { swagger: { in: 'body' } } },
    reports: { type: 'ref', meta: { swagger: { in: 'body' } } },
    statusChanges: { type: 'ref', meta: { swagger: { in: 'body' } } },
    discussions: { type: 'ref', meta: { swagger: { in: 'body' } } },
    navitems: { type: 'ref', meta: { swagger: { in: 'body' } } },
    tasks: { type: 'ref', meta: { swagger: { in: 'body' } } },
    documents: { type: 'ref', meta: { swagger: { in: 'body' } } },
  },

  fn: async function ({
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
  }) {
    await Document.destroy({});
    await Task.destroy({});
    await NavItems.destroy({});
    await Discussion.destroy({});
    await StatusChange.destroy({});
    await Report.destroy({});
    await History.destroy({});
    await Template.destroy({});
    await Status.destroy({});
    await Notification.destroy({});
    await Assignee.destroy({});
    await Teammate.destroy({});
    await TeammateTag.destroy({});
    await Subteam.destroy({});
    await TaskCollection.destroy({});
    await Tag.destroy({});

    await Tag.createEach(tags);
    await TaskCollection.createEach(collections);
    await TeammateTag.createEach(teammateTags);
    await Subteam.createEach(subteams);
    await Teammate.createEach(teammates);
    await Assignee.createEach(assignees);
    await Notification.createEach(notifications);
    await Status.createEach(statuses);
    await Template.createEach(templates);
    await NavItems.createEach(navitems);
    await Discussion.createEach(discussions);
    await StatusChange.createEach(statusChanges);
    await Report.createEach(reports);
    await History.createEach(history);
    await Task.createEach(tasks);
    await Document.createEach(documents);

    return {};
  },
};
