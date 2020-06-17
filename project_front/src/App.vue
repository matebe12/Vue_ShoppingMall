<template>
  <div>
    <header id="header">
      <ToolBar></ToolBar>
      <ShopHeader></ShopHeader>
      <Navigator></Navigator>
      <Banner></Banner>
      <FeaturedItem></FeaturedItem>
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
import FeaturedItem from '@/components/main/FeaturedItem';

export default {
  components: {
    ToolBar,
    ShopHeader,
    Navigator,
    Banner,
    FeaturedItem,
  },
  methods: {
    logout() {
      this.$store.commit('logout');
      this.$router.push('/');
    },
  },
};
</script>

<style src="@/assets/css/style.css"></style>
