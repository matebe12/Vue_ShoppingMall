import { user } from './index';

function getUserList(reqData) {
  return user.post(`/getUserList`, reqData);
}
function updateUser(reqData) {
  return user.post('/updateUser', reqData);
}

function deleteUser(reqData) {
  return user.post('/deleteUser', reqData);
}

function signup(reqData) {
  return user.post('/signup', reqData);
}
export { getUserList, updateUser, deleteUser, signup };
