<template>
  <ul>
    <li>
      <router-link to="/admin/registGoods">상품등록</router-link>
    </li>
    <li>
      <router-link to="/admin/goodsList">상품목록</router-link>
    </li>
    <li><router-link to="/admin/orderList">주문목록</router-link></li>
    <li>
      <router-link to="/admin/userList">유저목록</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  methods: {},
};
</script>

<style scoped>
ul:hover {
  background-color: whitesmoke;
}
ul li {
  position: relative;
  float: left;
  padding: 1%;
  text-align: center;
  left: 35%;
}
ul li a {
  color: black;
}
ul li a:hover {
  color: black;
}
</style>
