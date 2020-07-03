import { user } from './index';

function getUserList() {
  return user.get(`/getUserList`);
}

export { getUserList };
