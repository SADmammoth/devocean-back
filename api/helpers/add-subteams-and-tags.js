module.exports = {
  friendlyName: 'Add subteams and tags',

  description: '',

  inputs: {
    teammateId: { type: 'string', required: true },
    subteams: { type: 'ref' },
    tags: { type: 'ref' },
    workspaceId: {
      type: 'string',
    },
    replace: { type: 'boolean' },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function ({ teammateId, subteams, tags, workspaceId, replace }) {
    if (!(subteams instanceof Array)) {
      subteams = [subteams];
    }
    if (!(tags instanceof Array)) {
      tags = [tags];
    }

    const foundSubteams = await Subteam.find({
      or: [
        {
          name: { in: subteams || [] },
          workspaceId,
        },
        {
          id: { in: subteams || [] },
          workspaceId,
        },
      ],
    });
    const foundTags = await TeammateTag.find({
      or: [
        {
          name: { in: tags || [] },
          workspaceId,
        },
        {
          id: { in: tags || [] },
          workspaceId,
        },
      ],
    });

    let action = (...data) => Teammate.addToCollection(...data);

    if (replace) {
      action = (...data) => Teammate.replaceCollection(...data);
    }

    await action(teammateId, 'subteams').members(
      foundSubteams.map(({ id }) => id),
    );
    await action(teammateId, 'tags').members(foundTags.map(({ id }) => id));
  },
};
