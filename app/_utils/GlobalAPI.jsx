const { default: axios } = require('axios');

const axiosClient = axios.create({
  baseURL: 'http://localhost:1337/api',
});

const getCategories = () => axiosClient.get('/categories?sort=name&populate=*');

export default { getCategories };

