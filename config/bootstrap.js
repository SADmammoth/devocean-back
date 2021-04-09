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
  console.log(await Status.count());
  if ((await Status.count()) === 0) {
    await Status.createEach([
      {
        name: 'open',
      },
      {
        name: 'wip',
      },
      {
        name: 'closed',
      },
      {
        name: 'backlog',
      },
    ]);
  }

  if ((await Tag.count()) === 0) {
    await Tag.create({
      name: 'Root',
    });
  }
};
