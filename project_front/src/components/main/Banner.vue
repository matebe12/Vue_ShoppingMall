<template>
  <div class="banner">
    <div class="container">
      <div class="row">
        <div class="single-banner">
          <div class="banner-caption">
            <img :src="getImgUrl().MENU_IMG" alt="" class="BannerImg" />

            <SubMenu></SubMenu>
            <div class="subTotal">
              <span style="white-space: nowrap;">
                총
                <span style="font-weight:bold;">{{ getGoodsTotal }} </span>
                개의 상품이 있습니다.
              </span>
              <select
                class="form-control x-6"
                @change="changeOrder()"
                id="selectedItem"
              >
                <option
                  value="newItem"
                  :selected="$route.query.order == 'newItem'"
                  >신상품순</option
                >
                <option
                  value="rowPrice"
                  :selected="$route.query.order == 'rowPrice'"
                  >낮은가격순</option
                >
                <option
                  value="highPrice"
                  :selected="$route.query.order == 'highPrice'"
                  >높은가격순</option
                >
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <SearchForm @searchGoods="searchGoods"></SearchForm>
  </div>
</template>

<script>
import SearchForm from '../common/searchForm';
import SubMenu from '../common/SubMenu.vue';
export default {
  data() {
    return {
      selectedOrder: 'newItem',
    };
  },
  components: {
    SubMenu,
    SearchForm,
  },
  methods: {
    changeOrder() {
      this.$emit('changeOrder', document.querySelector('#selectedItem').value);
    },
    searchGoods(data) {
      this.$emit('searchGoods', data);
    },
    getImgUrl() {
      const banner = this.$route.query.fcode;
      let src = '';
      switch (banner * 1) {
        case 100 || '100':
          src = 'doll.jpg';
          break;
        case 200 || '200':
          src = 'moongu.jpg';
          break;
        case 300 || '300':
          src = 'com.jpeg';
          break;
        case 400 || '400':
          src = 'jubang.jpg';
          break;
        default:
          src = 'all.png';
      }
      return { MENU_IMG: src && require('@/assets/images/' + src) };
    },
  },
  computed: {
    getGoodsTotal() {
      return this.$store.state.goods.total;
    },
  },
};
</script>

<style>
.form-inline {
  display: inline-flex;
}
.subTotal {
  display: inline-block;
  padding-left: 3.5%;
}
@media (min-width: 950px) {
  .container {
    width: 100%;
  }
  .BannerImg {
    height: 400px;
    width: 100%;
  }
}
@media (max-width: 949px) {
  .container {
    width: 100%;
  }
  .BannerImg {
    height: 50%;
    width: 100%;
  }
}

@media (min-width: 768px) {
  .col-sm-12 {
    width: 30%;
  }
}

@media (min-width: 1200px) {
  .col-sm-12 {
    width: 20%;
  }
}
@media (max-width: 100px) {
  .col-sm-12 {
    width: 100%;
  }
}
</style>
