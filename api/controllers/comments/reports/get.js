module.exports = {
  friendlyName: 'Comment',

  description: 'Get reports.',

  inputs: {
    id: {
      type: 'string',
      meta: { swagger: { in: 'path' } },
    },
  },

  exits: {},

  fn: async function ({ id }) {
    const reports = await Report.find({
      where: { task: id },
      sort: [
        {
          createdAt: 'ASC',
        },
      ],
    }).populate('author');

    let sum = 0;

    return await Promise.all(
      reports.map(({ reportedTime, ...rest }) => {
        sum += reportedTime;

        return { totalReported: sum, reportedTime, ...rest };
      })
    );
  },
};
