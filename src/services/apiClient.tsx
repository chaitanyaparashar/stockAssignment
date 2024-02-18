import axios from 'axios';

const apiClient = async (
  method: string,
  url: string,
  data = null,
  headers = {},
) => {
  try {
    const response = await axios({
      method: method,
      url: url,
      data: data,
      headers: headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default apiClient;
