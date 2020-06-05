<template>
  <div>
    <header>
      <router-link to="/login">로그인</router-link>
      <router-link to="/signup">회원가입</router-link>
    </header>
    <router-view></router-view>
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
  },
};
</script>

<style></style>
