<template>
  <div>
    <header id="header">
      <ToolBar></ToolBar>
      <div v-if="this.$store.state.isView">
        <ShopHeader></ShopHeader>
        <Navigator></Navigator>
      </div>
    </header>
    <router-view :key="$route.fullPath"></router-view>
    <Spinner></Spinner>
  </div>
</template>

<script>
import ToolBar from '@/components/main/ToolBar';
import ShopHeader from '@/components/main/Header';
import Navigator from '@/components/main/Navigator';
export default {
  components: {
    ToolBar,
    ShopHeader,
    Navigator,
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
<style>
#footer {
  position: absolute;

  bottom: 0;

  width: 100%;

  height: 70px;
}
</style>
