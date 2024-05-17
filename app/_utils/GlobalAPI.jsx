const { default: axios } = require('axios');

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
const axiosClient = axios.create({
  baseURL: `${BASE_URL}/api`,
});

const getCategories = () => axiosClient.get('/categories?sort=name&populate=*');

const getSliders = () =>
  axiosClient
    .get('/sliders?sort=name&populate=*')
    .then((res) => res.data.data)
    .catch((err) => console.log(err));

const getCategoryList = () =>
  axiosClient
    .get('/categories?sort=name&populate=*')
    .then((res) => res.data.data)
    .catch((err) => console.log(err));

export default { getCategories, getSliders, getCategoryList };

