const _ = require('@sailshq/lodash');
const priorityEnum = require('../../../types/enums/priority');

module.exports = {
  friendlyName: 'Dev',

  description: '',

  inputs: {
    count: {
      type: 'number',
      defaultsTo: 1,
    },
    title: {
      type: 'string',
    },
    priority: {
      type: 'string',
      description: 'Name of priority level',
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
      description: 'List id or name',
    },
    status: {
      type: 'string',
      description: 'Id or name of status',
    },
    teammate: {
      type: 'string',
      description: 'Id of teammate to assign task',
    },
    template: {
      type: 'string',
    },
    customFields: {
      type: 'json',
    },
  },

  exits: {},

  fn: async function ({
    count,

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
    let task;
    const tasks = await Promise.all(
      new Array(count).fill(0).map(async () => {
        task = {
          title: title || sails.helpers.faker.title(),
          priority:
            priority || sails.helpers.faker.randomEnumItem(priorityEnum),
          estimate: estimate || sails.helpers.faker.duration(),
          reportedTime: reportedTime || sails.helpers.faker.duration(estimate),
          list:
            list ||
            (
              await sails.helpers.faker.randomRecord(TaskCollection, {
                type: 'list',
              })
            ).id,
          status: status || (await sails.helpers.faker.randomRecord(Status)).id,
          teammate:
            teammate ||
            (await sails.helpers.faker.randomRecord(Teammate, {}, true)).id,
          template:
            template || (await sails.helpers.faker.randomRecord(Template)).id,
          customFields: customFields || {},
        };

        return await sails.helpers.actions.postTask.with(task);
      })
    );

    return tasks;
  },
};
