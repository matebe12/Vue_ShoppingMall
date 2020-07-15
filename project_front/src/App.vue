<template>
  <div>
    <header id="header">
      <ToolBar></ToolBar>
      <div v-if="this.$store.state.isView"></div>
    </header>
    <Slider v-if="this.$store.state.isView"></Slider>
    <router-view :key="$route.fullPath"></router-view>
    <Spinner></Spinner>
    <a href="#" class="topBtn"
      ><span><i class="fas fa-arrow-up fa-1x"> Top</i></span></a
    >
  </div>
</template>

<script>
import ToolBar from '@/components/main/ToolBar';
import Slider from '@/components/common/slider';
export default {
  components: {
    ToolBar,
    Slider,
  },
  data() {
    return {
      isAdminView: false,
    };
  },
  computed: {
    getsrc() {
      return 'C:/upload/1592222647658Vuex구조.png';
    },
  },
  methods: {
    goTop() {
      console.log('toptoptop');
    },
  },
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
