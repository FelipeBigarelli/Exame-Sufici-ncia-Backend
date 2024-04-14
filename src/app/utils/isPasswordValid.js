function isPasswordValid(password) {
  const regex = /^[A-Za-z0-9]*\d+[A-Za-z0-9]*$/;

  return regex.test(password);
}

module.exports = isPasswordValid;
