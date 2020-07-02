<template>
  <div class="featured-items">
    <Banner @changeGoods="changeGoods"></Banner>

    <div class="container">
      <div class="row">
        <GoodsList></GoodsList>
      </div>
    </div>
    <Pagenation @changePage="changePage"></Pagenation>
  </div>
</template>

<script>
import Pagenation from '../common/pagenation.vue';
import Banner from './Banner.vue';
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
  computed: {
    getGoods() {
      return this.$store.state.goods.goods;
    },
  },
  components: {
    Pagenation,
    Banner,
    GoodsList,
  },
  methods: {
    changePage(page) {
      this.$router.replace({
        name: 'shopList',
        query: {
          fcode: this.$route.query.fcode,
          scode: this.$route.query.scode,
          order: this.selectedOrder,
          page: page,
        },
      });
      //this.changeGoods(page);
    },
    changeGoods(selectedOrder) {
      let reqData;
      reqData = {
        CODE: this.$route.query.scode,
        CATEGORY_REF: this.$route.query.fcode,
      };
      reqData.PAGE = this.$route.query.page *= 1;
      reqData.PAGE_START = (reqData.PAGE - 1) * 10; // 보여줄 상품 시작
      reqData.PER_PAGE_NUM = 10; // 보여줄 상품 수
      reqData.ORDER = selectedOrder;
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
.goodsTotal {
  display: flex;
  padding-left: 5%;
  padding-right: 5%;
}
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
