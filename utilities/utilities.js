exports.getAgeFromDOB = (dob) => {
  const diff = new Date() - new Date(dob);
  return Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
};