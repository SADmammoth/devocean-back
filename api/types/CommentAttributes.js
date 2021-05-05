const Date = require('./Date');

module.exports = {
  author: {
    model: 'teammate',
  },
  time: {
    ...Date,
    required: true,
  },
  task: {
    model: 'task',
  },
};
