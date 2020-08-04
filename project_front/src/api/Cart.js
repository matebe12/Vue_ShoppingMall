import { cart } from './index';
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
