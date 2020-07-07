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
            <div class="col-md-8 col-sm-9">
              <div class="input-group">
                <span class="input-group-addon"
                  ><i class="glyphicon glyphicon-envelope"></i
                ></span>
                <input
                  type="text"
                  class="form-control"
                  name="USER_ID"
                  id="USER_ID"
                  v-model="USER_ID"
                />
                <span>{{ checkIdMsg }}</span>
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
            <div class="col-md-8 col-sm-9">
              <input
                type="text"
                class="form-control"
                name="USER_NAME"
                id="USER_NAME"
                v-model="USER_NAME"
              />
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
          </div>
          <div class="col-xs-offset-3 col-xs-10">
            <input
              name="Submit"
              type="submit"
              value="Sign Up"
              class="btn btn-default"
              style="float:right"
            />
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
var datePicker;
export default {
  data() {
    return {
      USER_ID: '',
      USER_PW: '',
      USER_PHONE: '',
      USER_GENDER: '',
      USER_NAME: '',
      USER_PW_C: '',
      checkIdMsg: '',
    };
  },
  mounted() {
    datePicker = createDatePicker(
      '#tui-date-picker-container',
      '#tui-date-picker-target',
    );
    this.date = datePicker.getDate();
  },
  methods: {
    async signUp() {
      const check = this.checkValidation();
      if (check) {
        const reqData = {
          USER_ID: this.USER_ID,
          USER_PW: this.USER_PW,
          USER_PHONE: this.USER_PHONE,
          USER_GENDER: this.USER_GENDER,
          USER_NAME: this.USER_NAME,
          USER_BIRTH: document.querySelector('#tui-date-picker-target').value,
        };
        try {
          await signup(reqData);
          this.$router.push('/');
        } catch (error) {
          console.log(error);
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

      user_phone = Validation.isLength(this.USER_PHONE, 12);
      if (!user_phone) {
        alert('전화번호는 12자 이내로 입력해주세요.');
        return false;
      }
      user_phone = Validation.isPhone(this.USER_PHONE);
      if (!user_phone) {
        alert('전화번호 형식이 맞지 않습니다.');
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
