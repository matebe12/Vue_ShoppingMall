<template>
  <div class="container">
    <div class="card">
      <i
        class="fas fa-times closeModalBtn"
        @click="closeModal"
        style="float:right"
      ></i>
      <div class="container-fliud">
        <div class="wrapper row">
          <div class="preview col-md-6">
            <div class="preview-pic tab-content">
              <div class="tab-pane active" id="pic-1">
                <img :src="getImgSrc(item.GDS_IMG)" />
              </div>
              <div class="tab-pane" id="pic-2">
                <img :src="getImgSrc(item.GDS_IMG)" />
              </div>
              <div class="tab-pane" id="pic-3">
                <img :src="getImgSrc(item.GDS_IMG)" />
              </div>
              <div class="tab-pane" id="pic-4">
                <img :src="getImgSrc(item.GDS_IMG)" />
              </div>
              <div class="tab-pane" id="pic-5">
                <img :src="getImgSrc(item.GDS_IMG)" />
              </div>
            </div>
            <ul class="preview-thumbnail nav nav-tabs">
              <li class="active">
                <a data-target="#pic-1" data-toggle="tab"
                  ><img :src="getImgSrc(item.GDS_IMG)"
                /></a>
              </li>
              <li>
                <a data-target="#pic-2" data-toggle="tab"
                  ><img :src="getImgSrc(item.GDS_IMG)"
                /></a>
              </li>
              <li>
                <a data-target="#pic-3" data-toggle="tab"
                  ><img :src="getImgSrc(item.GDS_IMG)"
                /></a>
              </li>
              <li>
                <a data-target="#pic-4" data-toggle="tab"
                  ><img :src="getImgSrc(item.GDS_IMG)"
                /></a>
              </li>
              <li>
                <a data-target="#pic-5" data-toggle="tab"
                  ><img :src="getImgSrc(item.GDS_IMG)"
                /></a>
              </li>
            </ul>
          </div>
          <div class="details col-md-6">
            <h3 class="product-title">{{ item.GDS_NAME }}</h3>
            <div class="rating">
              <span class="review-no"
                >{{ this.replyCount }}개의 댓글이 있습니다.</span
              >
            </div>
            <p class="product-description">
              {{ item.GDS_DESC }}
            </p>
            <h4 class="price">
              가격: <span>{{ item.GDS_PRICE }}원</span>
            </h4>
            <h4 class="stock">
              재고: <span>{{ item.GDS_STOCK }}개</span>
            </h4>

            <div class="col-xs-4 buy_stock_scope">
              <i class="fas fa-minus fa-2x" @click="minusStock"></i>
              <input
                type="text"
                name="GDS_STOCK_BUY"
                id="GDS_STOCK_BUY"
                class="form-control buy_stock"
                placeholder="구입 수량"
                value="0"
                @keyup="validation()"
                v-model="buy_stock"
              />

              <i class="fas fa-plus fa-2x" @click="plusStock"></i>
            </div>

            <div class="action">
              <button
                class="add-to-cart btn btn-default"
                type="button"
                @click="addGoodsCart()"
              >
                장바구니에 담기
              </button>
              <button
                class="add-to-cart btn btn-default"
                type="button"
                style="margin-left:10px;"
              >
                구매하기
              </button>
              <button
                class="like btn btn-default"
                type="button"
                style="margin-left: 10px;"
              >
                <span class="fa fa-heart"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Reply :item="item" @replyCount="setReplyCount"></Reply>
  </div>
</template>

<script>
import Reply from '@/components/Goods/reply';
import { addGoodsCart } from '@/api/Cart.js';
export default {
  data() {
    return {
      item: this.$store.state.goods.goods[0],
      buy_stock: 0,
      replyCount: 0,
    };
  },
  components: {
    Reply,
  },
  methods: {
    async addGoodsCart() {
      if (this.$store.state.user.USER_ID == '') {
        alert('로그인을 해주세요. ');
        return;
      }
      if (this.buy_stock < 1) {
        alert('수량을 확인해주세요.');
        return;
      }
      try {
        const reqData = {
          USER_ID: this.$store.state.user.USER_ID,
          GDS_NUM: this.item.GDS_NUM,
          CART_STOCK: this.buy_stock,
        };
        const response = await addGoodsCart(reqData);
        console.log(response);
        alert(`${this.item.GDS_NAME} 상품 ${this.buy_stock}개가 담겼습니다.`);
      } catch (error) {
        console.log(error);
      }
    },
    setReplyCount(replyCount) {
      this.replyCount = replyCount;
    },
    closeModal() {
      this.$emit('closeModal');
    },
    getImgSrc(GDS_IMG) {
      return require('@/assets/upload/' + GDS_IMG);
    },
    validation() {
      this.buy_stock = this.buy_stock.replace(/[^0-9]/g, '');
    },
    plusStock() {
      if (this.item.GDS_STOCK > this.buy_stock) {
        ++this.buy_stock;
      } else {
        alert('남은 재고가 없습니다. 관리자에게 문의해주세요.');
        return;
      }
    },
    minusStock() {
      if (this.buy_stock > 0) {
        --this.buy_stock;
      }
    },
  },
};
</script>

<style scoped src="@/assets/css/ModalCss.css"></style>
