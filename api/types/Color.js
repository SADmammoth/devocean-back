const hexRegex = /(^#[0-9a-f]{3}$)|(^#[0-9a-f]{6}$)|(^#[0-9a-f]{8}$)/;
module.exports = {
  type: 'string',
  custom: (value) => {
    if (!value) {
      return true;
    }
    return hexRegex.test(value);
  },
};
