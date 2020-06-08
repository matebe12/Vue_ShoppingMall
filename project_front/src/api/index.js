import axios from 'axios';
import { setInterceptors } from './common/interceptor';

function createInstanceWithAuth(url) {
  const instance = axios.create({
    baseURL: `/api/${url}`,
  });
  return setInterceptors(instance);
}

export const goods = createInstanceWithAuth('goods');
