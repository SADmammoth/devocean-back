const request = require('superagent');
const workDays = require('../../types/enums/workDays');

module.exports = {
  friendlyName: 'Teammate',

  description: 'Get teammates.',

  inputs: {
    id: {
      type: 'string',
      required: true,
    },
    name: { type: 'string' },
    lastName: { type: 'string' },
    subteams: {
      type: 'ref',
    },
    tags: {
      type: 'ref',
    },
    shortName: {
      type: 'string',
    },
    joinedAt: {
      type: 'string',
    },
    referAs: { type: 'string' },
    avatar: { type: 'ref' },
    workMode: {
      type: 'string',
    },
    workHoursStart: {
      type: 'number',
    },
    workHoursEnd: {
      type: 'number',
    },
    workDays: {
      type: 'ref',
    },
    timezone: {
      type: 'number',
    },
    workHours: {
      type: 'string',
      defaultsTo: 'fixed',
    },
    dateOfBirth: {
      type: 'number',
    },
    aboutYourself: {
      type: 'string',
    },
    contacts: {
      type: 'ref',
    },

    email: {
      type: 'string',
      //   required: true,
      //TODO
    },

    isOnInvite: {
      type: 'boolean',
      defaultsTo: false,
    },

    authorization: {
      type: 'string',
    },
  },

  exits: {},

  fn: async function ({
    avatar,
    isOnInvite,
    id,
    subteams,
    tags,
    joinedAt,
    ...inputs
  }) {
    await sails.helpers.addSubteamsAndTags(id, subteams, tags, true);

    this.req.file('avatar').upload(async (err, files) => {
      let avatar;
      if (files) [avatar] = files;
      const teammate = await Teammate.updateOne(
        { id },
        {
          joinedAt: new Date(joinedAt),
          ...inputs,
          avatar:
            sails.config.custom.baseUrl + '/avatar/?file=' + avatar?.stream.fd,
        },
      );

      if (isOnInvite) {
        await sails.helpers.acceptInvite(id);
        inputs.hidden = false;
      }

      return teammate;
    });
  },
};
