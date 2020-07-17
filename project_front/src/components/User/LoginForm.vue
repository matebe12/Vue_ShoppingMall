<template>
  <div class="wrapper fadeInDown">
    <div id="formContent">
      <!-- Tabs Titles -->

      <!-- Icon -->
      <div class="fadeIn first">
        <img
          src="https://www.b-cube.in/wp-content/uploads/2014/05/aditya-300x177.jpg"
          id="icon"
          alt="User Icon"
        />
        <h1>SHOP</h1>
      </div>

      <!-- Login Form -->
      <form
        role="form"
        method="post"
        autocomplete="off"
        @submit.prevent="login"
      >
        <input
          type="text"
          id="login"
          class="fadeIn second"
          name="login"
          placeholder="아이디"
          v-model="USER_ID"
        />
        <input
          type="text"
          id="password"
          class="fadeIn third"
          name="login"
          placeholder="비밀번호"
          v-model="USER_PW"
        />
        <input type="submit" class="fadeIn fourth" value="Log In" />
      </form>

      <!-- Remind Passowrd -->
      <div id="formFooter">
        <KakaoLogin
          api-key="e52b116c475a4745986fafc941f4fd41"
          :on-success="loginKakao"
          :on-failure="loginKakao"
        ></KakaoLogin>

        <router-link class="underlineHover" to="/signup">회원가입</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Validation from '@/util/data/Validation.js';
import KakaoLogin from 'vue-kakao-login';
import { loginKakao } from '@/api/User';
export default {
  data() {
    return {
      USER_ID: '',
      USER_PW: '',
    };
  },
  components: {
    KakaoLogin,
  },
  methods: {
    loginKakao(data) {
      window.Kakao.API.request({
        url: '/v2/user/me',

        success: res => {
          let reqData = {
            USER_ID: res.id,
            USER_NAME: res.properties.nickname,
            ACCESS_TOKEN: data.access_token,
          };
          this.loginKakaoCallBack(reqData);
        },
      });
    },
    async loginKakaoCallBack(reqData) {
      try {
        const response = await loginKakao(reqData);
        this.$store.state.user.USER_ID = response.data.USER_ID;
        this.$store.state.user.USER_NAME = response.data.USER_NAME;
        this.$store.state.user.USER_VERIFY = response.data.USER_VERIFY;

        alert('로그인 되었습니다.');
        this.$router.push('/');
      } catch (error) {
        alert(error);
      }
    },
    login() {
      if (!Validation.isNull(this.USER_ID)) {
        alert('아이디를 입력해주세요.');
        return;
      }
      if (!Validation.isNull(this.USER_PW)) {
        alert('아이디를 입력해주세요.');
        return;
      }
      const reqData = {
        USER_ID: this.USER_ID,
        USER_PW: this.USER_PW,
      };
      this.$http
        .post('/api/user/login', reqData)
        .then(async response => {
          if (
            !response.data.resultData.isMatchedPw ||
            !response.data.resultData.searchUser
          ) {
            alert('아이디 및 비밀번호가 틀립니다.');
          } else {
            alert('로그인 되었습니다.');
            this.$store.commit('login', response.data);

            await this.$store.dispatch(
              'getCartList',
              this.$store.state.user.USER_ID,
            );
            this.$router.go(-1);
          }
        })
        .catch(error => {
          alert(error.response.data);
        });
    },
  },
};
</script>

<style scoped>
/* BASIC */

html {
  background-color: #56baed;
}

body {
  font-family: 'Poppins', sans-serif;
  height: 100vh;
}

a {
  color: #92badd;
  display: inline-block;
  text-decoration: none;
  font-weight: 400;
}

h2 {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  display: inline-block;
  margin: 40px 8px 10px 8px;
  color: #cccccc;
}

/* STRUCTURE */

.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding: 20px;
}

#formContent {
  -webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 10px 10px 10px 10px;
  background: #fff;
  padding: 30px;
  width: 90%;
  max-width: 450px;
  position: relative;
  padding: 0px;
  -webkit-box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
  text-align: center;
}

#formFooter {
  background-color: #f6f6f6;
  border-top: 1px solid #dce8f1;
  padding: 25px;
  text-align: center;
  -webkit-border-radius: 0 0 10px 10px;
  border-radius: 0 0 10px 10px;
}

/* TABS */

h2.inactive {
  color: #cccccc;
}

h2.active {
  color: #0d0d0d;
  border-bottom: 2px solid #5fbae9;
}

/* FORM TYPOGRAPHY*/

input[type='button'],
input[type='submit'],
input[type='reset'] {
  background-color: #56baed;
  border: none;
  color: white;
  padding: 15px 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 13px;
  -webkit-box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 5px 20px 40px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

input[type='button']:hover,
input[type='submit']:hover,
input[type='reset']:hover {
  background-color: #39ace7;
}

input[type='button']:active,
input[type='submit']:active,
input[type='reset']:active {
  -moz-transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -o-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
}

input[type='text'] {
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  width: 85%;
  border: 2px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}

input[type='text']:focus {
  background-color: #fff;
  border-bottom: 2px solid #5fbae9;
}

input[type='text']:placeholder {
  color: #cccccc;
}

/* ANIMATIONS */

/* Simple CSS3 Fade-in-down Animation */
.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@-webkit-keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

/* Simple CSS3 Fade-in Animation */
@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-moz-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fadeIn {
  opacity: 0;
  -webkit-animation: fadeIn ease-in 1;
  -moz-animation: fadeIn ease-in 1;
  animation: fadeIn ease-in 1;

  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  animation-fill-mode: forwards;

  -webkit-animation-duration: 1s;
  -moz-animation-duration: 1s;
  animation-duration: 1s;
}

.fadeIn.first {
  -webkit-animation-delay: 0.4s;
  -moz-animation-delay: 0.4s;
  animation-delay: 0.4s;
}

.fadeIn.second {
  -webkit-animation-delay: 0.6s;
  -moz-animation-delay: 0.6s;
  animation-delay: 0.6s;
}

.fadeIn.third {
  -webkit-animation-delay: 0.8s;
  -moz-animation-delay: 0.8s;
  animation-delay: 0.8s;
}

.fadeIn.fourth {
  -webkit-animation-delay: 1s;
  -moz-animation-delay: 1s;
  animation-delay: 1s;
}

/* Simple CSS3 Fade-in Animation */
.underlineHover:after {
  display: block;
  left: 0;
  bottom: -10px;
  width: 0;
  height: 2px;
  background-color: #56baed;
  content: '';
  transition: width 0.2s;
}

.underlineHover:hover {
  color: #0d0d0d;
}

.underlineHover:hover:after {
  width: 100%;
}

h1 {
  color: #60a0ff;
}

/* OTHERS */

*:focus {
  outline: none;
}

#icon {
  width: 30%;
}
</style>
