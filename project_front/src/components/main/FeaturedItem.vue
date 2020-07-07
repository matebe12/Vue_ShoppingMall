<template>
  <div class="featured-items">
    <Banner @changeOrder="changeOrder"></Banner>

    <div class="container">
      <div class="row">
        <GoodsList></GoodsList>
      </div>
    </div>
    <div id="pagination" class="tui-pagination"></div>
  </div>
</template>

<script>
import { createPageNation } from '@/util/tui grid/tuiPagenation';
import Banner from './Banner.vue';
import GoodsList from '../common/GoodsList.vue';
import Validation from '@/util/data/Validation.js';
var pagination;
export default {
  data() {
    return {
      item: {},
      selectedOrder: '',
    };
  },
  created() {
    this.changeGoods(null);
  },
  mounted() {
    pagination = createPageNation('#pagination', 10);

    pagination.on('beforeMove', async function(event) {
      changeGoods(event);
    });
    const changeGoods = event => {
      this.changeGoods(event);
    };
  },
  computed: {
    getGoods() {
      return this.$store.state.goods.goods;
    },
  },
  components: {
    Banner,
    GoodsList,
  },
  methods: {
    changeOrder(selectedOrder) {
      this.selectedOrder = selectedOrder;
    },
    async changeGoods(event) {
      let reqData;
      reqData = {
        CODE: this.$route.query.scode,
        CATEGORY_REF: this.$route.query.fcode,
      };
      reqData.PAGE = Validation.isNull(event) ? (event.page *= 1) : 1;
      reqData.PAGE_START = (reqData.PAGE - 1) * 10; // 보여줄 상품 시작
      reqData.PER_PAGE_NUM = 10; // 보여줄 상품 수
      reqData.ORDER = this.selectedOrder;
      await this.$store.dispatch('getGoodListCount', reqData);
      await this.$store.dispatch('getGoodList', reqData);
      pagination.setTotalItems(this.$store.state.goods.total);
      pagination._paginate(reqData.PAGE);
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
