<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <h1 class="entry-title"><span>Sign Up</span></h1>
        <hr />
        <form
          class="form-horizontal"
          method="post"
          name="signup"
          id="signup"
          @submit.prevent="signUp"
        >
          <div class="form-group">
            <label class="control-label col-sm-3"
              >아이디 <span class="text-danger">*</span></label
            >
            <div class="col-md-5 col-sm-8">
              <div class="input-group">
                <span class="input-group-addon"
                  ><i class="fas fa-user"></i
                ></span>
                <input
                  type="text"
                  class="form-control"
                  name="USER_ID"
                  id="USER_ID"
                  v-model="USER_ID"
                  @keyup="checkId()"
                />
                <span>{{ checkIdMsg }}</span>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label class="control-label col-sm-3"
              >이메일 <span class="text-danger">*</span></label
            >
            <div class="col-md-5 col-sm-8">
              <div class="input-group">
                <span class="input-group-addon"
                  ><i class="fas fa-user"></i
                ></span>
                <input
                  type="email"
                  class="form-control"
                  name="USER_EMAIL"
                  id="USER_EMAIL"
                  v-model="USER_EMAIL"
                />
              </div>
            </div>
          </div>

          <div class="form-group">
            <label class="control-label col-sm-3"
              >비밀번호 <span class="text-danger">*</span></label
            >
            <div class="col-md-5 col-sm-8">
              <div class="input-group">
                <span class="input-group-addon"
                  ><i class="glyphicon glyphicon-lock"></i
                ></span>
                <input
                  type="password"
                  class="form-control"
                  name="USER_PW"
                  id="USER_PW"
                  placeholder="Choose password (5-15 chars)"
                  v-model="USER_PW"
                />
              </div>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-sm-3"
              >비밀번호 확인 <span class="text-danger">*</span></label
            >
            <div class="col-md-5 col-sm-8">
              <div class="input-group">
                <span class="input-group-addon"
                  ><i class="glyphicon glyphicon-lock"></i
                ></span>
                <input
                  type="password"
                  class="form-control"
                  name="USER_PW_C"
                  id="USER_PW_C"
                  v-model="USER_PW_C"
                />
              </div>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-sm-3"
              >이름 <span class="text-danger">*</span></label
            >
            <div class="col-md-5 col-sm-8">
              <div class="input-group">
                <span class="input-group-addon"
                  ><i class="fas fa-user"></i
                ></span>
                <input
                  type="text"
                  class="form-control"
                  name="USER_NAME"
                  id="USER_NAME"
                  v-model="USER_NAME"
                />
              </div>
            </div>
          </div>
          <div class="form-group">
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
                  v-model="USER_GENDER"
                />
                남성
              </label>

              <label>
                <input
                  name="gender"
                  type="radio"
                  value="Female"
                  v-model="USER_GENDER"
                />
                여성
              </label>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-sm-3"
              >전화번호 <span class="text-danger">*</span></label
            >
            <div class="col-md-5 col-sm-8">
              <div class="input-group">
                <span class="input-group-addon"
                  ><i class="glyphicon glyphicon-phone"></i
                ></span>
                <input
                  type="text"
                  class="form-control"
                  name="USER_PHONE"
                  id="USER_PHONE"
                  v-model="USER_PHONE"
                />
              </div>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-sm-3"
              >주소 <span class="text-danger">*</span></label
            >
            <div class="col-md-5 col-sm-8">
              <div class="input-group">
                <span class="input-group-addon"
                  ><i class="fas fa-address-book"></i
                ></span>
                <input
                  type="text"
                  class="form-control input-width-sm"
                  name="USER_ADDR1"
                  id="USER_ADDR1"
                  v-model="USER_ADDR1"
                />
                <button
                  type="button"
                  class="findBtn"
                  @click="isAddressMethod()"
                >
                  주소찾기
                </button>
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
                  v-model="USER_ADDR2"
                />
              </div>
            </div>
          </div>
          <div class="form-group">
            <label class="control-label col-sm-3"
              >생년월일 <span class="text-danger">*</span></label
            >
            <div class="col-md-8 col-sm-9">
              <div
                class="tui-datepicker-input tui-datetime-input tui-has-focus"
              >
                <input
                  type="text"
                  id="tui-date-picker-target"
                  aria-label="Date-Time"
                  readonly
                />
                <span class="tui-ico-date"></span>
              </div>
              <div
                id="tui-date-picker-container"
                style="margin-top: -1px;"
              ></div>
            </div>
            <div class="control-label col-sm-3">
              <input
                name="Submit"
                type="submit"
                value="Sign Up"
                class="btn btn-default"
                style="float:right"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { createDatePicker } from '@/util/tui grid/tuiDatePicker';
import Validation from '@/util/data/Validation.js';
import { signup } from '@/api/User.js';
import post from '@/util/daum/post.vue';
import { checkId } from '@/api/User.js';
var datePicker;
export default {
  components: {
    post,
  },
  data() {
    return {
      USER_ID: '',
      USER_EMAIL: '',
      USER_PW: '',
      USER_PHONE: '',
      USER_GENDER: '',
      USER_NAME: '',
      USER_PW_C: '',
      USER_ADDR1: '',
      USER_ADDR2: '',
      checkIdMsg: '',
      isAddress: false,
    };
  },
  mounted() {
    datePicker = createDatePicker(
      '#tui-date-picker-container',
      '#tui-date-picker-target',
    );
    datePicker.getDate();
  },
  methods: {
    async checkId() {
      const result = await checkId({ USER_ID: this.USER_ID });
      if (result.data[0].TOTAL == 0) {
        this.checkIdMsg = '사용 가능한 아이디 입니다.';
        return true;
      } else {
        this.checkIdMsg = '이미 존재하는 아이디 입니다.';
        return false;
      }
    },

    setAddress(data) {
      this.USER_ADDR1 = data;
      this.isAddressMethod();
    },
    isAddressMethod() {
      this.isAddress = !this.isAddress;
    },
    async signUp() {
      const checkId = await this.checkId(this.USER_ID);
      if (!checkId) {
        alert('이미 존재하는 아이디 입니다.');
        return;
      }
      const check = this.checkValidation();
      if (check) {
        const reqData = {
          USER_ID: this.USER_ID,
          USER_PW: this.USER_PW,
          USER_PHONE: this.USER_PHONE,
          USER_GENDER: this.USER_GENDER,
          USER_NAME: this.USER_NAME,
          USER_ADDR1: this.USER_ADDR1,
          USER_ADDR2: this.USER_ADDR2,
          USER_BIRTH: document.querySelector('#tui-date-picker-target').value,
          USER_EMAIL: this.USER_EMAIL,
        };
        try {
          await signup(reqData);
          this.$router.push('/');
        } catch (error) {
          alert(error);
        }
      }
    },
    checkValidation() {
      let user_id = Validation.isNull(this.USER_ID);
      if (!user_id) {
        alert('아이디를 입력해주세요.');
        return false;
      }
      user_id = Validation.isLength(this.USER_ID, 20);
      if (!user_id) {
        alert('아이디는 20자 이내로 입력해주세요.');
        return false;
      }
      let user_pw = Validation.isPw(this.USER_PW);
      if (!user_pw) {
        alert('비밀번호는 6자 이상 20자 이내로 입력 해주세요.');
        return false;
      }
      user_pw = Validation.isCompare(this.USER_PW, this.USER_PW_C);
      if (!user_pw) {
        alert('비밀번호를 확인해주세요.');
        return false;
      }
      let user_name = Validation.isNull(this.USER_NAME);
      if (!user_name) {
        alert('이름을 입력해주세요.');
        return false;
      }
      user_name = Validation.isLength(this.USER_NAME, 10);
      if (!user_name) {
        alert('이름은 10자 이내로 입력해주세요.');
        return false;
      }

      let user_gender = Validation.isNull(this.USER_GENDER);
      if (!user_gender) {
        alert('성별을 선택해주세요.');
        return false;
      }
      let user_phone = Validation.isNull(this.USER_PHONE);
      if (!user_phone) {
        alert('전화번호를 입력해주세요.');
        return false;
      }

      user_phone = Validation.isLength(this.USER_PHONE, 20);
      if (!user_phone) {
        alert('전화번호는 20자 이내로 입력해주세요.');
        return false;
      }
      user_phone = Validation.isPhone(this.USER_PHONE);
      if (!user_phone) {
        alert('전화번호 형식이 맞지 않습니다.');
        return false;
      }
      let user_addr1 = Validation.isNull(this.USER_ADDR1);
      if (!user_addr1) {
        alert('1차 주소를 입력 해주세요.');
        return false;
      }
      user_addr1 = Validation.isLength(this.USER_ADDR1, 50);
      if (!user_addr1) {
        alert('1차 주소는 50자 이내로 입력해주세요.');
        return false;
      }
      let user_addr2 = Validation.isNull(this.USER_ADDR2);
      if (!user_addr2) {
        alert('나머지 주소를 입력 해주세요.');
        return false;
      }
      user_addr1 = Validation.isLength(this.USER_ADDR1, 50);
      if (!user_addr2) {
        alert('나머지 주소는 50자 이내로 입력해주세요.');
        return false;
      }

      return true;
    },
  },
};
</script>

<style scoped>
@import url(
  http://fonts.googleapis.com/css?family=Roboto:400,
  300,
  100,
  500,
  700
);
@import url(
  http://fonts.googleapis.com/css?family=Roboto+Condensed:400,
  300,
  700
);

body {
  background: #fff;
  font-family: 'Roboto', sans-serif;
  color: #333;
  line-height: 22px;
}
.input-width-sm {
  width: 61%;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 400;
  color: #111;
  margin-top: 5px;
  margin-bottom: 5px;
}
h1,
h2,
h3 {
  text-transform: uppercase;
}

input.upload {
  position: absolute;
  top: 0;
  right: 0;
  margin: 0;
  padding: 0;
  font-size: 12px;
  cursor: pointer;
  opacity: 1;
  filter: alpha(opacity=1);
}

.form-inline .form-group {
  margin-left: 0;
  margin-right: 0;
}
.control-label {
  color: #333333;
}
</style>
