export const isValidEmail = (email) => {
  var validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

  // Using test we can check if the text match the pattern
  if (validEmail.test(email)) {
    return true;
  }

  return false;
};
