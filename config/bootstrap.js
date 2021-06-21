/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function () {
  if ((await History.count()) === 0) {
    const tasks = await Task.find();
    if (tasks)
      await History.createEach(
        await Promise.all(
          tasks.map(async (task) => {
            return {
              time: task.createdAt,
              task: task.id,
              changedFields: Object.keys(task),
              before: null,
              after: _.omit(task, ['id']),
            };
          }),
        ),
      );
  }
};
