<template>
  <div class="p-4">
    <h3>주문 현황</h3>
    <h3>total {{ totalOrder }}</h3>
    <select class="selectOption" v-model="firstOption">
      <option value="">
        전체
      </option>
      <option value="0">신규주문</option>
      <option value="1">발송대기</option>
      <option value="2">배송중</option>
      <option value="3">배송완료</option>
      <option value="4">구매확정</option>
      <option value="5">취소요청</option>
    </select>
    <input type="text" placeholder="상품이름" id="" v-model="goodsName" />
    <button @click="searchOrder()">검색</button>
    <table class="table table-bordered track_tbl">
      <thead>
        <tr>
          <th></th>
          <th>주문 번호</th>
          <th>상품 이름</th>
          <th>주문 상태</th>
          <th>주문 회사</th>
          <th>주문 수량</th>
          <th>주문 가격</th>
          <th>주문 시간</th>
        </tr>
      </thead>
      <tbody>
        <tr class="active" v-for="(item, index) in getOrderList" :key="index">
          <td class="track_dot">
            <span class="track_line"></span>
          </td>
          <td>{{ item.ORDER_ID }}</td>
          <td>
            <router-link :to="`/shop/view/${item.GDS_NUM}`">
              {{ item.GDS_NAME }}
            </router-link>
          </td>
          <td v-if="item.STATUS == 0">
            <a href="javascript:void(0)" @click="cancleOrder(item)"
              >신규 주문</a
            >
          </td>
          <td v-if="item.STATUS == 1">발송 대기</td>
          <td v-if="item.STATUS == 2">배송 중</td>
          <td v-if="item.STATUS == 3">
            <a href="javascript:void(0)">배송 완료</a>
          </td>
          <td v-if="item.STATUS == 4">구매 확정</td>
          <td v-if="item.STATUS == 5">취소 요청</td>
          <td>(주) 하이</td>
          <td>{{ item.CART_STOCK }}</td>
          <td>{{ item.TOTAL_PRICE }} 원</td>
          <td>{{ item.ORDER_DATE }}</td>
        </tr>
      </tbody>
    </table>
    <div id="pagination" class="tui-pagination"></div>
  </div>
</template>

<script>
import { deleteOrderList } from '@/api/Cart.js';
import Validation from '../../util/data/Validation';
import { createPageNation } from '@/util/tui grid/tuiPagenation';
var pagination;
export default {
  data() {
    return {
      goodsName: '',
      firstOption: '',
      secondOption: '',
      totalOrder: 0,
    };
  },
  async created() {
    await this.$store.dispatch('getOrderList', this.$route.query);
    pagination.setTotalItems(this.$store.state.order.total);
    pagination._paginate(this.$route.query.page * 1);
  },
  async mounted() {
    pagination = createPageNation('#pagination', 10);

    pagination.on('beforeMove', async function(event) {
      searchOrder(event);
    });
    const searchOrder = event => {
      this.searchOrder(event);
    };
  },
  methods: {
    async searchOrder(event) {
      let page = Validation.isNull(event) ? (event.page *= 1) : 1;
      this.$router.replace({
        query: {
          status: this.firstOption,
          page: page,
          pageStart: (page - 1) * 10,
          perPageNum: 10,
          gdsName: this.goodsName,
        },
      });
    },
    async cancleOrder(item) {
      if (item.STATUS > 0) {
        alert('이미 배송 되어 취소 할 수 없습니다.');
        return;
      }
      let result = confirm('주문을 취소 하시겠습니까?');
      if (result) {
        try {
          let reqArr = [item];
          await deleteOrderList(reqArr);

          alert(`${item.GDS_NAME} 상품이 주문 취소 되었습니다.`);
          await this.$store.dispatch(
            'getOrderList',
            this.$store.state.user.USER_ID,
          );
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  computed: {
    getOrderList() {
      return this.$store.state.order.order;
    },
  },
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css');
a:hover {
  text-decoration: none;
  color: #f67800;
}
a {
  color: rgb(18, 5, 41);
}
.track_tbl td.track_dot {
  width: 50px;
  position: relative;
  padding: 0;
  text-align: center;
}
.track_tbl td.track_dot:after {
  content: '\f111';
  font-family: FontAwesome;
  position: absolute;
  margin-left: -5px;
  top: 11px;
}
.track_tbl td.track_dot span.track_line {
  background: #000;
  width: 3px;
  min-height: 50px;
  position: absolute;
  height: 101%;
}
.track_tbl tbody tr:first-child td.track_dot span.track_line {
  top: 30px;
  min-height: 25px;
}
.track_tbl tbody tr:last-child td.track_dot span.track_line {
  top: 0;
  min-height: 25px;
  height: 10%;
}
</style>
