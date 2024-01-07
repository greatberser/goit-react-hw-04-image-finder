import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: '40410725-d86b32508aaf4f5420a176099',
  orientation: 'landscape',
  per_page: 40,
};

export const getImages = async (query, page) => {
  const { data } = await axios.get(`?search&q=${query}&page=${page}`);

  return data;
};

export default getImages;