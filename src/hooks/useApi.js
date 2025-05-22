import axios from 'axios';

const useApi = () => {
  const get = async (url) => {
    const token = localStorage.getItem('accessToken');
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    return response.data;
  };

  const post = async (url, data) => {
    const token = localStorage.getItem('accessToken');
    const response = await axios.post(url, data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    return response.data;
  };

  return { get, post };
};

export default useApi;
