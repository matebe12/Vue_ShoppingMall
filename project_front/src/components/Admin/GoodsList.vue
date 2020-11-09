<template>
  <div id="#container">
    <h1>상품목록</h1>
    <h3>
      총 <span class="total">{{ totalGoods }} </span>개의 상품이 있습니다.
    </h3>
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
    <input
      type="text"
      name=""
      id=""
      v-model="goodsname"
      @keyup.enter="searchGoods()"
      class="input"
    />
    <button @click="searchGoods()">검색</button>
    <div class="table">
      <div v-for="(goods, index) in goodsList" :key="index" class="content">
        <img
          :src="`${getUrl}${goods.GDS_IMG}`"
          class="goodsImg"
          style="width:300px;height:300px;"
        />
        <div class="info">
          <div>
            <span>상품번호 </span>
            <a onclick="javascript:void(0);" @click="openGoods(goods)">{{
              goods.GDS_NUM
            }}</a>
          </div>
          <div>
            <span>상품명 </span>
            <a onclick="javascript:void(0);" @click="openGoods(goods)">{{
              goods.GDS_NAME
            }}</a>
          </div>
          <div>
            <span>카테고리 </span>
            {{ goods.GDS_CATEGORY_NAME }}
          </div>
          <div>
            <span>등록날짜 </span>
            {{ goods.GDS_DATE }}
          </div>
        </div>
      </div>
    </div>
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
    getUrl() {
      return this.$store.state.url;
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
    this.goodsList = response.data.result;
    this.totalGoods = response.data.result1[0].TOTAL_COUNT;
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
          t: new Date().getTime(),
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
  },
};
</script>

<style scoped>
.selectOption,
.input {
  width: 200px;
  padding: 10px;
  margin: 0 0.5% 0 0.5%;
}
button {
  width: 100px;
  padding: 10px;
  margin: 0 1% 0 1%;
  border: none;
}
.total {
  font-weight: bold;
}
@media screen and (min-width: 900px) {
  .content {
    display: flex;
    background-color: aliceblue;
    box-shadow: 10px 10px 5px darkgrey;
    border-radius: 10px;
    margin: 1%;
  }
  .info {
    width: 100%;
    text-align: center;
    line-height: 7rem;
    letter-spacing: 0.2rem;
    font-size: 3rem;
    transition-duration: 1s;
  }
}

@media screen and (max-width: 899px) {
  .content {
    background-color: aliceblue;
    box-shadow: 10px 10px 5px darkgrey;
    border-radius: 10px;
    margin: 1%;
  }
  .info {
    width: 100%;
    line-height: 7rem;
    letter-spacing: 0.2rem;
    font-size: 3rem;
    transition-duration: 1s;
  }
}

.info span {
  font-weight: bold;
}
.info a {
  color: gray;
  cursor: pointer;
}
.content:hover {
  background-color: #eee;
}
</style>
