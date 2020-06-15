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
    <Modal
      v-if="showModal"
      @closeModal="closeModal"
      :item="item"
      @refresh="refresh"
    >
    </Modal>
  </div>
</template>

<script>
import { getGoodsList } from '@/api/Goods.js';
import Modal from '../common/modal.vue';
export default {
  data() {
    return {
      firstCategory: [],
      secondCategory: [],
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
    async openGoods(goods) {
      console.log('Hello');
      this.showModal = true;
      this.item = goods;
    },
    closeModal() {
      this.showModal = !this.showModal;
    },
    async refresh() {
      const reflesh = await getGoodsList();
      this.goodsList = reflesh.data.results;
    },
  },
};
</script>

<style scoped></style>
