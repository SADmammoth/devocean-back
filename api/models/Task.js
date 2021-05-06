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

sails.on('task:created', async ({ change }) => {
  return await History.create({
    time: new Date(),
    author: (await Teammate.find())[0].id,
    task: change.id,
    changedFields: Object.keys(change),
    after: change,
  });
});

sails.on('task:updated', async ({ change, diff }) => {
  const lastChange = await History.find({
    where: { changedFields: Object.keys(diff) },
    sort: [{ updatedAt: 'DESC' }],
    select: ['after', 'changedFields'],
  });

  return await History.create({
    time: new Date(),
    author: (await Teammate.find())[0].id,
    task: change.id,
    changedFields: Object.keys(diff),
    before: Object.fromEntries(
      Object.entries(diff).map(([key, value]) => {
        return [key, lastChange[0].after[key]];
      })
    ),
    after: diff,
  });
});
