<template>
  <div class="top-bar">
    <div class="container">
      <div class="row">
        <div class="col-md-6"></div>

        <div class="col-md-6">
          <div class="action pull-right">
            <ul>
              <li>
                <router-link to="/login" v-if="!getUser"
                  ><i class="fa fa-user"></i>로그인</router-link
                >
                <a v-else @click="logout" href="javascript:void(0);"
                  >로그아웃</a
                >
              </li>

              <li>
                <router-link to="/signup" v-if="!getUser"
                  ><i class="fa fa-lock"></i>회원가입</router-link
                >
              </li>
              <li>
                <router-link
                  v-if="this.$store.state.user.USER_VERIFY == 9"
                  to="/admin"
                  >관리자 페이지<i class="fa fa-user"></i
                ></router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    getUser() {
      return this.$store.state.user.USER_ID;
    },
  },
};
</script>

<style></style>
