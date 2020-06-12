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

export { getCategory, InsertGoods, getGoodsList };
