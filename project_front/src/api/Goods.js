import { goods } from './index.js';

function getCategory(reqData) {
  return goods.get(`/category/${reqData}`);
}

function InsertGoods(goodsData) {
  return goods.post('/InsertGoods', goodsData);
}

function getGoodsList(category) {
  return goods.get(`/getGoodsList/${category}`);
}

function updateGoods(reqData) {
  return goods.post('/updateGoods', reqData);
}

function deleteGoods(reqData) {
  return goods.post('/deleteGoods', reqData);
}

function getGoodsOne(reqData) {
  console.log('req : ', reqData);

  return goods.get(`/getGoodsOne/${reqData}`);
}

export {
  getCategory,
  InsertGoods,
  getGoodsList,
  updateGoods,
  deleteGoods,
  getGoodsOne,
};
