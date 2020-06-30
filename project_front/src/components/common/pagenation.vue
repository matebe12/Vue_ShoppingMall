<template>
  <ul class="pagination" style="margin-left:40%">
    <!-- li태그의 클래스에 disabled를 넣으면 마우스를 위에 올렸을 때 클릭 금지 마크가 나오고 클릭도 되지 않는다.-->
    <!-- disabled의 의미는 앞의 페이지가 존재하지 않다는 뜻이다. -->
    <li class="disabled">
      <a href="#">
        <span>«</span>
      </a>
    </li>
    <!-- li태그의 클래스에 active를 넣으면 색이 반전되고 클릭도 되지 않는다. -->
    <!-- active의 의미는 현재 페이지의 의미이다. -->
    <li
      v-for="(item, index) in getGoods"
      :class="{ active: index + 1 == $route.query.page }"
      :key="index"
    >
      <router-link :to="getUrl(index + 1)">{{ index + 1 }}</router-link>
    </li>
    <li>
      <router-link to="">
        <span>»</span>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  computed: {
    getGoods() {
      let pageData = Math.ceil(this.$store.state.goods.total / 2);
      return pageData;
    },
  },
  methods: {
    getUrl(index) {
      let currentPath =
        this.$route.path +
        '?code=' +
        this.$route.query.code +
        '&scode=' +
        this.$route.query.scode +
        '&page=' +
        index;
      return currentPath;
    },
  },
};
</script>

<style></style>
