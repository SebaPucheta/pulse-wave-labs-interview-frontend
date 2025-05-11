// src/utils/cognito.js
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: import.meta.env.VITE_APP_COGNITO_USER_POOL_ID,
  ClientId: import.meta.env.VITE_APP_COGNITO_CLIENT_ID,
};

const userPool = new CognitoUserPool(poolData);

export const registerUser = (email, password) => {
  const attributeEmail = new CognitoUserAttribute({
    Name: 'email',
    Value: email,
  });

  return new Promise((resolve, reject) => {
    userPool.signUp(email, password, [attributeEmail], null, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

export const loginUser = (email, password) => {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({ Username: email, Pool: userPool });
    const authDetails = new AuthenticationDetails({ Username: email, Password: password });

    user.authenticateUser(authDetails, {
      onSuccess: (session) => resolve(session),
      onFailure: (err) => reject(err),
    });
  });
};

export const confirmUser = (email, code) => {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({ Username: email, Pool: userPool });
    user.confirmRegistration(code, true, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};
