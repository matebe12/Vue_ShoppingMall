<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <!-- 헤더 -->
          <div class="modal-header">
            <h3 slot="header">
              상세정보
              <i
                class="fas fa-times closeModalBtn"
                @click="closeModal"
                style="float:right"
              ></i>
            </h3>
          </div>
          <!-- 바디 -->
          <div class="modal-body">
            <form
              method="post"
              ref="form"
              autocomplete="off"
              enctype="application/x-www-form-urlencoded"
            >
              <div>
                <div class="col-xs-6">
                  <label for="USER_ID">아이디</label>
                  <input
                    type="text"
                    name="USER_ID"
                    id="USER_ID"
                    class="form-control"
                    v-model="item.USER_ID"
                    disabled
                  />
                </div>
                <div class="col-xs-6">
                  <label for="USER_NAME"
                    >이름 <span class="text-danger">*</span></label
                  >
                  <input
                    type="text"
                    name=""
                    id=""
                    class="form-control"
                    v-model="item.USER_NAME"
                  />
                </div>

                <div class="col-xs-12">
                  <label for="USER_PHONE"
                    >전화번호 <span class="text-danger">*</span></label
                  >
                  <input
                    type="text"
                    id="USER_PHONE"
                    v-model="item.USER_PHONE"
                    class="form-control"
                    name="USER_PHONE"
                  />
                </div>

                <label class="control-label col-sm-3"
                  >성별 <span class="text-danger">*</span></label
                >
                <div class="col-md-8 col-sm-9">
                  <label>
                    <input
                      name="gender"
                      type="radio"
                      value="Male"
                      checked
                      v-model="item.USER_GENDER"
                    />
                    남성
                  </label>

                  <label>
                    <input
                      name="gender"
                      type="radio"
                      value="Female"
                      v-model="item.USER_GENDER"
                    />
                    여성
                  </label>
                </div>
                <div class="col-xs-6">
                  <label for="USER_VERIFY">권한</label>
                  <select
                    name="USER_VERIFY"
                    id="USER_VERIFY"
                    class="form-control"
                    v-model="item.USER_VERIFY"
                  >
                    ,<option :value="i - 1" v-for="i in 10" :key="i">{{
                      i - 1
                    }}</option>
                  </select>
                </div>
              </div>
              <div class="col-md-8 col-sm-9">
                <span>
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="updateUser"
                  >
                    수정
                  </button>
                </span>
                <span>
                  <button
                    type="button"
                    class="btn btn-warning"
                    @click="closeModal"
                  >
                    닫기
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { updateUser } from '@/api/User.js';
import Validation from '@/util/data/Validation.js';
export default {
  props: ['item'],
  data() {
    return {
      key: 'value,',
    };
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
    async updateUser() {
      try {
        const result = this.checkValidation();
        if (result) {
          let reqData = {
            USER_ID: this.item.USER_ID,
            USER_NAME: this.item.USER_NAME,
            USER_PHONE: this.item.USER_PHONE,
            USER_VERIFY: this.item.USER_VERIFY,
            USER_GENDER: this.item.USER_GENDER,
          };
          await updateUser(reqData);
          alert('유저 정보가 업데이트 되었습니다.');
          this.$emit('refreshData');
          this.closeModal();
        }
      } catch (error) {
        alert(error);
      }
    },
    checkValidation() {
      let username = Validation.isNull(this.item.USER_NAME);
      if (!username) {
        alert('이름을 입력해주세요.');
        return false;
      }
      username = Validation.isLength(this.item.USER_NAME, 10);
      if (!username) {
        alert('이름은 10자 이내로 입력해주세요.');
        return false;
      }

      let userphone = Validation.isNull(this.item.USER_PHONE);
      if (!userphone) {
        alert('전화번호를 입력해주세요.');
        return false;
      }
      userphone = Validation.isLength(this.item.USER_PHONE, 20);
      if (!userphone) {
        alert('전화번호는 20자 이내로 입력해주세요.');
        return false;
      }
      userphone = Validation.isPhone(this.item.USER_PHONE);
      if (!userphone) {
        alert('전화번호 형식이 맞지 않습니다.');
        return false;
      }
      let user_gender = Validation.isNull(this.item.USER_GENDER);
      if (!user_gender) {
        alert('성별을 선택해주세요.');
        return false;
      }

      return true;
    },
  },
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
a {
  color: black;
}
a:hover {
  color: coral;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 50%;
  height: 80%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.img_scope {
  margin-top: 10px;
}
textarea {
  resize: none;
}
.fa-trash-alt {
  float: right;
}
.fa-edit {
  float: left;
}
</style>
