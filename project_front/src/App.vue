<template>
  <div>
    <header id="header">
      <ToolBar></ToolBar>
      <div v-if="this.$store.state.isView">
        <ShopHeader></ShopHeader>
        <Banner></Banner>
        <Navigator></Navigator>
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
import ToolBar from '@/components/main/ToolBar';
import ShopHeader from '@/components/main/Header';
import Navigator from '@/components/main/Navigator';
import Banner from '@/components/main/Banner';
export default {
  components: {
    ToolBar,
    ShopHeader,
    Navigator,
    Banner,
  },
  data() {
    return {
      isAdminView: false,
    };
  },
  methods: {},
};
</script>

<style src="@/assets/css/style.css"></style>
