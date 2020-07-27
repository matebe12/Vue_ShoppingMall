<template>
  <div>
    <div class="form-gap"></div>
    <div class="container">
      <div class="row">
        <div class="col-md-4 col-md-offset-4">
          <div class="panel panel-default">
            <div class="panel-body">
              <div class="text-center">
                <h3><i class="fa fa-lock fa-4x"></i></h3>
                <h2 class="text-center">Forgot Password?</h2>
                <p>You can reset your password here.</p>
                <div class="panel-body">
                  <form
                    id="register-form"
                    role="form"
                    autocomplete="off"
                    class="form"
                    method="post"
                    @submit.prevent="searchPw"
                  >
                    <div class="form-group">
                      <div class="input-group">
                        <span class="input-group-addon"
                          ><i class="fas fa-user"></i
                        ></span>
                        <input
                          id="id"
                          name="id"
                          placeholder="아이디"
                          class="form-control"
                          type="text"
                          @keyup="checkId()"
                          v-model="idInput"
                        />
                      </div>
                      <span>{{ idCheckMsg }}</span>
                      <div class="input-group">
                        <span class="input-group-addon"
                          ><i
                            class="glyphicon glyphicon-envelope color-blue"
                          ></i
                        ></span>
                        <input
                          id="email"
                          name="email"
                          placeholder="이메일"
                          class="form-control"
                          type="email"
                          @keyup="checkEmail()"
                          v-model="emailInput"
                        />
                      </div>
                      <span>{{ emailCheckMsg }}</span>
                    </div>
                    <div class="form-group">
                      <input
                        name="recover-submit"
                        class="btn btn-lg btn-primary btn-block"
                        value="Reset Password"
                        type="submit"
                      />
                    </div>

                    <input
                      type="hidden"
                      class="hide"
                      name="token"
                      id="token"
                      value=""
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { checkId, checkEmail, getPw } from '@/api/User.js';
import Validation from '@/util/data/Validation.js';
export default {
  data() {
    return {
      idInput: '',
      emailInput: '',
      idCheckMsg: '',
      emailCheckMsg: '',
    };
  },
  methods: {
    async checkId() {
      try {
        const result = await checkId({ USER_ID: this.idInput });
        if (result.data[0].TOTAL == 0) {
          this.idCheckMsg = '해당하는 아이디가 없습니다.';
          return false;
        } else {
          this.idCheckMsg = '';
          return true;
        }
      } catch (error) {
        alert(error);
      }
    },
    async checkEmail() {
      try {
        const result = await checkEmail({
          USER_ID: this.idInput,
          USER_EMAIL: this.emailInput,
        });
        if (result.data[0].TOTAL == 0) {
          this.emailCheckMsg = '가입 시 기재 했던 이메일을 입력 해주세요.';
          return false;
        } else {
          this.emailCheckMsg = '';
          return true;
        }
      } catch (error) {
        alert(error);
      }
    },
    async searchPw() {
      let idCheck = Validation.isNull(this.idInput);
      if (!idCheck) {
        alert('아이디를 입력 해주세요.');
        return;
      }
      idCheck = Validation.isLength(this.idInput, 50);
      if (!idCheck) {
        alert('아이디를 확인해주세요.');
        return;
      }
      let emailCheck = Validation.isNull(this.emailInput);
      if (!emailCheck) {
        alert('이메일을 입력해주세요.');
        return;
      }
      emailCheck = Validation.isLength(this.emailInput, 100);
      if (!emailCheck) {
        alert('이메일을 확인해주세요.');
        return;
      }
      try {
        const id = await this.checkId();
        const email = await this.checkEmail();
        if (id && email) {
          const result = await getPw({
            USER_ID: this.idInput,
            USER_EMAIL: this.emailInput,
          });
          if (result.data.result == 1) {
            alert('해당 이메일로 비밀번호를 발송 했습니다.');
            this.$router.push('/');
          } else {
            alert('알수없는 오류가 발생 하였습니다. 다시 시도해주세요.');
          }
        } else {
          alert('아이디 및 이메일을 확인 해주세요.');
          return;
        }
      } catch (error) {
        alert(error);
      }
    },
  },
  mounted() {
    document.getElementById('id').focus();
  },
};
</script>

<style scoped>
.form-gap {
  padding-top: 70px;
}
</style>
