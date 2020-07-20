import axios from 'axios';
import { setInterceptors } from './common/interceptor';

function createInstanceWithAuth(url) {
  const instance = axios.create({
    baseURL: `${process.env.VUE_APP_API_URL}api/${url}`,
  });
  return setInterceptors(instance);
}

export const goods = createInstanceWithAuth('goods');
export const reply = createInstanceWithAuth('reply');
export const cart = createInstanceWithAuth('cart');
export const user = createInstanceWithAuth('user');
