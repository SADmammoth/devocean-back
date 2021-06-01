const _ = require('@sailshq/lodash');
const Duration = require('../types/Duration');
const DynamicDuration = require('../types/DynamicDuration');
const priority = require('../types/enums/priority');
const prefix = require('superagent-prefix');
const request = require('superagent');

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
    author: {
      model: 'teammate',
      required: true,
    },
    contributors: {
      collection: 'teammate',
    },
  },
};

sails.on('task:created', async ({ change }) => {
  const task = await Task.findOne({ id: change.id }).populate('contributors');
  return await History.create({
    time: new Date(),
    author: !task.contributors
      ? change.author
      : task.contributors.slice(-1)[0].id,
    task: change.id,
    changedFields: Object.keys(change),
    after: change,
  });
});

sails.on('task:updated', async ({ change, diff }) => {
  const task = await Task.findOne({ id: change.id }).populate('contributors');

  const lastChange = await History.find({
    where: { task: task.id, changedFields: Object.keys(diff) },
    sort: [{ updatedAt: 'DESC' }],
    select: ['after', 'changedFields'],
  });

  const lastChangeState = Object.fromEntries(
    Object.entries(diff).map(([key, value]) => {
      return [key, lastChange[0].after[key]];
    }),
  );

  const before = lastChangeState;
  const after = Object.fromEntries(
    Object.entries(diff).filter(([key, value]) => {
      return before[key] !== value;
    }),
  );

  if (_.isEmpty(after)) {
    return;
  }

  return await History.create({
    time: new Date(),
    author: task.contributors.slice(-1)[0].id,
    task: change.id,
    changedFields: Object.keys(after),
    before,
    after,
  });
});

sails.on('task:updated', async ({ change, diff }) => {
  const isEstimateSet = !!diff.estimate;
  const task = await Task.findOne({ id: change.id }).populate('contributors');

  if (change.estimate === diff.estimate) return;

  if (isEstimateSet) {
    const report = await Report.create({
      task: change.id,
      author: task.contributors.slice(-1)[0].id,
      time: new Date(),
      reportedTime: 0,
      estimate: diff.estimate,
      activity: '$estimate',
    });
  }
});

sails.on('task:updated', ({ changes: model }) => {
  request
    .get('/tasks/notify')
    .use(prefix(sails.config.custom.subscriptionServer))
    .then(({ body: { message } }) => console.log(message));
});

sails.on('task:created', (model) => {
  request
    .get('/tasks/notify')
    .use(prefix(sails.config.custom.subscriptionServer))
    .then(({ body: { message } }) => console.log(message));
});
