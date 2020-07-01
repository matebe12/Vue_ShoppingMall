<template>
  <ul class="menu-list ">
    <li>
      <router-link
        :to="`/shop/list/category?fcode=${$route.query.fcode}&page=1`"
        :class="{
          active: $route.query.fcode % 100 == 0 && $route.query.scode == null,
        }"
        >전체</router-link
      >
    </li>
    <li
      v-for="(item2, index) in getCategory.smenu"
      :key="index"
      :class="{ active: $route.query.scode == item2.CATEGORY_CODE }"
    >
      <router-link
        :to="
          `/shop/list/category?fcode=${item2.CATEGORY_REF}&scode=${item2.CATEGORY_CODE}&page=1`
        "
        v-if="$route.query.fcode == item2.CATEGORY_REF"
        >{{ item2.CATEGORY_NAME }}</router-link
      >
    </li>
  </ul>
</template>

<script>
export default {
  computed: {
    getCategory() {
      let cate = this.$store.state.category.category;
      let fmenu = [];
      let smenu = [];
      let returnValue = {};
      for (let i = 0; i < cate.length; i++) {
        if (cate[i].CATEGORY_LEVEL == 1) {
          fmenu.push(cate[i]);
        } else {
          smenu.push(cate[i]);
        }
      }
      returnValue.fmenu = fmenu;
      returnValue.smenu = smenu;

      return returnValue;
    },
  },
};
</script>

<style scoped>
.menu-list {
  list-style: none;
  margin-bottom: 10%;
  margin-top: 1%;
}
.menu-list li {
  float: left;

  font: 12px; /* 폰트 설정 - 12px의 돋움체 굵은 글씨로 표시 */
  padding: 0 20px; /* 각 메뉴 간격 */
}
.submenu {
  border-left: 1px solid #999;
}
.active {
  font-weight: bold;
}
a {
  text-decoration: none;
  color: #000000;
  font-size: 20px;
}
a:hover {
  color: #5fb8db;
}
</style>
