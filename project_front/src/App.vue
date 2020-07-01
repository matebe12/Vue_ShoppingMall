<template>
  <div>
    <header id="header">
      <ToolBar></ToolBar>
      <div v-if="this.$store.state.isView"></div>
    </header>
    <router-view :key="$route.fullPath"></router-view>
    <Spinner></Spinner>
  </div>
</template>

<script>
import ToolBar from '@/components/main/ToolBar';
export default {
  components: {
    ToolBar,
  },
  data() {
    return {
      isAdminView: false,
    };
  },
  methods: {},
};
</script>
<style>
#footer {
  position: absolute;

  bottom: 0;

  width: 100%;

  height: 70px;
}
</style>
