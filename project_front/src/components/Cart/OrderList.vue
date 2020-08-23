<template>
  <div class="container">
    <h3>주문 현황</h3>
    <h3 class="total">total {{ totalOrder }}</h3>
    <div class="search_area">
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
      <input
        type="text"
        placeholder="상품이름"
        id="searchInput"
        v-model="goodsName"
        @keyup.enter="searchOrder()"
      />
      <button @click="searchOrder()" class="searchBtn">검색</button>
    </div>

    <div v-for="(item, index) in getOrderList" :key="index" class="order_list">
      <div class="top_area">
        <span class="order_id">{{ item.ORDER_ID }}</span>
        <span class="order_date"> &nbsp;|&nbsp; {{ item.ORDER_DATE }} </span>
      </div>
      <div class="content">
        <img :src="`${getUrl}${item.GDS_IMG}`" class="gds_img" />
        <div class="info">
          <ul>
            <li>
              <router-link :to="`/shop/view/${item.GDS_NUM}`">
                <span class="gds_name">{{ item.GDS_NAME }}</span>
              </router-link>
            </li>
            <li>
              <span class="gds_price">{{ item.TOTAL_PRICE }} 원</span>
              <span class="gds_price">&nbsp;&nbsp;{{ item.CART_STOCK }}개</span>
            </li>
            <li>
              <span v-if="item.STATUS === 0" class="gds_status">
                <a href="javascript:void(0)" @click="cancleOrder(item)">
                  신규 주문
                </a>
              </span>
              <span v-if="item.STATUS === 1" class="gds_status">
                발송 대기
              </span>
              <span v-if="item.STATUS === 2" class="gds_status">
                배송 중
              </span>
              <span v-if="item.STATUS === 3" class="gds_status">
                배송 완료
              </span>
              <span v-if="item.STATUS === 4" class="gds_status">
                구매 확정
              </span>
              <span v-if="item.STATUS === 5" class="gds_status">
                취소 요청
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- <table class="table table-bordered track_tbl">
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
    </table> -->
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
  beforeUpdate() {
    this.totalOrder = this.$store.state.order.total;
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
          t: new Date().getTime(),
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
          await this.$store.dispatch('getOrderList', {
            USER_ID2: this.$store.state.user.USER_ID,
          });
        } catch (error) {
          alert(error);
        }
      }
    },
  },
  computed: {
    getOrderList() {
      return this.$store.state.order.order;
    },
    getUrl() {
      return this.$store.state.url;
    },
  },
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css');
.gds_img {
  width: 300px;
  height: 300px;
}
.order_id,
.order_date {
  font-size: 20px;
  font-weight: bold;
}
.order_list {
  position: relative;
}
.top_area {
  border: 0 0 24px 24px;
  border-bottom: 6px inset;
  padding: 3%;
}
.info {
  font-size: 19px;
  margin-left: auto;
  margin-right: auto;
  font-weight: bold;
  line-height: 3.2em;
}
.info > ul {
  list-style: none;
}
.info > ul > li > span > a {
  color: #69b5f7;
}
.info > ul > li > a {
  color: #6f8394;
}
.content {
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 2%;
}
.selectOption {
  width: 100px;
  height: 33px;
}
#searchInput {
  margin-left: 1%;
  margin-right: 1%;
  width: 200px;
  height: 32px;
}
.search_area {
  display: flex;
}
.searchBtn {
  width: 100px;
  border-radius: 8px;
  background: #000508;
  color: white;
}
</style>
