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
      type: 'folder',
      name: sails.config.custom.rootFolderName,
      isConstant: true,
    }).fetch();
    await TaskCollection.create({
      id: '60741c66ee507b6198dadd03',
      type: 'list',
      name: sails.config.custom.rootListName,
      tag: '60741c66ee507b6198dadd01',
      parent: '60741c66ee507b6198dadd02',
      isConstant: true,
    });
  }

  if ((await Template.count()) === 0) {
    await Template.createEach(sails.config.custom.templates.items);
  }

  if ((await NavItem.count()) === 0) {
    await NavItem.createEach(sails.config.custom.navItems.items);
  }

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

  if ((await Subteam.count()) === 0) {
    const subteam = await Subteam.create({ name: 'All' }).fetch();
    await Subteam.addToCollection(subteam.id, 'teammates').members(
      (await Teammate.find()).map(({ id }) => id),
    );
  }
};
