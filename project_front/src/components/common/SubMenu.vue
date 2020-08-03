<template>
  <ul class="menu-list ">
    <li v-if="$route.query.fcode != undefined">
      <!-- 해당 카테고리 전체 상품 -->
      <router-link
        to=""
        @click.native="replaceUrl($route.query.fcode)"
        :class="{
          active: $route.query.fcode % 100 == 0 && $route.query.scode == '',
        }"
        >전체</router-link
      >
    </li>
    <li v-if="$route.query.fcode == undefined">
      <!-- 전체 상품 -->
      <router-link
        to=""
        @click.native="replaceUrl()"
        :class="{
          active: $route.query.fcode % 100 == 0 && $route.query.scode == '',
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
        to=""
        v-if="$route.query.fcode == item2.CATEGORY_REF"
        @click.native="replaceUrl(item2.CATEGORY_REF, item2.CATEGORY_CODE)"
        >{{ item2.CATEGORY_NAME }}</router-link
      >
    </li>
  </ul>
</template>

<script>
import Validation from '@/util/data/Validation.js';
export default {
  computed: {
    getCategory() {
      let cate = this.$store.state.category.category;
      let fmenu = [];
      let smenu = [];
      let returnValue = {};
      fmenu = cate.filter(x => x.CATEGORY_LEVEL == 1);
      smenu = cate.filter(x => x.CATEGORY_LEVEL == 2);

      // for (let i = 0; i < cate.length; i++) {
      //   if (cate[i].CATEGORY_LEVEL == 1) {
      //     fmenu.push(cate[i]);
      //   } else {
      //     smenu.push(cate[i]);
      //   }
      // }
      returnValue.fmenu = fmenu;
      returnValue.smenu = smenu;

      return returnValue;
    },
  },
  methods: {
    replaceUrl(fcode, scode) {
      this.$router.replace({
        path: '/shop/list/category',
        query: {
          fcode: !Validation.isNull(fcode) ? '' : fcode,
          scode: !Validation.isNull(scode) ? '' : scode,
          page: 1,
          pageStart: 0,
          perPageNum: 9,
          t: new Date().getTime(),
        },
      });
      this.preUrl = this.$route.path;
    },
  },
};
</script>

<style scoped>
.menu-list {
  list-style: none;
  margin-bottom: 4%;
  margin-top: 1%;
  margin-left: 15%;
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
