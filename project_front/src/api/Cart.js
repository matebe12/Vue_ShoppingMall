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
  if (typeof reqData == 'object') {
    return cart.post('/getOrderList', reqData);
  } else {
    let reqDataStr = {
      USER_ID: reqData.USER_ID,
    };
    return cart.post('/getOrderList', reqDataStr);
  }
}

export {
  addGoodsCart,
  getCartList,
  deleteCart,
  insertOrder,
  insertOrderDetail,
  getOrderList,
};
