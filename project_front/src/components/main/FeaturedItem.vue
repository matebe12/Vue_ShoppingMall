<template>
  <div class="featured-items">
    <div class="container">
      <div class="row">
        <ul class="nav nav-tabs nav-product-tabs">
          <li
            class="active"
            v-for="(item, index) in this.$store.state.category.category"
            :key="index"
          >
            <router-link
              :to="getUrl(item.CATEGORY_CODE)"
              data-toggle="tab"
              @click="changeGoods(item.CATEGORY_CODE)"
              v-if="parentCode == item.CATEGORY_REF && $route.path != '/'"
              >{{ item.CATEGORY_NAME }}</router-link
            >
          </li>

          <li class="pull-right collection-url">
            <a href="javascript:void(0);" @click="changeGoods(null)"
              >View All <i class="fa fa-long-arrow-right"></i
            ></a>
          </li>
        </ul>

        <div class="tab-content">
          <div class="tab-pane active" id="trending">
            <div id="#container">
              <table>
                <thead>
                  <tr></tr>
                </thead>
                <tbody>
                  <tr v-for="(goods, index) in getGoods" :key="index">
                    <td>
                      <img
                        :src="getImgSrc(goods.GDS_IMG).GDS_IMG"
                        class="goodsImg"
                      />
                    </td>
                    <td>
                      <router-link :to="`/shop/view/${goods.GDS_NUM}`">{{
                        goods.GDS_NAME
                      }}</router-link>
                    </td>
                    <td>{{ goods.GDS_CATEGORY_NAME }}</td>
                    <td>{{ goods.GDS_PRICE }} 원</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal v-if="showModal" @closeModal="closeModal" :item="item"> </Modal>
    <Pagenation></Pagenation>
  </div>
</template>

<script>
import Modal from '../common/GoodsViewModal.vue';
import Pagenation from '../common/pagenation.vue';
export default {
  data() {
    return {
      showModal: false,
      item: {},
      showImg: false,
      parentCode: '',
    };
  },
  created() {
    this.parentCode = this.$route.query.code;
    this.changeGoods(null);
  },
  props: ['parentCategoryCode'],
  mounted() {
    this.showImg = true;
    this.parentCode = this.$route.query.code;
  },
  computed: {
    getGoods() {
      return this.$store.state.goods.goods;
    },
  },
  components: {
    Modal,
    Pagenation,
  },
  methods: {
    changeGoods(code) {
      let reqData;
      if (code != null) {
        reqData = {
          CODE: this.$route.query.scode,
          CATEGORY_REF: this.$route.query.code,
        };
      } else {
        reqData = {
          CATEGORY_REF: this.$route.query.code,
          CODE: this.$route.query.scode,
        };
        reqData.PAGE = this.$route.query.page *= 1;
        reqData.PAGE_START = (reqData.PAGE - 1) * 2; // 보여줄 상품 시작
        reqData.PER_PAGE_NUM = 2; // 보여줄 상품 수
        this.$store.dispatch('getGoodListCount', reqData);
      }

      this.$store.dispatch('getGoodList', reqData);
    },
    getUrl(scode) {
      let _page = 1;
      let url = '/shop/list/category?code=' + this.$route.query.code;
      url += '&scode=' + scode;
      url += '&page=' + _page;
      return url;
    },
    closeModal() {
      this.showModal = !this.showModal;
    },
    showGoods(goods) {
      this.showModal = true;
      this.item = goods;
    },
    getrefCode(CATEGORY_REF) {
      return CATEGORY_REF == this.$route.query.code ? true : false;
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
</style>
