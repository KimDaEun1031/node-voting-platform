exports.checkExpirationTime = (date) => {
  const expirationTime = new Date(date).getTime();
  const currentTime = new Date().getTime();

  if (expirationTime >= currentTime) {
    return true;
  }

  return false;
};

exports.validationDate = (date) => {
  const expirationTime = new Date(date).getTime();
  const currentTime = new Date().getTime();

  if (expirationTime <= currentTime) {
    return false;
  }

  return true;
}
