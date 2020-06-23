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
            <a
              href="javascript:void(0);"
              data-toggle="tab"
              @click="changeGoods(item.CATEGORY_CODE)"
              v-if="parentCode == item.CATEGORY_REF"
              >{{ item.CATEGORY_NAME }}</a
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
            <div
              class="col-md-3 col-sm-4"
              v-for="(goods, index) in getGoods"
              :key="index"
            >
              <div class="single-product">
                <div class="product-block">
                  <img
                    v-if="showImg"
                    :src="require(`@/assets/upload/${goods.GDS_IMG}`)"
                    alt=""
                    @click="showGoods(goods)"
                    class="thumbnail"
                  />

                  <div class="product-description text-center">
                    <p class="title">{{ goods.GDS_NAME }}</p>

                    <p class="price">{{ goods.GDS_PRICE }} 원</p>
                  </div>

                  <div class="product-hover">
                    <ul>
                      <li>
                        <a href=""><i class="fa fa-cart-arrow-down"></i></a>
                      </li>

                      <li>
                        <router-link :to="`/shop/view/${goods.GDS_NUM}`"
                          ><i class="fas fa-arrows-alt-h"></i
                        ></router-link>
                      </li>

                      <li>
                        <a href=""><i class="far fa-heart"></i></a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal v-if="showModal" @closeModal="closeModal" :item="item"> </Modal>
  </div>
</template>

<script>
import Modal from '../common/GoodsViewModal.vue';
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
    console.log(this.$route.query.code);

    this.parentCode = this.$route.query.code;
  },
  computed: {
    getGoods() {
      return this.$store.state.goods.goods;
    },
  },
  components: {
    Modal,
  },
  methods: {
    changeGoods(code) {
      let reqData;
      if (code != null) {
        reqData = {
          code: code,
        };
      } else {
        reqData = {
          CATEGORY_REF: this.$route.query.code,
        };
      }

      this.$store.dispatch('getGoodList', reqData);
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
  },
};
</script>

<style></style>
