<template>
  <div class="container">
    <section class="condition">
      <div class="box_type1">
        <div class="search_area">
          <table class="sch_table">
            <colgroup>
              <col style="width:;" />
              <col style="width: 35%;" />
              <col style="width:;" />
              <col style="width:;" />
              <col style="width: 60px;" />
            </colgroup>
            <tr>
              <th title="ID">아이디</th>
              <td>
                <input
                  type="text"
                  id="searUserID"
                  v-model="inputData.USER_ID"
                  @keyup.enter="refreshData"
                />
              </td>
              <th title="Name">상품이름</th>
              <td>
                <input
                  type="text"
                  id="GDS_NAME"
                  v-model="inputData.USER_NAME"
                  @keyup.enter="refreshData"
                />
              </td>
              <th title="Name">상태</th>
              <td>
                <select v-model="inputData.USER_VERIFY" id="selectOption">
                  <option value="" selected>전체</option>
                  <option v-for="i in 6" :key="i" :value="i - 1">{{
                    i - 1
                  }}</option>
                </select>
              </td>
              <td class="ar">
                <div class="btn_search">
                  <a href="javascript:void(0);" id="searchBtn">검색</a>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="box_type1">
        <div class="gridbtn_area">
          <div class="btn_gridsearch_f">
            Total
            <strong><span id="totalCount">0</span></strong>
          </div>
          <div class="btn_gridsearch_fr">
            <a href="javascript:void(0);" id="delBtn"
              ><span>주문 삭제 </span></a
            >
          </div>
          <div class="btn_gridsearch_fr">
            <a href="javascript:void(0);" id="updBtn" @click="updateState()"
              ><span>주문 상태 변경 </span></a
            >
          </div>
          <div class="btn_gridsearch_fr">
            <export-excel :data="orderData">
              <a href="javascript:void(0);"> <span> 엑셀 다운로드 </span></a>
            </export-excel>
          </div>
        </div>
      </div>
      <div class="row">
        <div id="userGrid"></div>
      </div>
      <div id="pagination" class="tui-pagination"></div>
    </section>
    <Modal
      v-if="modalopen"
      :item="propsdata"
      @closeModal="closeModal"
      @refreshData="refreshData"
    ></Modal>
  </div>
</template>

<script>
import { createdGrid } from '@/util/tui grid/tuiGrid';
import { createPageNation } from '@/util/tui grid/tuiPagenation';
import Validation from '@/util/data/Validation.js';
import Modal from './modal.vue';
var pagination;
var instance;

export default {
  components: {
    Modal,
  },
  data() {
    return {
      orderData: null,
      modalopen: false,
      propsdata: '',
      inputData: {
        USER_ID: '',
        USER_NAME: '',
        USER_VERIFY: '',
      },
      columns: [
        {
          header: '주문 번호',
          name: 'ORDER_ID',
        },
        {
          header: '상품 이름',
          name: 'GDS_NAME',
        },
        {
          header: '주문 상태',
          name: 'STATUS',
          formatter: value => {
            let state = value.value;
            switch (state) {
              case 0:
                return '<a href="javascript:void(0)">신규주문</a>';
              case 1:
                return '<a href="javascript:void(0)">발송대기</a>';
              case 2:
                return '<a href="javascript:void(0)">배송중</a>';
              case 3:
                return '<a href="javascript:void(0)">배송완료</a>';
              case 4:
                return '<a href="javascript:void(0)">구매확정</a>';
              case 5:
                return '<a href="javascript:void(0)">취소요청</a>';
            }
            return '<p>(주) 하이</p>';
          },
        },
        {
          header: '주문 회사',
          name: 'USER_BIRTH',
          formatter: () => {
            return '<p>(주) 하이</p>';
          },
        },
        {
          header: '주문 수량',
          name: 'CART_STOCK',
        },
        {
          header: '주문 시간',
          name: 'ORDER_DATE',
          align: 'center',
        },
      ],
      options: {
        scrollY: true,
        scrollX: true,
        bodyHeight: 430,
        multiCheck: true,
      },
    };
  },
  async mounted() {
    const getOrderListData = async event => {
      var selectOption = document.querySelector('#selectOption').value;
      console.log('option : ' + selectOption);

      let reqData = {
        USER_ID: document.querySelector('#searUserID').value,
        GDS_NAME: document.querySelector('#GDS_NAME').value,
        STATUS: selectOption,
        PAGE: Validation.isNull(event.page) ? event.page : 1,
      };
      reqData.PAGE_START = (reqData.PAGE - 1) * 10;
      reqData.PER_PAGE_NUM = 10; // 보여줄 상품 수
      console.log(reqData);
      await this.$store.dispatch('getOrderList', reqData);
      let orderData = this.$store.state.order.order;
      instance.resetData(orderData);
      let data = [];
      for (let i = 0; i < orderData.length; i++) {
        delete orderData[i].uniqueKey;
        delete orderData[i]._attributes;
        delete orderData[i]._disabledPriority;
        delete orderData[i].rowSpanMap;
        delete orderData[i]._relationListItemMap;
        delete orderData[i].rowKey;
        delete orderData[i].sortKey;
        data.push(orderData[i]);
      }
      this.orderData = data;

      pagination.setTotalItems(this.$store.state.order.total);
      document.querySelector(
        '#totalCount',
      ).innerHTML = this.$store.state.order.total;
      pagination._paginate(reqData.PAGE);
    };
    instance = createdGrid('#userGrid', this.columns, this.options);

    pagination = createPageNation('#pagination', 10);
    pagination.on('beforeMove', async function(event) {
      getOrderListData(event);
    });
    document
      .querySelector('#searchBtn')
      .addEventListener('click', getOrderListData);
  },
  methods: {
    updateState() {
      const checkRow = instance.getCheckedRows();
      if (checkRow.length < 1) {
        alert('주문 상품을 선택 해주세요.');
        return;
      } else if (checkRow.length > 1) {
        alert('주문 상품은 한개만 선택해주세요.');
        return;
      } else {
        // let rowItem = checkRow[0].STATUS;
        // switch (rowItem) {
        // }
      }
    },
  },
};
</script>

<style scoped>
.gridbtn_area {
  display: inline-block;
  width: 100%;
}
.gridbtn_area > .btn_gridsearch_f {
  display: inline-block;
}
.btn_gridsearch_fr {
  float: right;
}
.search_area {
  padding: 15px 20px 15px;
  border: 1px solid #d1d2d4;
  border-radius: 10px;
  background: #f0f1f3;
}
.btn_gridsearch_fr a span {
  color: #000;
  text-decoration: none;
  padding: 10px;
}
.btn_search {
  background: url('../../assets/images/bg_Searchbtn_gray.png');
  border: 1px solid #201b1c;
  border-radius: 5px;
  padding: 5px 10px;
  display: inline-block;
  font-weight: bold;
}
.btn_search a {
  color: #000000;
  text-decoration: none;
}
.sch_table {
  width: 100%;
  table-layout: auto;
}
.sch_table > tbody > tr > th,
.sch_table > tbody > tr > td {
  padding-top: 1px;
  padding-bottom: 1px;
  text-align: left;
  empty-cells: show;
}
.sch_table > tbody > tr > th:first-child,
.sch_table > tbody > tr > td:first-child {
  padding-left: 0 !important;
}
.sch_table > tbody > tr > th {
  width: 10px;
  max-width: 150px;
  padding-right: 10px;
  padding-left: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: keep-all;
  white-space: nowrap;
  vertical-align: top;
  padding-top: 5px;
  padding-bottom: 5px;
  line-height: 25px;
  font-size: 13px;
}
.sch_table > tbody > tr > td {
  padding-left: 5px;
}
.sch_table > tbody > tr > td input[type='text'],
.sch_table > tbody > tr > td input[type='password'],
.sch_table > tbody > tr > td select,
.sch_table > tbody > tr > td textarea {
  width: 100%;
}
.sch_table > tbody > tr > td .calendar_input,
.sch_table > tbody > tr > td .poplist_input {
  width: 100%;
  vertical-align: middle;
}
.sch_table > tbody > tr > td table th {
  font-weight: normal;
}
</style>
