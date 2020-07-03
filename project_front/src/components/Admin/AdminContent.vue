<template>
  <div id="root">
    <section id="container">
      <div class="container_box">
        <Aside_Admin
          :GoodsRegist="GoodsRegist"
          v-on:changePage="changePage_handler"
        ></Aside_Admin>
        <GoodsRegister v-if="GoodsRegist"></GoodsRegister>
        <GoodsList v-if="GoodsList"></GoodsList>
        <UserList v-if="UserList"></UserList>
      </div>
    </section>
  </div>
</template>

<script>
import Aside_Admin from './Aside.vue';
import GoodsRegister from './GoodsRegister';
import GoodsList from './GoodsList.vue';
import UserList from './UserList.vue';
export default {
  components: {
    Aside_Admin,
    GoodsRegister,
    GoodsList,
    UserList,
  },
  data() {
    return {
      GoodsRegist: false,
      GoodsList: false,
      UserList: false,
    };
  },
  methods: {
    changePage_handler(num) {
      if (num == 1) {
        this.GoodsRegist = true;
        this.GoodsList = false;
        this.UserList = false;
      } else if (num == 2) {
        this.GoodsRegist = false;
        this.GoodsList = true;
        this.UserList = false;
      } else if (num == 3) {
        this.GoodsRegist = false;
        this.GoodsList = false;
        this.UserList = true;
      }
    },
  },
};
</script>

<style>
ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

div#root {
  width: 90%;
  margin: 0 auto;
}

nav#nav ul li {
  display: inline-block;
  margin-left: 10px;
}

section#container {
  padding: 20px 0;
  border-top: 2px solid #eee;
  border-bottom: 2px solid #eee;
}
section#container::after {
  content: '';
  display: block;
  clear: both;
}
aside {
  float: left;
  width: 200px;
}
div#container_box {
  float: right;
  width: calc(100% - 200px - 20px);
}

aside ul li {
  text-align: center;
  margin-bottom: 10px;
}
</style>
