import { cart } from './index';
import store from '@/store/User/User.js';
function addGoodsCart(reqData) {
  return cart.post('/addGoodsCart', reqData);
}

function getCartList(reqData) {
  return cart.get(`/getCartList/${reqData}`);
}
function deleteCart(reqData) {
  return cart.post('/deleteCart', reqData);
}
function insertOrder(reqData) {
  return cart.post('/insertOrder', reqData);
}
function insertOrderDetail(reqData) {
  return cart.post('/insertOrderDetail', reqData);
}
function getOrderList(reqData) {
  if (reqData.USER_ID == undefined) {
    reqData.USER_ID2 = store.state.USER_ID;
  }
  return cart.post('/getOrderList', reqData);
}

function updateOrderList(reqData) {
  return cart.post('/updateOrderList', reqData);
}
function deleteOrderList(reqData) {
  return cart.post('/deleteOrderList', reqData);
}
export {
  addGoodsCart,
  getCartList,
  deleteCart,
  insertOrder,
  insertOrderDetail,
  getOrderList,
  updateOrderList,
  deleteOrderList,
};
