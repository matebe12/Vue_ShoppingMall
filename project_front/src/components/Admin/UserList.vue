<template>
  <div class="container">
    <div class="row">
      <h1>유저리스트</h1>
      <div id="userGrid"></div>
    </div>
  </div>
</template>

<script>
import { createGrid } from '@/util/tui grid/UserGrid';
import { getUserList } from '@/api/User.js';
export default {
  async mounted() {
    const response = await getUserList();
    console.log(response, createGrid);
    const userGrid = createGrid('#userGrid');
    console.log(userGrid);

    //userGrid.resetData(response.data.results);
  },
};
</script>

<style></style>
