const _ = require('@sailshq/lodash');
const Duration = require('../types/Duration');
const DynamicDuration = require('../types/DynamicDuration');
const priority = require('../types/enums/priority');

module.exports = {
  attributes: {
    title: {
      type: 'string',
      required: true,
      unique: true,
    },
    priority: {
      type: 'string',
      required: true,
      isIn: priority,
    },
    timeInStatus: {
      ...DynamicDuration,
      required: true,
    },
    estimate: {
      ...Duration,
    },
    reportedTime: {
      ...Duration,
    },
    list: { model: 'taskcollection', required: true },
    status: { model: 'status', required: true },
    assignee: { model: 'assignee' },
    template: { model: 'template', required: true },
    customFields: { type: 'json', required: true },
  },
};
