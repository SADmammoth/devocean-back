const DateInPast = require('./DateInPast');

module.exports = {
  author: {
    model: 'teammate',
  },
  time: {
    ...DateInPast,
    required: true,
  },
  task: {
    model: 'task',
  },
};
