import { reply } from './index.js';

function addReply(reqData) {
  return reply.post('insertReply', reqData);
}

function getReplyAll(reqData) {
  return reply.post('getReplyAll', reqData);
}

function updateReply(reqData) {
  return reply.post('updateReply', reqData);
}

function deleteReply(reqData) {
  return reply.post('deleteReply', reqData);
}
export { addReply, getReplyAll, updateReply, deleteReply };
