<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <!-- 헤더 -->
          <div class="modal-header">
            <h3 slot="header">
              상세정보
              <i
                class="fas fa-times closeModalBtn"
                @click="closeModal"
                style="float:right"
              ></i>
            </h3>
          </div>
          <!-- 바디 -->
          <div class="modal-body">
            <div>
              <div class="col-xs-3">
                <label>1차 분류</label>
                <select
                  class="category1 form-control"
                  v-model="selected"
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
                <select
                  class="category2 form-control"
                  v-model="selected2"
                  id="secondOption"
                >
                  <option value="">전체</option>
                  <option
                    :value="category2.CATEGORY_CODE"
                    v-for="(category2, index) in secondCategory"
                    :key="index"
                  >
                    {{ category2.CATEGORY_NAME }}
                  </option>
                </select>
              </div>

              <div class="col-xs-3">
                <label for="GDS_NUM">GDS_NUM</label>
                <input
                  type="text"
                  id="GDS_NUM"
                  readonly
                  :value="item.GDS_NUM"
                  class="form-control"
                />
              </div>
              <div class="col-xs-3">
                <label for="GDS_NAME">GDS_NAME</label>
                <input
                  type="text"
                  id="GDS_NAME"
                  :value="item.GDS_NAME"
                  class="form-control"
                />
              </div>
              <div class="col-xs-3">
                <label for="GDS_PRICE">GDS_PRICE</label>
                <input
                  type="text"
                  id="GDS_PRICE"
                  :value="item.GDS_PRICE"
                  class="form-control"
                />
              </div>
              <div class="col-xs-3">
                <label for="GDS_STOCK">GDS_STOCK</label>
                <input
                  type="text"
                  id="GDS_STOCK"
                  :value="item.GDS_STOCK"
                  class="form-control"
                />
              </div>
              <div class="col-xs-3">
                <label for="GDS_DATE">GDS_DATE</label>
                <input
                  type="text"
                  id="GDS_DATE"
                  :value="item.GDS_DATE"
                  readonly
                  class="form-control"
                />
              </div>
              <div class="col-xs-3 img_scope">
                <img
                  :src="getImgSrc()"
                  ref="image"
                  width="130px;"
                  height="80px;"
                />
              </div>
              <label for="GDS_DESC">GDS_DESC</label>
              <textarea
                id="GDS_DESC"
                :value="item.GDS_DESC"
                class="form-control"
              />

              <div style="margin-top:10px;">
                <span>
                  <i class="fas fa-edit fa-2x"
                    ><a href="javascript:void(0);" @click="updateGoods"
                      >수정</a
                    ></i
                  ></span
                >
                <span
                  ><i class="fas fa-trash-alt fa-2x" @click="deleteGoods"
                    >삭제</i
                  ></span
                >
              </div>
            </div>
          </div>
          <!-- 푸터 -->
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import {
  getGoodsList,
  updateGoods,
  deleteGoods,
  getCategory,
} from '@/api/Goods.js';
export default {
  data() {
    return {
      selected: '',
      firstCategory: [],
      secondCategory: [],
      selected2: '',
      imgPath: 'img',
    };
  },
  props: ['item'],
  async created() {
    const responseCate = await getCategory(null);
    this.firstCategory = responseCate.data.results;
    this.selected =
      this.item.CATEGORY_REF == null
        ? this.item.GDS_CATEGORY_CODE
        : this.item.CATEGORY_REF;
    let responseCate2;
    if (this.item.CATEGORY_REF != null) {
      responseCate2 = await getCategory(this.item.CATEGORY_REF);
      this.secondCategory = responseCate2.data.results;
      this.selected2 = this.item.GDS_CATEGORY_CODE;
    } else {
      responseCate2 = await getCategory(this.item.GDS_CATEGORY_CODE);
      this.secondCategory = responseCate2.data.results;
    }
    //const responseCate2 = await getCategory(this.item.CATEGORY_REF);
  },
  methods: {
    async updateGoods() {
      let Category;
      const first = document.getElementById('firstOption');
      const firstCategory = first.options[first.selectedIndex].value;
      const second = document.getElementById('secondOption');
      const secondCategory = second.options[second.selectedIndex].value;
      if (secondCategory == '') {
        Category = firstCategory;
      } else {
        Category = secondCategory;
      }
      const reqData = {
        //v-model로 하면 부모창에서도 값이 바뀌어 버림
        GDS_NUM: document.getElementById('GDS_NUM').value,
        GDS_NAME: document.getElementById('GDS_NAME').value,
        GDS_PRICE: document.getElementById('GDS_PRICE').value,
        GDS_STOCK: document.getElementById('GDS_STOCK').value,
        GDS_DESC: document.getElementById('GDS_DESC').value,
        GDS_CATEGORY_CODE: Category,
      };
      console.log(reqData);

      try {
        // 상품 카테고리도 수정 해야함
        const response = await updateGoods(reqData);
        console.log(response);
        alert('상품 수정완료');
        this.closeModal();
        this.$emit('refresh');
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
          this.closeModal();
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
    closeModal() {
      this.$emit('closeModal');
    },
    getImgSrc() {
      return require('@/assets/upload/' + this.item.GDS_IMG);
    },
  },
};
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 700px;
  height: auto;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.img_scope {
  margin-top: 10px;
}
textarea {
  resize: none;
}
.fa-trash-alt {
  float: right;
}
.fa-edit {
  float: left;
}
</style>
