<template>
  <div class="featured-items">
    <Banner @changeOrder="changeOrder" @searchGoods="searchGoods"></Banner>

    <div class="container">
      <div class="row">
        <GoodsList></GoodsList>
      </div>
    </div>
    <div id="pagination" class="tui-pagination"></div>
  </div>
</template>

<script>
import { getGoodsList } from '@/api/Goods.js';
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
      searchData: '',
      isSearch: 0,
    };
  },
  async created() {
    console.log('page :: ' + this.$route.query.page);
    let query = this.$route.query;
    if (query.page == undefined) {
      query.page = 1;
    }
    if (query.pageStart == undefined) {
      query.pageStart = (query.page - 1) * 10;
    }
    if (query.perPageNum == undefined) {
      query.perPageNum = 10;
    }

    const response = await getGoodsList(query);
    console.log(response);
    this.$store.state.goods.goods = response.data.results;
    this.$store.state.goods.total = response.data.results2[0].TOTAL_COUNT;
    pagination.setTotalItems(this.$store.state.goods.total);
    pagination._paginate(query.page * 1);
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
    searchGoods(data) {
      this.searchData = data;
      this.isSearch = 1;
      this.changeGoods();
    },
    changeOrder(selectedOrder) {
      this.selectedOrder = selectedOrder;
      this.changeGoods();
    },
    async changeGoods(event) {
      let page = Validation.isNull(event) ? (event.page *= 1) : 1;

      this.$router.replace({
        query: {
          fcode: this.$route.query.fcode,
          scode:
            this.searchData.selectCategory != '' &&
            this.searchData.selectCategory != undefined
              ? this.searchData.selectCategory
              : '',
          page: page,
          pageStart: (page - 1) * 10,
          perPageNum: 10,
          gdsName: this.searchData.goodsName,
          order: this.selectedOrder,
        },
      });
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
