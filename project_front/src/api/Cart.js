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
  cart.post('/insertOrder', reqData);
  return insertOrderDetail(reqData);
}
function insertOrderDetail(reqData) {
  return cart.post('/insertOrderDetail', reqData);
}

export {
  addGoodsCart,
  getCartList,
  deleteCart,
  insertOrder,
  insertOrderDetail,
};
