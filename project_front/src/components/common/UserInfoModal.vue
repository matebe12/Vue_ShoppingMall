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
                <div class="col-xs-7">
                  <span class="text-danger">*</span>주문 시 내 주소를 사용하기
                  위해 작성해주세요.
                </div>
                <div class="col-xs-7">
                  <img :src="getUrl()" ref="image" id="image" />
                  <input
                    type="file"
                    id="USER_THUMBNAIL"
                    ref="file"
                    name="USER_THUMBNAIL"
                    v-if="$store.state.user.ISSNS != 'kakao'"
                    accept="image/*"
                    @change="previewImg"
                  />
                  <button type="button" @click="replacrUrl()">되돌리기</button>
                </div>
                <div class="col-xs-7">
                  <label for="USER_ID">아이디</label>
                  <input
                    type="text"
                    id="USER_ID"
                    readonly
                    v-model="item.USER_ID"
                    class="form-control"
                    name="USER_ID"
                  />
                </div>
                <div class="col-xs-7">
                  <label for="USER_NAME"
                    >이름 <span class="text-danger">*</span></label
                  >
                  <input
                    type="text"
                    id="USER_NAME"
                    v-model="item.USER_NAME"
                    class="form-control"
                    name="USER_NAME"
                  />
                </div>
                <div class="col-xs-7">
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
                <div class="col-xs-7  address-scope">
                  <label>주소 <span class="text-danger">*</span></label>
                  <div style="display:flex">
                    <input
                      type="text"
                      class="form-control input-width-sm"
                      name="USER_ADDR1"
                      id="USER_ADDR1"
                      v-model="item.USER_ADDR1"
                    />
                    <button
                      type="button"
                      class="findBtn"
                      @click="isAddressMethod()"
                    >
                      주소찾기
                    </button>
                  </div>

                  <post
                    v-if="isAddress"
                    @close="isAddressMethod()"
                    @setAddress="setAddress"
                  ></post>
                  <input
                    type="text"
                    class="form-control"
                    name="USER_ADDR2"
                    id="USER_ADDR2"
                    v-model="item.USER_ADDR2"
                  />
                </div>
              </div>
            </form>
          </div>
          <div style="margin-top:10px;">
            <span>
              <i class="fas fa-edit fa-2x"
                ><a href="javascript:void(0);" @click="updateUser">수정</a></i
              ></span
            >
          </div>
          <!-- 푸터 -->
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
//import Validation from '@/util/data/Validation.js';
import post from '@/util/daum/post.vue';
import Validation from '@/util/data/Validation.js';
import { getUserDetail, updateUser } from '@/api/User.js';
export default {
  data() {
    return {
      item: {},
      isAddress: false,
      uploadImage: '',
    };
  },
  methods: {
    getUrl() {
      if (!Validation.isNull(this.$store.state.user.ISSNS == '')) {
        if (Validation.isNull(this.$store.state.user.USER_THUMBNAIL))
          return this.$store.state.url + this.$store.state.user.USER_THUMBNAIL;
        else return 'http://bootdey.com/img/Content/user_1.jpg';
      } else {
        return this.$store.state.user.USER_THUMBNAIL;
      }
    },
    replacrUrl() {
      const imgSrc = this.getUrl();
      this.$refs.image.src = imgSrc;
    },
    setAddress(data) {
      this.item.USER_ADDR1 = data;
      this.isAddressMethod();
    },
    isAddressMethod() {
      this.isAddress = !this.isAddress;
    },
    closeModal() {
      this.$emit('closeModal');
    },
    async updateUser() {
      try {
        const form = this.$refs.form;
        const formData = new FormData(form);
        const result = this.checkValidation(formData);
        if (result) {
          //   const reqData = {
          //     USER_ID: formData.get('USER_ID'),
          //     USER_NAME: formData.get('USER_NAME'),
          //     USER_PHONE: formData.get('USER_PHONE'),
          //     USER_ADDR1: formData.get('USER_ADDR1'),
          //     USER_ADDR2: formData.get('USER_ADDR2'),
          //     USER_THUMBNAIL: formData.get('USER_ADDR2'),
          //   };
          await updateUser(formData);
          alert('수정이 완료 되었습니다. 다시 로그인 해주세요.');
          this.$store.state.isModal = !this.$store.state.isModal;
          this.$emit('refresh');
        }
        //await updateUser(formData);
      } catch (error) {
        alert(error);
      }
    },
    checkValidation(formData) {
      let user_name = Validation.isNull(formData.get('USER_NAME'));
      if (!user_name) {
        alert('이름을 입력해주세요.');
        document.getElementById('USER_NAME').focus();
        return false;
      }
      user_name = Validation.isLength(formData.get('USER_NAME'), 10);
      if (!user_name) {
        alert('이름은 10자 이내로 입력해주세요.');
        document.getElementById('USER_NAME').focus();
        return false;
      }
      let user_phone = Validation.isNull(formData.get('USER_PHONE'));
      if (!user_phone) {
        alert('전화번호를 입력해주세요.');
        document.getElementById('USER_PHONE').focus();
        return false;
      }
      user_phone = Validation.isLength(formData.get('USER_PHONE'), 20);
      if (!user_phone) {
        alert('전화번호는 20자 이내로 입력해주세요.');
        document.getElementById('USER_PHONE').focus();
        return false;
      }
      user_phone = Validation.isPhone(formData.get('USER_PHONE'));
      if (!user_phone) {
        alert('전화번호 형식이 맞지 않습니다.');
        document.getElementById('USER_PHONE').focus();
        return false;
      }
      let user_addr1 = Validation.isNull(formData.get('USER_ADDR1'));
      if (!user_addr1) {
        alert('1차 주소를 입력 해주세요.');
        document.getElementById('USER_ADDR1').focus();
        return false;
      }
      user_addr1 = Validation.isLength(formData.get('USER_ADDR1'), 50);
      if (!user_addr1) {
        alert('1차 주소는 50자 이내로 입력해주세요.');
        document.getElementById('USER_ADDR1').focus();
        return false;
      }
      let user_addr2 = Validation.isNull(formData.get('USER_ADDR2'));
      if (!user_addr2) {
        alert('나머지 주소를 입력 해주세요.');
        document.getElementById('USER_ADDR2').focus();
        return false;
      }
      user_addr1 = Validation.isLength(formData.get('USER_ADDR2'), 50);
      if (!user_addr2) {
        alert('나머지 주소는 50자 이내로 입력해주세요.');
        document.getElementById('USER_ADDR2').focus();
        return false;
      }

      return true;
    },
    async getUserDetail() {
      try {
        const response = await getUserDetail({
          USER_ID: this.$store.state.user.USER_ID,
        });
        this.item = response.data.results[0];
      } catch (error) {
        alert(error);
      }
    },
    previewImg(e) {
      const file = e.target.files[0]; // Get first index in files
      this.$refs.image.src = URL.createObjectURL(file); // Create File URL
    },
  },

  async created() {
    //사용자 정보 불러오기
    this.getUserDetail();
  },
  components: {
    //Validation,
    post,
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
#image {
  width: 110px;
  height: 110px;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 700px;
  height: 600px;
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
#USER_ADDR1 {
  width: 50%;
}
.address-scope {
  width: 100%;
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
