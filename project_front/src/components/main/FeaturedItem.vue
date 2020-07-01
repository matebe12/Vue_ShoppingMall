<template>
  <div class="featured-items">
    <Banner></Banner>
    <div class="container">
      <div class="row">
        <SubMenu></SubMenu>
        <div style="display:flex">
          <p style="white-space: nowrap;">
            총 <span style="font-weight:bold;">{{ getGoodsTotal }} </span> 개의
            상품이 있습니다.
          </p>
          <div class="col-sm-4 nav-container" style="margin-left: 50%;">
            <div class="form-group">
              <select class="form-control nav">
                <option value="" selected disabled>신상품순</option>
                <option value="serie-0">낮은가격순</option>
                <option value="serie-1">높은가격순</option>
              </select>
            </div>
          </div>
        </div>

        <GoodsList></GoodsList>
      </div>
    </div>
    <Pagenation @changePage="changePage"></Pagenation>
  </div>
</template>

<script>
import Pagenation from '../common/pagenation.vue';
import Banner from './Banner.vue';
import SubMenu from '../common/SubMenu.vue';
import GoodsList from '../common/GoodsList.vue';
export default {
  data() {
    return {
      item: {},
    };
  },
  created() {
    this.changeGoods(null);
  },
  props: ['parentCategoryCode'],
  computed: {
    getGoods() {
      return this.$store.state.goods.goods;
    },
    getGoodsTotal() {
      return this.$store.state.goods.total;
    },
  },
  components: {
    Pagenation,
    Banner,
    SubMenu,
    GoodsList,
  },
  methods: {
    changePage(page) {
      this.$router.replace({
        name: 'shopList',
        query: {
          fcode: this.$route.query.fcode,
          scode: this.$route.query.scode,
          page: page,
        },
      });
      //this.changeGoods(page);
    },
    changeGoods() {
      let reqData;
      reqData = {
        CODE: this.$route.query.scode,
        CATEGORY_REF: this.$route.query.fcode,
      };
      reqData.PAGE = this.$route.query.page *= 1;
      reqData.PAGE_START = (reqData.PAGE - 1) * 10; // 보여줄 상품 시작
      reqData.PER_PAGE_NUM = 10; // 보여줄 상품 수

      this.$store.dispatch('getGoodListCount', reqData);
      this.$store.dispatch('getGoodList', reqData);
    },
    showGoods(goods) {
      this.showModal = true;
      this.item = goods;
    },
    getImgSrc(GDS_IMG) {
      return {
        GDS_IMG: GDS_IMG && require('@/assets/upload/' + GDS_IMG),
      };
    },
  },
};
</script>
<style scoped src="@/assets/css/shopList.css"></style>
<style scoped>
.spinner {
  display: block;
  position: fixed;
  z-index: 1031;
  top: calc(50% - (...px / 2)); /* where ... is the element's height */
  right: calc(50% - (...px / 2)); /* where ... is the element's width */
}
a {
  text-decoration: none;
  color: #000000;
  font-size: 15px;
}
a:hover {
  color: #5fb8db;
}
.goodsDiv {
  margin-left: 30px;
}
.card-block {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.card-img-top {
  width: 200px;
  height: 200px;
}
</style>
