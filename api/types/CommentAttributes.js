const Date = require('./Date');

module.exports = {
  author: {
    model: 'teammate',
  },
  time: {
    type: 'number',
    autoCreatedAt: true,
  },
  task: {
    model: 'task',
  },
};
