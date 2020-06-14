import { goods } from './index.js';

function getCategory(reqData) {
  return goods.get(`/category/${reqData}`);
}

function InsertGoods(goodsData) {
  return goods.post('/InsertGoods', goodsData);
}

function getGoodsList() {
  return goods.get('/getGoodsList');
}

function updateGoods(reqData) {
  return goods.post('/updateGoods', reqData);
}

function deleteGoods(reqData) {
  return goods.post('/deleteGoods', reqData);
}

export { getCategory, InsertGoods, getGoodsList, updateGoods, deleteGoods };
