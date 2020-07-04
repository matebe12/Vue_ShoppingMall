<template>
  <div class="container">
    <div class="row">
      <UserGrid></UserGrid>
    </div>
  </div>
</template>

<script>
import { getUserList } from '@/api/User.js';
import UserGrid from '@/util/tui grid/UserGrid.vue';
export default {
  components: {
    UserGrid,
  },
  async mounted() {
    const response = await getUserList();
    console.log(response);
  },
};
</script>

<style scoped></style>
