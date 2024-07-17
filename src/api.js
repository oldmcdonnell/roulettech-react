import axios from 'axios';

const baseUrl = "http://127.0.0.1:8000";

export const getToken = async ({ dispatch, username, password }) => {
  try {
    const response = await axios.post(`${baseUrl}/token/`, {
      username,
      password,
    });
    console.log('Token Response: ', response);
    const accessToken = response.data.access;
    dispatch({
      type: 'SET_ACCESS_TOKEN',
      accessToken,
    });
    return accessToken;
  } catch (error) {
    console.log('Error with getToken api call: ', error);
    dispatch({
      type: 'SET_ACCESS_TOKEN',
      accessToken: undefined,
    });
    return null;
  }
};

export const fetchUser = async ({ dispatch, accessToken }) => {
  try {
    const response = await axios.get(`${baseUrl}/profile/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('PROFILE: ', response);
    dispatch({
      type: 'SET_PROFILE',
      profile: response.data,
    });
    return response.data;
  } catch (error) {
    console.log('Error with fetchUser api call: ', error);
    dispatch({
      type: 'SET_PROFILE',
      profile: null,
    });
  }
};

export const createUser = async ({ username, password, firstName, lastName, email }) => {
  try {
    console.log('Email in API: ', email);
    const response = await axios.post(`${baseUrl}/create-user/`, {
      username,
      password,
      first_name: firstName,
      last_name: lastName,
      email,
    });
    console.log('CREATE USER: ', response);
    return { success: true, data: response.data };
  } catch (error) {
    console.log('Create user ERROR: ', error);
    return { success: false, error };
  }
};
