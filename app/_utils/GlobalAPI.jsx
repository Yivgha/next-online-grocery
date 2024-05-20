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

const getAllProducts = () =>
  axiosClient
    .get(
      '/products?sort=name&pagination[page]=1&pagination[pageSize]=10&populate=*'
    )
    .then((res) => res.data.data)
    .catch((err) => console.log(err));

const getProductsByCategory = (categoryName) =>
  axiosClient
    .get(
      `/products?filters[categories][name][$eq]=${categoryName}&sort=name&pagination[page]=1&pagination[pageSize]=3&populate=*`
    )
    .then((res) => res.data.data)
    .catch((err) => console.log(err));

// USER LOGIN AND REGISTER
const registerUser = (userData) =>
  axiosClient.post('/auth/local/register', userData).catch((err) => {
    console.error('Error during user registration:', err);

    const errorMessage =
      err.response?.data?.error?.message ?? 'Something went wrong';
    return { error: true, message: errorMessage };
  });

const signInUser = (userData) =>
  axiosClient
    .post('/auth/local', {
      identifier: userData.email,
      password: userData.password,
    })
    .catch((err) => {
      console.error('Error during user registration:', err);

      const errorMessage =
        err.response?.data?.error?.message ?? 'Something went wrong';
      return { error: true, message: errorMessage };
    });

// USER CART

const addToCart = (data, jwt) =>
  axiosClient
    .post('/user-carts', data, {
      headers: {
        Authorization: 'Bearer ' + jwt,
      },
    })
    .catch((err) => console.log(err.message));

const getCartItems = (userID, jwt) =>
  axiosClient
    .get(`/user-carts?filters[userID][$eq]=${userID}&populate=*`, {
      headers: {
        Authorization: 'Bearer' + jwt,
      },
    })
    .then((res) => res.data.data)
    .catch((err) =>
      console.log('Error while getting user cart items', err.message)
    );

export default {
  getCategories,
  getSliders,
  getCategoryList,
  getAllProducts,
  getProductsByCategory,
  registerUser,
  signInUser,
  addToCart,
  getCartItems,
};

