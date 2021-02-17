import axios from 'axios';

const clientId = process.env.VUE_APP_CLIENT_ID;
const clientSecret = process.env.VUE_APP_CLIENT_SECRET;
const audience = process.env.VUE_APP_AUDIENCE;
const grantType = process.env.VUE_APP_GRANT_TYPE;

const getToken = async () => {
  try {
    const response = await axios({
      method: 'POST',
      url: 'https://dev-tigetmdd.eu.auth0.com/oauth/token',
      data: {
        client_id: clientId,
        client_secret: clientSecret,
        audience,
        grant_type: grantType,
      },
    });
    return response.data.access_token;
  } catch (error) {
    return error;
  }
};

const getUserRole = async (id) => {
  try {
    const token = await getToken();
    const response = await axios({
      method: 'get',
      url: `https://dev-tigetmdd.eu.auth0.com/api/v2/users/${id}/roles`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data[0].name === 'admin') {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export default getUserRole;
