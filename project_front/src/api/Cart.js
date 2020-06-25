import { cart } from './index';

function addGoodsCart(reqData) {
  return cart.post('/addGoodsCart', reqData);
}

function getCartList(reqData) {
  return cart.get(`/getCartList/${reqData}`);
}
function deleteCart(reqData) {
  return cart.post('deleteCart', reqData);
}

export { addGoodsCart, getCartList, deleteCart };
