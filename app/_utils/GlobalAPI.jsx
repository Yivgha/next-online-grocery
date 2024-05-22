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
        Authorization: 'Bearer ' + jwt,
      },
    })
    .then((res) => res.data.data)
    .catch((err) =>
      console.log('Error while getting user cart items', err.message)
    );

const getCartItemsAndImages = (userID, jwt) =>
  axiosClient
    .get(
      `/user-carts?filters[userID][$eq]=${userID}&[populate][products][populate][images][populate][0]=url`,
      {
        headers: {
          Authorization: 'Bearer ' + jwt,
        },
      }
    )
    .then((res) => {
      const data = res.data.data;
      const cartItemsList = data.map((item) => ({
        name: item.attributes.products.data[0].attributes.name,
        quantity: item.attributes.quantity,
        amount: item.attributes.amount,
        image:
          item.attributes.products.data[0].attributes.images.data[0].attributes
            .url,
        actual_price: item.attributes.products.data[0].attributes.actual_price,
        selling_price:
          item.attributes.products.data[0].attributes.selling_price,
        id: item.id,
        product: item.attributes.products.data[0].id,
      }));

      return cartItemsList;
    })
    .catch((err) =>
      console.log('Error while getting user cart items', err.message)
    );

const deleteCartItem = (cartItemId, jwt) =>
  axiosClient
    .delete(`/user-carts/${cartItemId}`, {
      headers: {
        Authorization: 'Bearer ' + jwt,
      },
    })
    .catch((err) =>
      console.log('Error while deleting user cart items', err.message)
    );

const createOrder = (data, jwt) =>
  axiosClient
    .post(`/orders`, data, {
      headers: {
        Authorization: 'Bearer ' + jwt,
      },
    })
    .catch((err) => console.log('Error while creating an order', err.message));

const getUserOrders = (userId, jwt) =>
  axiosClient
    .get(
      `/orders?filters[userId][$eq]=${userId}&[populate][orderItemList][populate][product][populate][images]=url&sort=id:desc`,
      {
        headers: {
          Authorization: 'Bearer ' + jwt,
        },
      }
    )
    .then((res) => {
      const data = res.data.data;
      const ordersList = data.map((item) => ({
        order_id: item.id,
        total_order_amount: item.attributes.total_order_amount,
        paymentId: item.attributes.paymentId,
        address: item.attributes.address,
        orderItemList: item.attributes.orderItemList,
        created_at: item.attributes.createdAt,
        status: item.attributes.status,
      }));
      return ordersList;
    })
    .catch((err) => console.log('Error while getting all orders', err.message));

// SEARCH BY PRODUCT NAME

const searchByProductName = (searchValue) =>
  axiosClient
    .get(`/products?filters[name][$containsi]=${searchValue}&populate=*`)
    .then((res) => res.data.data)
    .catch((err) => console.log('Error while searching products', err.message));
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
  getCartItemsAndImages,
  deleteCartItem,
  createOrder,
  getUserOrders,
  searchByProductName,
};

