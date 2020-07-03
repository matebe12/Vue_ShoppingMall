<template>
  <aside>
    <ul>
      <li><a href="javascript:void(0);" @click="changePage(1)">상품등록</a></li>
      <li><a href="javascript:void(0);" @click="changePage(2)">상품목록</a></li>
      <li><a href="javascript:void(0);">상품소감</a></li>
      <li><a href="javascript:void(0);">주문목록</a></li>
      <li><a href="javascript:void(0);" @click="changePage(3)">유저목록</a></li>
    </ul>
  </aside>
</template>

<script>
export default {
  methods: {
    changePage(num) {
      this.$emit('changePage', num);
    },
  },
};
</script>

<style scoped>
aside ul li a {
  display: block;
  width: 100%;
  padding: 10px 0;
}
aside ul li a:hover {
  background: #eee;
}
</style>
