<template>
  <div>
    <div class="menu">
      <Aside_Admin></Aside_Admin>
    </div>
    <AdminContent></AdminContent>
  </div>
</template>

<script>
import AdminContent from '@/components/Admin/AdminContent.vue';
import Aside_Admin from '@/components/Admin/Aside.vue';
export default {
  components: {
    AdminContent,
    Aside_Admin,
  },
};
</script>

<style scoped>
.menu {
  display: inline-grid;
  width: 100%;
}
</style>
