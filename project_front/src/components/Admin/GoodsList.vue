<template>
  <div>
    <h1>상품목록</h1>
    <table border="1px">
      <thead>
        <tr>
          <th>번호</th>
          <th>이름</th>
          <th>카테고리</th>
          <th>등록날짜</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(goods, index) in goodsList" :key="index">
          <td>{{ goods.GDS_NUM }}</td>
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
    <Modal v-if="showModal" @close="!showModal">
      <h3 slot="header">
        상세정보
        <i class="fas fa-times closeModalBtn" @click="showModal = false"></i>
      </h3>
      <div slot="body">
        <label for="GDS_NUM">GDS_NUM</label>
        <p id="GDS_NUM">{{ item.GDS_NUM }}</p>
        <label for="GDS_NUM">GDS_NAME</label>
        <p id="GDS_NUM">{{ item.GDS_NAME }}</p>
        <label for="GDS_NUM">GDS_CATEGORY_NAME</label>
        <p id="GDS_NUM">{{ item.GDS_CATEGORY_NAME }}</p>
        <label for="GDS_NUM">GDS_PRICE</label>
        <p id="GDS_NUM">{{ item.GDS_PRICE }}</p>
        <label for="GDS_NUM">GDS_STOCK</label>
        <p id="GDS_NUM">{{ item.GDS_STOCK }}</p>
        <label for="GDS_NUM">GDS_DATE</label>
        <p id="GDS_NUM">{{ item.GDS_DATE }}</p>
        <div>
          <span> <i class="fas fa-edit fa-2x">수정</i></span>
          <span><i class="fas fa-trash-alt fa-2x">삭제</i></span>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import { getGoodsList } from '@/api/Goods.js';
import Modal from '../common/modal.vue';
export default {
  data() {
    return {
      goodsList: [],
      showModal: false,
      item: {},
    };
  },
  components: {
    Modal,
  },
  async created() {
    console.log('목록 진입');

    const response = await getGoodsList();
    this.goodsList = response.data.results;
    console.log(response);
  },
  methods: {
    openGoods(goods) {
      console.log('Hello');
      this.showModal = true;
      this.item = goods;
    },
  },
};
</script>

<style scoped>
.fa-trash-alt {
  float: right;
}
.fa-edit {
  float: left;
}
</style>
