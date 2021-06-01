const workDaysEnum = require('../types/enums/workDays');

module.exports = {
  friendlyName: 'Get teammate active status',

  description: '',

  sync: true,

  inputs: {
    workHours: {
      type: 'string',
    },
    workHoursStart: {
      type: 'number',
    },
    workHoursEnd: {
      type: 'number',
    },
    workDays: {
      type: 'ref',
    },
  },

  exits: {
    success: {
      outputFriendlyName: 'Teammate active status',
    },
  },

  fn: function ({ workHours, workHoursStart, workHoursEnd, workDays }) {
    if (workHours === 'flexible') {
      return;
    }

    const now = new Date();

    const currentWeekday = workDaysEnum[now.getDay()];

    if (!workDays.includes(currentWeekday)) {
      return false;
    }

    const start = new Date(0);
    start.setHours(now.getHours(), now.getMinutes());
    const current = start.getTime();

    if (current < workHoursStart || current > workHoursEnd) {
      return false;
    }

    return true;
  },
};
