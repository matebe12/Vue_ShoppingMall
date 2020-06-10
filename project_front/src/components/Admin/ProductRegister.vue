<template>
  <div>
    <h1>상품등록</h1>
    <form
      role="form"
      method="post"
      autocomplete="off"
      @submit.prevent="submitEvent"
    >
      <label>1차 분류</label>
      <select class="category1">
        <option value="">전체</option>
        <option
          :value="category.CATEGORY_CODE"
          v-for="(category, index) in firstCategory"
          :key="index"
          >{{ category.CATEGORY_NAME }}</option
        >
      </select>

      <label>2차 분류</label>
      <select class="category2">
        <option value="">전체</option>
      </select>
    </form>
  </div>
</template>

<script>
//import { getCategory } from '@/api/Goods.js';

export default {
  mounted() {},
  data() {
    return {
      firstCategory: this.$store.state.Goods_Category.first_Cate[0],
    };
  },
};
</script>

<style></style>
