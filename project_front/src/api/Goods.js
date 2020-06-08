import { goods } from './index.js';

function getCategory() {
  return goods.get('/category');
}

export { getCategory };
