<template>
  <div>
    <form
      role="form"
      method="post"
      autocomplete="off"
      enctype="multipart/form-data"
      @submit.prevent="goodsRegist"
      ref="form"
      class="form"
    >
      <div class="inputArea1">
        <select
          class="category1 form-control"
          v-model="goods.CATEGORY_CODE1"
          @change="SelectSecond"
          id="firstOption"
          name="category1"
        >
          <option value="" selected>1차 분류</option>
          <option
            :value="category.CATEGORY_CODE"
            v-for="(category, index) in firstCategory"
            :key="index"
            >{{ category.CATEGORY_NAME }}</option
          >
        </select>
        <select
          class="category2 form-control"
          v-model="goods.CATEGORY_CODE2"
          name="category2"
        >
          <option value="" selected>2차분류</option>
          <option
            :value="category2.CATEGORY_CODE"
            v-for="(category2, index) in secondCategory"
            :key="index"
          >
            {{ category2.CATEGORY_NAME }}
          </option>
        </select>
      </div>

      <div class="inputArea2">
        <label for="GDS_NAME">상품명</label>
        <input
          type="text"
          id="GDS_NAME"
          name="GDS_NAME"
          v-model="goods.GDS_NAME"
          class="form-control"
        />

        <label for="GDS_PRICE">상품가격</label>
        <input
          type="text"
          id="GDS_PRICE"
          name="GDS_PRICE"
          v-model="goods.GDS_PRICE"
          class="form-control"
        />

        <label for="GDS_STOCK">상품수량</label>
        <input
          type="text"
          id="GDS_STOCK"
          name="GDS_STOCK"
          v-model="goods.GDS_STOCK"
          class="form-control"
        />
      </div>

      <div class="inputArea5">
        <label for="GDS_DESC">상품소개</label>
        <ckeditor
          id="GDS_DESC"
          name="GDS_DESC"
          v-model="goods.GDS_DESC"
        ></ckeditor>
        <input
          type="file"
          ref="files2"
          name="sampleFile"
          id="file"
          accept="image/*"
        />
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
import Validation from '@/util/data/Validation.js';
export default {
  async created() {
    try {
      const response = await getCategory(null);
      this.firstCategory = response.data;
    } catch (error) {
      alert(error);
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
        if (Validation.isNull(!select.options[select.selectedIndex].value)) {
          this.secondCategory = [];
          return;
        }
        const reqData = select.options[select.selectedIndex].value;
        const response = await getCategory(reqData);
        this.secondCategory = response.data;
      } catch (error) {
        alert(error);
      }
    },
    async goodsRegist() {
      try {
        const result = this.checkValidation();
        if (result) {
          const form = this.$refs.form;
          const formData = new FormData(form);
          if (formData.get('category2') === '') {
            formData.append('GDS_CATEGORY_CODE', this.goods.CATEGORY_CODE1);
          } else {
            formData.append('GDS_CATEGORY_CODE', this.goods.CATEGORY_CODE2);
          }
          formData.append('GDS_DESC', this.goods.GDS_DESC);
          await InsertGoods(formData);
          alert('상품이 등록 되었습니다.');
        }
      } catch (error) {
        alert(error);
      }
    },
    checkValidation() {
      const fmenu = Validation.isNull(this.goods.CATEGORY_CODE1);
      if (!fmenu) {
        alert('1차 분류를 선택해주세요.');
        return false;
      }
      const smenu = Validation.isNull(this.goods.CATEGORY_CODE2);
      if (!smenu) {
        alert('2차 분류를 선택해주세요.');
        return false;
      }
      const gds_name = Validation.isNull(this.goods.GDS_NAME);
      if (!gds_name) {
        alert('상품명을 입력해주세요.');
        return false;
      }
      const isGds_name = Validation.isLength(this.goods.GDS_NAME, 50);
      if (!isGds_name) {
        alert('상품명은 50자 이내로 입력해주세요.');
        return false;
      }

      const gds_price0 = Validation.isNull(this.goods.GDS_PRICE);
      if (!gds_price0) {
        alert('가격을 입력해주세요.');
        return false;
      }

      const gds_price = Validation.isNum(this.goods.GDS_PRICE);
      if (!gds_price) {
        alert('가격은 숫자로만 입력해주세요.');
        return false;
      }

      const gds_price1 = Validation.isPrice(this.goods.GDS_PRICE);
      if (!gds_price1) {
        alert('가격은 1000원 이상 500만원 이하로 입력해주세요.');
        return false;
      }

      const gds_stock0 = Validation.isNull(this.goods.GDS_STOCK);
      if (!gds_stock0) {
        alert('수량을 입력해주세요.');
        return false;
      }

      const gds_stock = Validation.isNum(this.goods.GDS_STOCK);
      if (!gds_stock) {
        alert('수량은 숫자로만 입력해주세요.');
        return false;
      }

      const gds_stock1 = Validation.isStock(this.goods.GDS_STOCK);
      if (!gds_stock1) {
        alert('수량은 10개 이상 5000개 이하로 입력해주세요.');
        return false;
      }

      const gds_desc0 = Validation.isNull(this.goods.GDS_DESC);
      if (!gds_desc0) {
        alert('상품 설명을 입력해주세요.');
        return false;
      }

      const gds_desc = Validation.isLength(this.goods.GDS_DESC, 500);
      if (!gds_desc) {
        alert('상품 설명은 500자 미만으로 입력 해주세요.');
        return false;
      }
      let image = document.querySelector('#file').value;

      const img = Validation.isNull(image);
      if (!img) {
        alert('이미지를 업로드 해주세요.');
        return false;
      }
      return true;
    },
  },
};
</script>

<style scoped>
.form {
  margin-left: 15%;
}
.inputArea1 {
  display: flex;
  margin: 10px 0;
  width: 30%;
}
.inputArea2 {
  display: -webkit-inline-box;
  margin: 10px 0;
  width: 30%;
}
@media (max-width: 808px) {
  .inputArea2 {
    display: block;
  }
  .inputArea1 {
    display: block;
  }
}
.inputArea5 {
  display: block;
  margin: 10px 0;
  width: 60%;
}
.category1,
.category2 {
  margin: 2%;
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
.cke {
  width: 400px;
}
</style>
