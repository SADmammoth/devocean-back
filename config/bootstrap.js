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

  let rootTag;
  if ((await Tag.count()) === 0) {
    rootTag = await Tag.create({
      id: '60741c66ee507b6198dadd01',
      name: 'Root',
    }).fetch();
  }

  if ((await TaskCollection.count()) === 0) {
    const rootFolder = await TaskCollection.create({
      id: '60741c66ee507b6198dadd02',
      name: 'Root folder',
      children: [],
    }).fetch();
    await TaskCollection.create({
      id: '60741c66ee507b6198dadd03',
      name: 'Root list',
      tag: rootTag.id,
      tasks: [],
      parent: rootFolder.id,
    });
  }
};
