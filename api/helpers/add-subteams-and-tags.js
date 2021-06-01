module.exports = {
  friendlyName: 'Add subteams and tags',

  description: '',

  inputs: {
    teammateId: { type: 'string', required: true },
    subteams: { type: 'ref' },
    tags: { type: 'ref' },
    replace: { type: 'boolean' },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function ({ teammateId, subteams, tags, replace }) {
    const foundSubteams = await Subteam.find({
      or: [
        {
          name: { in: subteams || [] },
        },
        {
          id: { in: subteams || [] },
        },
      ],
    });
    const foundTags = await TeammateTag.find({
      or: [
        {
          name: { in: tags || [] },
        },
        {
          id: { in: tags || [] },
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
