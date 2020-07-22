<template>
  <div>
    <header id="header">
      <ToolBar></ToolBar>
      <div v-if="this.$store.state.isView"></div>
    </header>
    <!-- <img src="" alt="잘되는지 테스트" ref="img" /> -->
    <Slider v-if="this.$store.state.isView"></Slider>
    <router-view :key="$route.fullPath"></router-view>
    <Spinner></Spinner>
    <a href="#" class="topBtn"
      ><span><i class="fas fa-arrow-up fa-1x"> Top</i></span></a
    >
    <Footer></Footer>
  </div>
</template>

<script>
import ToolBar from '@/components/main/ToolBar';
import Slider from '@/components/common/slider';
import Footer from '@/components/common/footer';
export default {
  components: {
    ToolBar,
    Slider,
    Footer,
  },
  data() {
    return {
      isAdminView: false,
    };
  },
  // created() {
  //   this.$http
  //     .post('/api/test')
  //     .then(response => {
  //       console.log(response);
  //       this.$refs.img.src = response.data;
  //     })
  //     .catch(error => alert(error));
  // },
};
</script>
<style>
#footer {
  position: absolute;

  bottom: 0;

  width: 100%;

  height: 70px;
}
* {
  box-sizing: border-box;
}
.topBtn {
  position: fixed;
  right: 5%;
  bottom: 5%;
  color: #333;
}
.topBtn:hover {
  color: coral;
}
</style>
