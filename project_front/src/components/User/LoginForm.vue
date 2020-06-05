<template>
  <section id="content">
    <form role="form" method="post" autocomplete="off" @submit.prevent="login">
      <div class="input_area">
        <label for="userId">아이디</label>
        <input
          type="text"
          id="userId"
          name="userId"
          required="required"
          v-model="USER_ID"
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

      <button type="submit" id="signin_btn" name="signin_btn">로그인</button>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      USER_ID: '',
      USER_PW: '',
    };
  },
  methods: {
    login() {
      console.log('로그인');
      const reqData = {
        USER_ID: this.USER_ID,
        USER_PW: this.USER_PW,
      };
      this.$http
        .post('/api/user/login', reqData)
        .then(response => {
          console.log(response);
          if (!response.data.isMatchedPw || !response.data.searchUser) {
            alert('아이디 및 비밀번호가 틀립니다.');
          } else {
            alert('로그인 되었습니다.');
            //토큰 받아야함 예정
            this.$router.push('/');
          }
        })
        .catch(error => {
          console.log(error);
          alert('로그인에 실패했습니다.');
        });
    },
  },
};
</script>

<style></style>
