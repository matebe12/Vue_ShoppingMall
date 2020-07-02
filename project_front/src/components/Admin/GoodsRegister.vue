<template>
  <div>
    <form
      role="form"
      method="post"
      autocomplete="off"
      enctype="multipart/form-data"
      @submit.prevent="goodsRegist"
      ref="form"
    >
      <div class="inputArea">
        <label>1차 분류</label>
        <select
          class="category1"
          v-model="goods.CATEGORY_CODE1"
          @change="SelectSecond"
          id="firstOption"
          name="category1"
        >
          <option value="" selected>전체</option>
          <option
            :value="category.CATEGORY_CODE"
            v-for="(category, index) in firstCategory"
            :key="index"
            >{{ category.CATEGORY_NAME }}</option
          >
        </select>
        <label>2차 분류</label>
        <select
          class="category2"
          v-model="goods.CATEGORY_CODE2"
          name="category2"
        >
          <option value="" selected>전체</option>
          <option
            :value="category2.CATEGORY_CODE"
            v-for="(category2, index) in secondCategory"
            :key="index"
          >
            {{ category2.CATEGORY_NAME }}
          </option>
        </select>
      </div>

      <div class="inputArea">
        <label for="GDS_NAME">상품명</label>
        <input
          type="text"
          id="GDS_NAME"
          name="GDS_NAME"
          v-model="goods.GDS_NAME"
        />
      </div>

      <div class="inputArea">
        <label for="GDS_PRICE">상품가격</label>
        <input
          type="text"
          id="GDS_PRICE"
          name="GDS_PRICE"
          v-model="goods.GDS_PRICE"
        />
      </div>

      <div class="inputArea">
        <label for="GDS_STOCK">상품수량</label>
        <input
          type="text"
          id="GDS_STOCK"
          name="GDS_STOCK"
          v-model="goods.GDS_STOCK"
        />
      </div>

      <div class="inputArea">
        <label for="GDS_DESC">상품소개</label>
        <ckeditor
          id="GDS_DESC"
          name="GDS_DESC"
          v-model="goods.GDS_DESC"
        ></ckeditor>
        <input type="file" ref="files2" name="sampleFile" id="file" />
        <button type="submit" id="register_Btn" class="btn btn-primary">
          등록
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { getCategory, InsertGoods } from '@/api/Goods.js';
import CKEditor from 'ckeditor4-vue';
export default {
  async created() {
    try {
      const response = await getCategory(null);
      this.firstCategory = response.data.results;
    } catch (error) {
      console.log(error);
    }
  },
  data() {
    return {
      firstCategory: [],
      secondCategory: [],
      goods: {
        GDS_CATEGORY_CODE: '',
        CATEGORY_CODE1: '',
        CATEGORY_CODE2: '',
        GDS_NAME: '',
        GDS_PRICE: 0,
        GDS_STOCK: 0,
        GDS_DESC: '',
        file: '',
      },
    };
  },
  components: {
    ckeditor: CKEditor.component,
  },
  methods: {
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
    async goodsRegist() {
      try {
        const form = this.$refs.form;
        const formData = new FormData(form);
        if (formData.get('category2') === '') {
          formData.append('GDS_CATEGORY_CODE', this.goods.CATEGORY_CODE1);
        } else {
          formData.append('GDS_CATEGORY_CODE', this.goods.CATEGORY_CODE2);
        }
        console.log(this.goods.GDS_DESC);

        formData.append('GDS_DESC', this.goods.GDS_DESC);
        const response = await InsertGoods(formData);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.inputArea {
  margin: 10px 0;

  margin-left: 32%;
}
select {
  width: 100px;
}
label {
  display: inline-block;
  width: 70px;
  padding: 5px;
}
label[for='GDS_DESC'] {
  display: block;
}
input {
  width: 150px;
}
textarea#GDS_DESC {
  width: 400px;
  height: 180px;
}
</style>
