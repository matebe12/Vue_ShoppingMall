<template>
  <div class="orderInfo">
    <input
      type="checkbox"
      v-model="checkAddress"
      value="Check"
      @change="getUserInfo"
    />
    <span>내 주소</span>
    <form
      role="form"
      method="post"
      autocomplete="off"
      @submit.prevent="orderGoods()"
    >
      <div class="inputArea">
        <label for="">수령인</label>
        <input
          type="text"
          name="ORDER_RECIEVE"
          id="ORDER_RECIEVE"
          v-model="ORDER_RECIEVE"
          required="required"
        />
      </div>

      <div class="inputArea">
        <label for="ORDER_PHONE">수령인 연락처</label>
        <input
          type="text"
          name="ORDER_PHONE"
          id="ORDER_PHONE"
          v-model="ORDER_PHONE"
          required="required"
        />
      </div>

      <div class="inputArea">
        <label for="USER_ADDR1">우편번호</label>
        <input
          type="text"
          name="USER_ADDR1"
          id="USER_ADDR1"
          v-model="USER_ADDR1"
          required="required"
        />
        <button type="button" class="findBtn" @click="isAddressMethod()">
          주소찾기
        </button>
        <post
          v-if="isAddress"
          @close="isAddressMethod()"
          @setAddress="setAddress"
        ></post>
      </div>

      <div class="inputArea">
        <label for="USER_ADDR2">나머지 주소</label>
        <input
          type="text"
          name="USER_ADDR2"
          v-model="USER_ADDR2"
          id="USER_ADDR2"
          required="required"
        />
      </div>
      <div class="inputArea">
        <button type="submit" class="order_btn">주문</button>
        <button type="button" class="cancel_btn">취소</button>
      </div>
    </form>
  </div>
</template>

<script>
import { insertOrder } from '@/api/Cart.js';
import post from '@/util/daum/post.vue';
import Validation from '@/util/data/Validation.js';
export default {
  props: ['checkedItem', 'totalPrice'],
  methods: {
    async orderGoods() {
      const check = this.checkedItem.length;
      for (let i = 0; i < check; i++) {
        this.checkedItem[i].CART_STOCK *= 1;
        this.checkedItem[i].GDS_STOCK *= 1;
        this.checkedItem[i].ORDER_ID = this.getOrderId();
      }

      const reqData = {
        USER_ID: this.$store.state.user.USER_ID,
        ORDER_RECIEVE: this.ORDER_RECIEVE,
        USER_ADDR1: this.USER_ADDR1,
        USER_ADDR2: this.USER_ADDR2,
        ORDER_PHONE: this.ORDER_PHONE,
        TOTAL_PRICE: this.totalPrice,
        ITEM: this.checkedItem,
      };
      let checkITEM = Validation.isNull(this.checkedItem);
      if (!checkITEM || Validation.isLength(this.checkedItem, 0)) {
        alert('주문할 상품을 선택해주세요.');
        return;
      }
      try {
        await insertOrder(reqData);
        this.$emit('refreshCart');
      } catch (error) {
        alert(error);
      }
    },
    setAddress(data) {
      this.USER_ADDR1 = data;
      this.isAddressMethod();
    },
    isAddressMethod() {
      this.isAddress = !this.isAddress;
    },
    getUserInfo() {
      if (this.checkAddress.length > 0) {
        this.USER_ADDR1 = this.$store.state.user.USER_ADDR1;
        this.USER_ADDR2 = this.$store.state.user.USER_ADDR2;
        this.ORDER_PHONE = this.$store.state.user.USER_PHONE;
        this.ORDER_RECIEVE = this.$store.state.user.USER_NAME;
      }
    },
    getOrderId() {
      // UUID v4 generator in JavaScript (RFC4122 compliant)
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(
        c,
      ) {
        var r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 3) | 8;
        return v.toString(16);
      });
    },
  },
  data() {
    return {
      ORDER_RECIEVE: '',
      ORDER_PHONE: '',
      USER_ADDR1: '',
      USER_ADDR2: '',
      ORDER_ID: '',
      checkAddress: [],
      isAddress: false,
    };
  },
  mounted() {
    const ORDER_RECIEVE = document.querySelector('#ORDER_RECIEVE');
    ORDER_RECIEVE.scrollIntoView();
  },
  components: {
    post,
  },
};
</script>

<style scoped>
.orderInfo {
  border: 5px solid #eee;
  padding: 20px;
}
.orderInfo .inputArea {
  margin: 10px 0;
}
.orderInfo .inputArea label {
  display: inline-block;
  width: 120px;
  margin-right: 10px;
}
.orderInfo .inputArea input {
  font-size: 14px;
  padding: 5px;
}
#userAddr2,
#userAddr3 {
  width: 250px;
}

.orderInfo .inputArea:last-child {
  margin-top: 30px;
}
.orderInfo .inputArea button {
  font-size: 20px;
  border: 2px solid #ccc;
  padding: 5px 10px;
  background: #fff;
  margin-right: 20px;
}
</style>
