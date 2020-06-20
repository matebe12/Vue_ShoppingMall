<template>
  <div class="panel panel-white post panel-shadow">
    <div class="post-footer">
      <div class="input-group">
        <input
          class="form-control"
          placeholder="Add a comment"
          type="text"
          v-model="REPLY_CONTENT"
        />
        <span class="input-group-addon">
          <a href="javascript:void(0);" @click="insertReply"
            ><i class="fa fa-edit"></i
          ></a>
        </span>
      </div>
      <ul class="comments-list">
        <li class="comment" v-for="(data, index) in reply" :key="index">
          <a class="pull-left" href="#">
            <img
              class="avatar"
              src="http://bootdey.com/img/Content/user_1.jpg"
              alt="avatar"
            />
          </a>
          <div class="comment-body">
            <div class="comment-heading">
              <h4 class="user">{{ data.USER_ID }}</h4>
              <h5 class="time">
                <i
                  class="fas fa-edit fa-1x"
                  @click="showUpdateForm(data.REPLY_NUM)"
                ></i
                >수정
              </h5>
              <h5 class="time">5 minutes ago</h5>
            </div>
            <p :id="`reply_${data.REPLY_NUM}`">{{ data.REPLY_CONTENT }}</p>
            <div :id="`reply_content${data.REPLY_NUM}`" style="display:none;">
              <input
                type="text"
                :value="data.REPLY_CONTENT"
                :id="`reply_input${data.REPLY_NUM}`"
              />
              <button
                class="btn btn-warning"
                @click="updateReply(data.REPLY_NUM)"
              >
                수정
              </button>
            </div>
          </div>
          <!-- <ul class="comments-list">
            <li class="comment">
              <a class="pull-left" href="#">
                <img
                  class="avatar"
                  src="http://bootdey.com/img/Content/user_3.jpg"
                  alt="avatar"
                />
              </a>
              <div class="comment-body">
                <div class="comment-heading">
                  <h4 class="user">Ryan Haywood</h4>
                  <h5 class="time">3 minutes ago</h5>
                </div>
                <p>Relax my friend</p>
              </div>
            </li>
          </ul> -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { addReply, getReplyAll, updateReply } from '@/api/Reply.js';
export default {
  props: ['item'],
  data() {
    return {
      REPLY_CONTENT: '',
      reply: [],
    };
  },
  created() {
    this.viewReply();
  },
  methods: {
    async insertReply() {
      try {
        const reqData = {
          REPLY_CONTENT: this.REPLY_CONTENT,
          GDS_NUM: this.item.GDS_NUM,
          USER_ID: this.$store.state.user.USER_ID,
        };
        const response = await addReply(reqData);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    async updateReply(REPLY_NUM) {
      try {
        const replyInput = document.getElementById('reply_input' + REPLY_NUM)
          .value;
        const reqData = {
          REPLY_NUM: REPLY_NUM,
          REPLY_CONTENT: replyInput,
        };
        const response = await updateReply(reqData);
        console.log(response);
        this.showUpdateForm(REPLY_NUM);
        this.viewReply();
      } catch (error) {
        console.log(error);
      }
    },
    showUpdateForm(REPLY_NUM) {
      const showInput = document.getElementById('reply_content' + REPLY_NUM);
      if (showInput.style.display == 'none') {
        showInput.style.display = 'block';
      } else {
        showInput.style.display = 'none';
      }
    },
    async viewReply() {
      try {
        const reqData = {
          GDS_NUM: this.item.GDS_NUM,
        };
        const response = await getReplyAll(reqData);
        console.log(response);
        this.reply = response.data.results;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped src="@/assets/css/reply.css"></style>
