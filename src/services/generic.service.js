import axios from 'axios';
import { getInstance } from '../auth/index';

const API_URL = process.env.VUE_APP_MONGO_URI;

const request = async ({ url, method, data = {} }) => {
  const token = await getInstance().getTokenSilently();
  const response = await axios({
    method,
    url: `${API_URL}/${url}`,
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export default request;
