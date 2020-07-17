<template>
  <div id="#container">
    <h1>상품목록</h1>
    <h3>total {{ totalGoods }}</h3>
    <select class="selectOption" v-model="firstCategory">
      <option value="">
        전체
      </option>
      <option
        :value="item.CATEGORY_CODE"
        v-for="(item, index) in getCategory.fmenu"
        :key="index"
        >{{ item.CATEGORY_NAME }}</option
      >
    </select>
    <select class="selectOption" v-model="secondCategory">
      <option value="">
        전체
      </option>
      <option
        value=""
        v-for="(item, index) in getCategory.smenu"
        :key="index"
        >{{ item.CATEGORY_NAME }}</option
      >
    </select>
    <input type="text" name="" id="" v-model="goodsname" />
    <button @click="searchGoods()">검색</button>
    <table>
      <thead>
        <tr>
          <th>번호</th>
          <th>상품</th>
          <th>이름</th>
          <th>카테고리</th>
          <th>등록날짜</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(goods, index) in goodsList" :key="index">
          <td>{{ goods.GDS_NUM }}</td>
          <td>
            <img
              :src="`http://localhost:3000/${goods.GDS_IMG}`"
              class="goodsImg"
            />
          </td>
          <td>
            <a onclick="javascript:void(0);" @click="openGoods(goods)">{{
              goods.GDS_NAME
            }}</a>
          </td>
          <td>{{ goods.GDS_CATEGORY_NAME }}</td>
          <td>{{ goods.GDS_DATE }}</td>
        </tr>
      </tbody>
    </table>
    <Modal
      v-if="showModal"
      @closeModal="closeModal"
      :item="item"
      @refresh="refresh"
    >
    </Modal>
    <div id="pagination" class="tui-pagination"></div>
  </div>
</template>

<script>
import { getGoodsList } from '@/api/Goods.js';
import Modal from '../common/modal.vue';

import { createPageNation } from '@/util/tui grid/tuiPagenation';
import Validation from '@/util/data/Validation.js';
var pagination;
export default {
  data() {
    return {
      firstCategory: '',
      secondCategory: '',
      goodsList: [],
      showModal: false,
      item: {},
      selectCategory: '',
      goodsname: '',
      totalGoods: 0,
    };
  },
  computed: {
    getCategory() {
      let cate = this.$store.state.category.category;
      let fmenu = [];
      let smenu = [];
      let returnValue = {};
      for (let i = 0; i < cate.length; i++) {
        if (cate[i].CATEGORY_LEVEL == 1) {
          fmenu.push(cate[i]);
        } else {
          if (cate[i].CATEGORY_REF == this.firstCategory) smenu.push(cate[i]);
        }
      }
      returnValue.fmenu = fmenu;
      returnValue.smenu = smenu;

      return returnValue;
    },
  },
  components: {
    Modal,
  },
  async created() {
    let query = this.$route.query;
    if (query.page == undefined) {
      query.page = 1;
    }
    if (query.pageStart == undefined) {
      query.pageStart = (query.page - 1) * 10;
    }
    if (query.perPageNum == undefined) {
      query.perPageNum = 10;
    }

    const response = await getGoodsList(query);
    this.goodsList = response.data.results;
    this.totalGoods = response.data.results2[0].TOTAL_COUNT;
    pagination.setTotalItems(this.totalGoods);
    pagination._paginate(query.page * 1);
  },
  mounted() {
    pagination = createPageNation('#pagination', 10);

    pagination.on('beforeMove', async function(event) {
      searchGoods(event);
    });
    const searchGoods = event => {
      this.searchGoods(event);
    };
  },
  methods: {
    async searchGoods(event) {
      let page = Validation.isNull(event) ? (event.page *= 1) : 1;

      this.$router.push({
        query: {
          fcode: this.firstCategory,
          scode: this.secondCategory,
          page: page,
          pageStart: (page - 1) * 10,
          perPageNum: 10,
          gdsName: this.goodsname,
        },
      });
    },
    async openGoods(goods) {
      this.showModal = true;
      this.item = goods;
    },
    closeModal() {
      this.showModal = !this.showModal;
    },
    async refresh() {
      this.searchGoods();
    },
    getImgSrc(GDS_IMG) {
      return 'http://localhost:3000/' + GDS_IMG;
    },
  },
};
</script>

<style scoped>
#container table {
  width: 900;
}
#container table th {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  padding: 10px;
  border-bottom: 2px solid #666;
}
#container table tr:hover {
  background: #eee;
}
#container table td {
  padding: 10px;
  text-align: center;
}
#container table img {
  width: 150px;
  height: 150px;
}
</style>
