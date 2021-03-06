module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true,
    },
    teammates: {
      collection: 'teammate',
      via: 'subteams',
    },
    parent: {
      model: 'subteam',
    },
    children: {
      collection: 'subteam',
      via: 'parent',
    },
    workspaceId: {
      type: 'string',
    },
  },
};
