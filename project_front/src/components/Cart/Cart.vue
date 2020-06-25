<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12 col-md-10 col-md-offset-1">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>상품</th>
              <th>수량</th>
              <th class="text-center">가격</th>
              <th class="text-center">총 금액</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in CartItem" :key="index">
              <td class="col-sm-8 col-md-6">
                <div class="media">
                  <a class="pull-left" href="#">
                    <img
                      v-if="showImg"
                      class="media-object"
                      :src="getImgSrc(item.GDS_IMG).GDS_IMG"
                      style="width: 72px; height: 72px;"
                    />
                  </a>
                  <div class="media-body">
                    <h4 class="media-heading">
                      <router-link to="#"></router-link>
                    </h4>
                    <span>Status: </span
                    ><span class="text-success"
                      ><strong>{{ item.GDS_STOCK }}</strong></span
                    >
                  </div>
                </div>
              </td>
              <td class="col-sm-1 col-md-1" style="text-align: center">
                <input
                  type="texxt"
                  class="form-control"
                  id="exampleInputEmail1"
                  v-model="item.CART_STOCK"
                  @keyup="
                    getSubTotalPrice();
                    getTotalPrice();
                  "
                />
              </td>
              <td class="col-sm-1 col-md-1 text-center">
                <strong>{{ addNumComma(item.GDS_PRICE) }}</strong>
              </td>
              <td class="col-sm-1 col-md-1 text-center">
                <strong>{{
                  getOneItemTotal(item.CART_STOCK, item.GDS_PRICE, index)
                }}</strong>
              </td>
              <td class="col-sm-1 col-md-1">
                <span class="glyphicon glyphicon-remove">
                  <a
                    href="javascript:void(0);"
                    @click="deleteGoods(item.CART_NUM, item.USER_ID)"
                    >삭제</a
                  >
                </span>
              </td>
            </tr>
            <tr v-show="CartItem.length > 0">
              <td></td>
              <td></td>
              <td></td>
              <td><h5>금액</h5></td>
              <td class="text-right">
                <h5>
                  <strong>{{ subPrice }}</strong>
                </h5>
              </td>
            </tr>
            <tr v-show="CartItem.length > 0">
              <td></td>
              <td></td>
              <td></td>
              <td><h5>쿠폰 적용</h5></td>
              <td class="text-right">
                <h5>
                  <strong>{{ coupon }}</strong>
                </h5>
              </td>
            </tr>
            <tr v-show="CartItem.length > 0">
              <td></td>
              <td></td>
              <td></td>
              <td><h4>총 금액</h4></td>
              <td class="text-right">
                <h5>
                  <strong>{{ totalPrice }}</strong>
                </h5>
              </td>
            </tr>
            <tr v-show="CartItem.length > 0">
              <td></td>
              <td></td>
              <td></td>
              <td>
                <button type="button" class="btn btn-default">
                  <span class="glyphicon glyphicon-shopping-cart"></span>
                  쇼핑 계속하기
                </button>
              </td>
              <td>
                <button type="button" class="btn btn-success">
                  Checkout <span class="glyphicon glyphicon-play"></span>
                </button>
              </td>
            </tr>
            <tr v-show="CartItem.length < 1">
              <td></td>
              <td></td>
              <td></td>
              <h1>상품이 없습니다.</h1>
              <td>
                <button
                  type="button"
                  class="btn btn-default"
                  @click="continueShop()"
                >
                  <span class="glyphicon glyphicon-shopping-cart"></span>
                  쇼핑 계속하기
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      CartItem: this.$store.state.cart.cart,
      totalPrice: 0,
      coupon: 1000,
      subPrice: 0,
      showImg: false,
    };
  },
  mounted() {
    this.getSubTotalPrice();
    this.getTotalPrice();
    this.showImg = true;
  },
  methods: {
    getOneItemTotal(CART_STOCK, GDS_PRICE, index) {
      const result = CART_STOCK * GDS_PRICE;
      this.CartItem[index].TOTAL_PRICE = result;
      return this.addNumComma(result);
    },
    getImgSrc(GDS_IMG) {
      return {
        GDS_IMG: this.CartItem && require('@/assets/upload/' + GDS_IMG),
      };
    },
    getSubTotalPrice() {
      let sum = 0;
      for (let i = 0; i < this.CartItem.length; i++) {
        sum += this.CartItem[i].TOTAL_PRICE;
      }
      this.subPrice = this.addNumComma(sum);
    },
    getTotalPrice() {
      let sum = 0;
      for (let i = 0; i < this.CartItem.length; i++) {
        sum += this.CartItem[i].TOTAL_PRICE;
      }
      sum -= this.coupon;
      console.log(sum);

      this.totalPrice = this.addNumComma(sum);
    },
    addNumComma(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' 원';
    },
    continueShop() {
      this.$router.go(-1);
    },
    async deleteGoods(ITEM_NUM, USER_ID) {
      const confirm1 = confirm('상품을 카트에서 삭제 하시겠습니까?');
      if (confirm1) {
        const reqData = {
          CART_NUM: ITEM_NUM,
          USER_ID,
        };
        try {
          const response = await this.$store.dispatch('deleteCart', reqData);
          console.log(response);
          await this.$store.dispatch('getCartList', USER_ID);
          this.CartItem = this.$store.state.cart.cart;
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
</script>

<style></style>
