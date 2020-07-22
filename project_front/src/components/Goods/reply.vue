<template>
  <div class="panel panel-white post panel-shadow">
    <div class="post-footer">
      <div class="input-group">
        <input
          class="form-control"
          placeholder="Add a comment"
          type="text"
          v-model="REPLY_CONTENT"
          @keyup.enter="insertReply"
        />
        <span class="input-group-addon">
          <a href="javascript:void(0);" @click="insertReply"
            ><i class="fa fa-edit"></i
          ></a>
        </span>
      </div>
      <ul class="comments-list">
        <li
          class="comment"
          v-for="(data, index) in reply"
          :key="index"
          v-bind:style="getStyle(data.REPLY_DEPTH)"
        >
          <a class="pull-left" href="#">
            <img
              class="avatar"
              :src="getUrl(data.USER_THUMBNAIL, data.ISSNS)"
              alt="avatar"
            />
          </a>
          <div class="comment-body">
            <div class="comment-heading">
              <h4 class="user">{{ data.USER_ID }}</h4>
              <a
                href="javascript:void(0);"
                v-if="compareUser(data.USER_ID) && data.IS_DELETE == 0"
              >
                <h5 class="time">
                  <i
                    class="fas fa-edit fa-1x"
                    @click="showUpdateForm(data.REPLY_NUM)"
                  ></i
                  >수정
                </h5></a
              >
              <a
                href="javascript:void(0);"
                v-if="compareUser(data.USER_ID) && data.IS_DELETE == 0"
                @click="deleteReply(data.REPLY_NUM)"
              >
                <h2 class="time"><i class="fas fa-trash fa-1x"></i>삭제</h2>
              </a>
              <a
                href="javascript:void(0);"
                @click="showRelpyForm(data)"
                v-if="data.REPLY_DEPTH == 0"
                ><h5 class="time">
                  <i class="fas fa-edit fa-1x"></i
                  ><span>&nbsp;&nbsp;&nbsp;답글 </span>
                </h5></a
              >
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
            <div
              :id="`re_reply_content${data.REPLY_NUM}`"
              style="display:none;"
            >
              <input
                type="text"
                :id="`re_reply_input${data.REPLY_NUM}`"
                @keyup.enter="insertReply(data)"
              />
              <button class="btn btn-warning" @click="insertReply(data)">
                작성
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
import {
  addReply,
  getReplyAll,
  updateReply,
  deleteReply,
} from '@/api/Reply.js';
import Validation from '@/util/data/Validation.js';
export default {
  props: ['item'],
  data() {
    return {
      REPLY_CONTENT: '',
      reply: [],
    };
  },
  async mounted() {
    await this.viewReply();

    this.$emit('replyCount', this.reply.length);
  },
  methods: {
    showRelpyForm(data) {
      const showInput = document.getElementById(
        're_reply_content' + data.REPLY_NUM,
      );
      if (showInput.style.display == 'none') {
        showInput.style.display = 'block';
      } else {
        showInput.style.display = 'none';
      }
    },
    getStyle(depth) {
      let styleReply = {
        'margin-left': 5 * depth + '%',
      };
      return styleReply;
    },
    getUrl(USER_THUMBNAIL, ISSNS) {
      if (Validation.isNull(USER_THUMBNAIL)) {
        if (Validation.isNull(ISSNS)) {
          return USER_THUMBNAIL;
        }
        return this.$store.state.url + USER_THUMBNAIL;
      } else {
        return 'http://bootdey.com/img/Content/user_1.jpg';
      }
    },
    async insertReply(data) {
      if (!Validation.isNull(data.REPLY_NUM)) {
        if (this.$store.state.user.USER_ID == '') {
          alert('로그인을 해주세요');
          return;
        }
        if (this.REPLY_CONTENT == '') {
          alert('댓글을 입력해주세요');
          return;
        }
        if (!Validation.isLength(this.REPLY_CONTENT, 200)) {
          alert('댓글은 200자 내로 입력해주세요.');
          return;
        }
      } else {
        let inputValue = document.getElementById(
          're_reply_input' + data.REPLY_NUM,
        ).value;
        if (this.$store.state.user.USER_ID == '') {
          alert('로그인을 해주세요');
          return;
        }
        if (inputValue == '') {
          alert('댓글을 입력해주세요');
          return;
        }
        if (!Validation.isLength(inputValue, 200)) {
          alert('댓글은 200자 내로 입력해주세요.');
          return;
        }
      }

      try {
        let reqData;
        if (!Validation.isNull(data.REPLY_NUM)) {
          reqData = {
            REPLY_CONTENT: this.REPLY_CONTENT,
            GDS_NUM: this.item.GDS_NUM,
            USER_ID: this.$store.state.user.USER_ID,
            REPLY_DEPTH: 0,
            REPLY_PARENT: 0,
            REPLY_GROUP: null,
          };
        } else {
          reqData = {
            REPLY_CONTENT: document.getElementById(
              're_reply_input' + data.REPLY_NUM,
            ).value,
            GDS_NUM: this.item.GDS_NUM,
            USER_ID: this.$store.state.user.USER_ID,
            REPLY_DEPTH: data.REPLY_DEPTH + 1,
            REPLY_GROUP: data.REPLY_GROUP,
            REPLY_PARENT: data.REPLY_NUM,
          };
        }
        await addReply(reqData);
        if (Validation.isNull(data.REPLY_NUM)) this.showRelpyForm(data);
        this.viewReply();
      } catch (error) {
        alert(error);
      }
    },
    compareUser(USER_ID) {
      return this.$store.state.user.USER_ID == USER_ID ? true : false;
    },
    async updateReply(REPLY_NUM) {
      try {
        const replyInput = document.getElementById('reply_input' + REPLY_NUM)
          .value;
        if (this.$store.state.user.USER_ID == '') {
          alert('로그인을 해주세요');
          return;
        }
        if (replyInput == '') {
          alert('댓글을 입력해주세요');
          return;
        }
        if (!Validation.isLength(replyInput, 200)) {
          alert('댓글은 200자 내로 입력해주세요.');
          return;
        }

        const reqData = {
          REPLY_NUM: REPLY_NUM,
          REPLY_CONTENT: replyInput,
        };
        await updateReply(reqData);
        this.showUpdateForm(REPLY_NUM);
        this.viewReply();
      } catch (error) {
        alert(error);
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
          GDS_NUM: this.$route.params.gds_num,
        };
        const response = await getReplyAll(reqData);
        this.reply = response.data;
      } catch (error) {
        alert(error);
      }
    },
    async deleteReply(REPLY_NUM) {
      try {
        const confirmDelete = confirm('댓글을 삭제 하시겠습니까?');
        if (confirmDelete) {
          const reqData = {
            REPLY_NUM,
          };
          await deleteReply(reqData);
          this.viewReply();
        }
      } catch (error) {
        alert(error);
      }
    },
  },
};
</script>

<style scoped src="@/assets/css/reply.css"></style>
