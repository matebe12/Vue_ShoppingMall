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
        <i
          class="fas fa-times closeModalBtn"
          @click="showModal = false"
          style="float:right"
        ></i>
      </h3>
      <div slot="body">
        <label>1차 분류</label>
        <select
          class="category1 form-control"
          v-model="item.CATEGORY_CODE1"
          @change="SelectSecond"
          id="firstOption"
        >
          <option value="">전체</option>
          <option
            :value="category.CATEGORY_CODE"
            v-for="(category, index) in firstCategory"
            :key="index"
            >{{ category.CATEGORY_NAME }}</option
          >
        </select>
        <label>2차 분류</label>
        <select class="category2 form-control" v-model="item.CATEGORY_CODE2">
          <option value="" selected>전체</option>
          <option
            :value="category2.CATEGORY_CODE"
            v-for="(category2, index) in secondCategory"
            :key="index"
          >
            {{ category2.CATEGORY_NAME }}
          </option>
        </select>
        <div>
          <label for="GDS_NUM">GDS_NUM</label>
          <input
            type="text"
            id="GDS_NUM"
            readonly
            :value="item.GDS_NUM"
            class="form-control"
          />
        </div>
        <div>
          <label for="GDS_NAME">GDS_NAME</label>
          <input
            type="text"
            id="GDS_NAME"
            :value="item.GDS_NAME"
            class="form-control"
          />
        </div>
        <div>
          <label for="GDS_CATEGORY_NAME">GDS_CATEGORY_NAME</label>
          <input
            type="text"
            id="GDS_CATEGORY_NAME"
            :value="item.GDS_CATEGORY_NAME"
            class="form-control"
            readonly
          />
        </div>
        <div>
          <label for="GDS_PRICE">GDS_PRICE</label>
          <input
            type="text"
            id="GDS_PRICE"
            :value="item.GDS_PRICE"
            class="form-control"
          />
        </div>
        <div>
          <label for="GDS_STOCK">GDS_STOCK</label>
          <input
            type="text"
            id="GDS_STOCK"
            :value="item.GDS_STOCK"
            class="form-control"
          />
        </div>
        <div>
          <label for="GDS_DATE">GDS_DATE</label>
          <input
            type="text"
            id="GDS_DATE"
            :value="item.GDS_DATE"
            readonly
            class="form-control"
          />
        </div>
        <label for="GDS_DESC">GDS_DESC</label>
        <textarea
          id="GDS_DESC"
          :value="item.GDS_DESC"
          readonly
          class="form-control"
        />

        <div style="margin-top:2px;">
          <span>
            <i class="fas fa-edit fa-1x"
              ><a href="javascript:void(0);" @click="updateGoods">수정</a></i
            ></span
          >
          <span
            ><i class="fas fa-trash-alt fa-1x" @click="deleteGoods"
              >삭제</i
            ></span
          >
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import {
  getGoodsList,
  updateGoods,
  deleteGoods,
  getCategory,
} from '@/api/Goods.js';
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
    const responseCate = await getCategory(null);
    this.firstCategory = responseCate.data.results;
    console.log(response);
  },
  methods: {
    openGoods(goods) {
      console.log('Hello');
      this.showModal = true;
      this.item = goods;
    },
    async updateGoods() {
      const reqData = {
        //v-model로 하면 부모창에서도 값이 바뀌어 버림
        GDS_NUM: document.getElementById('GDS_NUM').value,
        GDS_NAME: document.getElementById('GDS_NAME').value,
        GDS_PRICE: document.getElementById('GDS_PRICE').value,
        GDS_STOCK: document.getElementById('GDS_STOCK').value,
        GDS_DESC: document.getElementById('GDS_DESC').value,
      };
      console.log(reqData);

      try {
        // 상품 카테고리도 수정 해야함
        const response = await updateGoods(reqData);
        console.log(response);
        alert('상품 수정완료');
        this.showModal = !this.showModal;
        const reflesh = await getGoodsList();
        this.goodsList = reflesh.data.results;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteGoods() {
      try {
        const selectEvent = confirm('상품을 삭제 하시겠습니까? ');
        if (selectEvent) {
          const reqData = {
            GDS_NUM: this.item.GDS_NUM,
          };
          const response = await deleteGoods(reqData);
          console.log(response);
          alert('상품이 삭제 되었습니다.');
          this.showModal = !this.showModal;
          const reflesh = await getGoodsList();
          this.goodsList = reflesh.data.results;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async SelectSecond() {
      try {
        const select = document.getElementById('firstOption');
        const reqData = select.options[select.selectedIndex].value;
        console.log(reqData);
        const response = await getCategory(reqData);
        console.log(response);
        this.secondCategory = response.data.results;
      } catch (error) {
        console.log(error);
      }
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
