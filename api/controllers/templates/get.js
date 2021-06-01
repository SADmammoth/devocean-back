module.exports = {
  friendlyName: 'Template',

  description: 'Get templates.',

  inputs: {},

  exits: {},

  fn: async function () {
    const templates = await Template.find();
    return templates.map(({ id, name }) => ({ id, name }));
  },
};
