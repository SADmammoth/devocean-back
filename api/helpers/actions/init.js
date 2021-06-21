module.exports = {
  friendlyName: 'Init',

  description: '',

  inputs: {
    workspaceId: {
      type: 'string',
    },
  },

  exits: {},

  fn: async function ({ workspaceId }) {
    await Status.createEach([
      {
        name: 'open',
        workspaceId,
      },
      {
        name: 'wip',
        workspaceId,
      },
      {
        name: 'closed',
        workspaceId,
      },
      {
        name: 'backlog',
        workspaceId,
      },
    ]);

    const tag = await Tag.create({
      name: 'Root',
      workspaceId,
    }).fetch();

    const folder = await TaskCollection.create({
      type: 'folder',
      name: sails.config.custom.rootFolderName,
      isConstant: true,
      workspaceId,
    }).fetch();
    await TaskCollection.create({
      type: 'list',
      name: sails.config.custom.rootListName,
      tag: tag.id,
      parent: folder.id,
      isConstant: true,
      workspaceId,
    });

    await Template.createEach(
      sails.config.custom.templates.items.map((fields) => ({
        ...fields,
        workspaceId,
      })),
    );

    await NavItem.createEach(
      sails.config.custom.navItems.items.map((fields) => ({
        ...fields,
        workspaceId,
      })),
    );

    await Subteam.create({
      name: 'All',
      workspaceId,
    }).fetch();

    return;
  },
};
