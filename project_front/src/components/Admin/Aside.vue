<template>
  <ul>
    <li>
      <router-link to="/admin/registGoods">상품등록</router-link>
    </li>
    <li>
      <router-link
        to="/admin/goodsList?fcode=&scode=&page=1&pageStart=0&perPageNum=10&gdsName="
        >상품목록</router-link
      >
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
ul {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 1%;
}
ul li {
  padding: 1%;
  font-size: 3rem;
}
ul:hover {
  background-color: whitesmoke;
}
ul li a {
  color: black;
}
ul li a:hover {
  color: black;
}
</style>
