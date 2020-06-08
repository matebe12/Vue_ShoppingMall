<template>
  <div>
    <header id="header">
      <h1 class="title">SHOP</h1>
      <div>
        <router-link to="/signup">회원가입</router-link>
        <router-link v-if="this.$store.state.user.USER_VERIFY == 9" to="/admin"
          >관리자 페이지</router-link
        >
        <router-link to="/login" v-if="!getUser">로그인</router-link>
        <a v-else @click="logout" href="javascript:void(0);">로그아웃</a>
      </div>
    </header>
    <router-view></router-view>
    <footer id="footer">
      <ul>
        <li>사이트 소개</li>
        <li>이용약관</li>
        <li>Lee</li>
      </ul>
    </footer>
  </div>
</template>

<script>
export default {
  methods: {
    // testApi1() {
    //   this.$http.get('/api/test').then(response => {
    //     console.log('response', response);
    //     this.items = response.data;
    //   });
    // },
    logout() {
      this.$store.commit('logout');
    },
  },
  computed: {
    getUser() {
      return this.$store.state.user.USER_ID;
    },
  },
};
</script>

<style scoped>
body {
  font-family: '맑은 고딕', verdana;
  padding: 0;
  margin: 0;
}
nav#nav {
  padding: 10px;
  text-align: right;
}
header#header {
  font-size: 30px;
  padding: 20px 0;
}
header#header h1 a {
  color: #000;
  font-weight: bold;
}
a {
  margin-left: 10px;
}

footer#footer {
  background: #f9f9f9;
  padding: 20px;
}
footer#footer ul li {
  display: inline-block;
  margin-right: 10px;
}
</style>
