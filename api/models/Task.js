const _ = require('@sailshq/lodash');
const Duration = require('../types/Duration');
const DynamicDuration = require('../types/DynamicDuration');
const priority = require('../enums/priority');

module.exports = {
  attributes: {
    title: {
      type: 'string',
      required: true,
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
    tag: { model: 'tag', required: true },
    status: { model: 'status', required: true },
    assignee: { collection: 'assignee' },
    description: {
      type: 'string',
    },
  },
};
