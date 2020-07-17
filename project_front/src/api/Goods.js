import { goods } from './index.js';

function getCategory(reqData) {
  return goods.get(`/category/${reqData}`);
}

function getCategoryList() {
  return goods.post('/getCategoryList');
}

function InsertGoods(goodsData) {
  return goods.post('/InsertGoods', goodsData);
}

function updateGoods(reqData) {
  return goods.post('/updateGoods', reqData);
}

function deleteGoods(reqData) {
  return goods.post('/deleteGoods', reqData);
}

function getGoodsOne(reqData) {
  return goods.get(`/getGoodsOne/${reqData}`);
}

function getGoodsList(reqData) {
  return goods.post(`/getGoodsList`, reqData);
}

export {
  getCategory,
  InsertGoods,
  getGoodsList,
  updateGoods,
  deleteGoods,
  getGoodsOne,
  getCategoryList,
};
