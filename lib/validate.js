const email = (email) => {
  if (
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    )
  ) {
    return true;
  }
  return false;
};

const password = (password) => {
  if (
    /^((?=.*[0-9])|(?=.*[!@#$%^&*]))[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password)
  ) {
    return true;
  }
  return false;
};

export const validate = { email, password };
