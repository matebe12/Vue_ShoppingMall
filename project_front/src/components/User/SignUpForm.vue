<template>
  <div>
    <section id="content">
      <form
        role="form"
        method="post"
        autocomplete="off"
        @submit.prevent="signUp"
      >
        <div class="input_area">
          <label for="userId">아이디</label>
          <input
            type="text"
            id="userId"
            name="userId"
            placeholder="example"
            required="required"
            v-model="USER_ID"
            autocomplete="false"
          />
        </div>

        <div class="input_area">
          <label for="userPass">패스워드</label>
          <input
            type="password"
            id="userPass"
            name="userPass"
            required="required"
            v-model="USER_PW"
          />
        </div>

        <div class="input_area">
          <label for="userPhon">연락처</label>
          <input
            type="text"
            id="userPhon"
            name="userPhon"
            placeholder="연락처를 입력해주세요"
            required="required"
            v-model="USER_PHONE"
          />
        </div>

        <button type="submit" id="signup_btn" name="signup_btn">
          회원가입
        </button>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      USER_ID: '',
      USER_PW: '',
      USER_PHONE: '',
    };
  },
  methods: {
    signUp() {
      console.log('회원가입 로그');
      const reqData = {
        USER_ID: this.USER_ID,
        USER_PW: this.USER_PW,
        USER_PHONE: this.USER_PHONE,
      };
      this.$http
        .post('/api/user/signup', reqData)
        .then(response => {
          console.log(response);
          alert('회원가입을 축하합니다.');
          this.$router.push('/');
        })
        .catch(error => {
          console.log(error);
          alert('회원가입에 실패했습니다.');
        });
    },
  },
};
</script>

<style></style>
