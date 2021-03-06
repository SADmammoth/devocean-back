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
  const newChange = Object.fromEntries(
    Object.entries(diff).map(([key, value]) => {
      if (value.id) return [key, value.toString()];
      return [key, value];
    }),
  );

  const lastChange = await History.find({
    where: { task: task.id, changedFields: Object.keys(newChange) },
    sort: [{ updatedAt: 'DESC' }],
    select: ['after', 'changedFields', 'updatedAt'],
  });

  const lastChangeState = Object.fromEntries(
    Object.entries(newChange)
      .map(([key, value]) => {
        let lastValue;
        for (let i = 0; i < lastChange.length; i++) {
          if (lastChange[i].after[key]) {
            lastValue = lastChange[i].after[key];
            break;
          }
        }
        return [key, lastValue];
      })
      .filter(([, el]) => !!el),
  );

  function difference(object, base) {
    function changes(object, base) {
      return _.transform(object, function (result, value, key) {
        if (!_.isEqual(value, base[key])) {
          if (value instanceof Date && base[key] instanceof Date) {
            if (value.getTime() === base[key].getTime()) {
              result[key] = value;
            }
          } else {
            result[key] =
              _.isObject(value) && _.isObject(base[key])
                ? changes(value, base[key])
                : value;
          }
        }
      });
    }
    return changes(object, base);
  }

  const before = difference(lastChangeState, newChange);
  const after = difference(newChange, lastChangeState);

  if (_.isEmpty(after)) {
    return;
  }

  const history = await History.create({
    time: new Date(),
    author: task.contributors.slice(-1)[0].id,
    task: change.id,
    changedFields: Object.keys(after),
    before,
    after,
  });

  await request
    .get('/history/notify')
    .use(prefix(sails.config.custom.subscriptionServer))
    .then(({ body: { message } }) => console.log(message));

  return history;
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

    await request
      .get('/reports/notify')
      .use(prefix(sails.config.custom.subscriptionServer))
      .then(({ body: { message } }) => console.log(message));
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
