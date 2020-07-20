<template>
  <div class="content">
    <div class="container">
      <div class="row">
        <div
          class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb40 text-center"
        ></div>
      </div>
      <div class="row">
        <div v-if="getGoods.length > 0">
          <div
            class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12"
            v-for="(goods, index) in getGoods"
            :key="index"
          >
            <!-- team-img -->
            <div class="team-block">
              <div class="team-img">
                <router-link :to="`/shop/view/${goods.GDS_NUM}`">
                  <img
                    :src="`${getUrl}${goods.GDS_IMG}`"
                    alt=""
                    class="imgDiv"
                  />
                </router-link>
                <div class="overlay">
                  <div class="text"></div>
                  <a href="javascript:void(0);" @click="addGoodsCart(goods)">
                    <i class="fa fa-shopping-cart fa-2x"></i
                  ></a>
                </div>
              </div>
              <p class="mb30 team-meta">
                <router-link :to="`/shop/view/${goods.GDS_NUM}`">
                  <span class="new-item" v-if="goods.IS_NEW < 3">new!</span>
                  {{ goods.GDS_NAME }}
                </router-link>
              </p>
              <span class="price">{{ goods.GDS_PRICE }} 원</span>
            </div>
          </div>
        </div>
        <div v-else>
          <h1 style="text-align: center;">해당 상품이 없습니다.</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addGoodsCart, getCartList } from '@/api/Cart.js';
export default {
  computed: {
    getGoods() {
      return this.$store.state.goods.goods;
    },
    getUrl() {
      return this.$store.state.url;
    },
  },
  methods: {
    async addGoodsCart(goods) {
      if (this.$store.state.user.USER_ID == '') {
        alert('로그인을 해주세요. ');
        return;
      }
      if (goods.GDS_STOCK < 1) {
        alert('상품의 수량이 없습니다.');
        return;
      }
      try {
        const reqData = {
          USER_ID: this.$store.state.user.USER_ID,
          GDS_NUM: goods.GDS_NUM,
          CART_STOCK: 1,
        };
        await addGoodsCart(reqData);
        alert(`${goods.GDS_NAME} 상품 1개가 담겼습니다.`);
        const response1 = await getCartList(this.$store.state.user.USER_ID);
        this.$store.state.cart.cart = response1.data.results;
      } catch (error) {
        alert(error);
      }
    },
  },
};
</script>

<style scoped>
.imgDiv {
  width: 200px;
  height: 200px;
}
body {
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  font-family: 'Lato', sans-serif;
  letter-spacing: 0px;
  font-size: 16px;
  font-weight: 400;
  line-height: 28px;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 300;
  color: #11181f;
  margin: 0px 0px 15px 0px;
  font-family: 'Lato', sans-serif;
}
h1 {
  font-size: 44px;
}
h2 {
  font-size: 38px;
}
h3 {
  font-size: 24px;
  font-weight: 400;
}
h4 {
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
}
h5 {
  font-size: 16px;
  font-weight: 400;
}
h6 {
  font-size: 12px;
  font-weight: 400;
}
p {
  margin: 0 0 20px;
  line-height: 1.7;
}
p:last-child {
  margin: 0px;
}
a {
  text-decoration: none;
  color: #131212;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
}
a:focus,
a:hover {
  text-decoration: none;
  color: #f67800;
}

.mb40 {
  margin-bottom: 40px;
}
.team-block {
  margin-bottom: 20px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
}
.team-content {
  position: absolute;
  background-color: rgba(17, 24, 31, 0.8);
  bottom: 0px;
  display: inline-block;
  color: #fff;
  padding: 30px;
}
.team-img {
  position: relative;
}
.team-img img {
  width: 200px;
}
.team-title {
}
.team-meta {
  color: #9da4aa;
  font-weight: 400;
  font-size: 16px;
}
.overlay {
  border-radius: 0px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20%;
  opacity: 0;
  transition: 1s ease;
  background-color: #000000;
}
.team-img:hover .overlay {
  opacity: 0.8;
}
.team-img:hover .team-content {
  opacity: 0;
}
.text {
  color: #fff;
  position: absolute;
  top: 30%;
  left: 30%;
  transform: translate(-26%, -26%);
  -ms-transform: translate(-26%, -26%);
  right: 0;
  font-weight: 400;
  font-size: 16px;
  display: -webkit-inline-box;
}
.fa-shopping-cart {
  color: white;
  float: unset;
  padding: 5px;
}
.new-item {
  color: crimson;
}
.price {
  font-weight: bold;
}
</style>
