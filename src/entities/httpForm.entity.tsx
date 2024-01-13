export const initialHttpFormState = {
  login: {
    fields: {
      username: {
        value: '',
      },
      password: {
        value: '',
      },
    },
  },
  signin: {
    fields: {
      username: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
      repeatedPassword: {
        value: '',
        isValid: false,
      },
      validationCode: {
        value: '',
        isValid: false,
      },
    },
  },
  errorOnSubmit: '',
};

export const signinSchema = {
  username: '',
  password: '',
  validationCode: '',
};

export const loginSchema = {
  username: '',
  password: '',
};

export const formTypes = {
  login: 'login',
  signin: 'signin',
};
