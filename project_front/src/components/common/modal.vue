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
            <form
              method="post"
              ref="form"
              autocomplete="off"
              enctype="application/x-www-form-urlencoded"
            >
              <div>
                <div class="col-xs-3">
                  <label>1차 분류</label>
                  <select
                    class="category1 form-control"
                    v-model="selected"
                    @change="SelectSecond"
                    id="firstOption"
                    name="category1"
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
                    name="category2"
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
                    name="GDS_NUM"
                  />
                </div>
                <div class="col-xs-3">
                  <label for="GDS_NAME">GDS_NAME</label>
                  <input
                    type="text"
                    id="GDS_NAME"
                    :value="item.GDS_NAME"
                    class="form-control"
                    name="GDS_NAME"
                  />
                </div>
                <div class="col-xs-3">
                  <label for="GDS_PRICE">GDS_PRICE</label>
                  <input
                    type="text"
                    id="GDS_PRICE"
                    :value="item.GDS_PRICE"
                    class="form-control"
                    name="GDS_PRICE"
                  />
                </div>
                <div class="col-xs-3">
                  <label for="GDS_STOCK">GDS_STOCK</label>
                  <input
                    type="text"
                    id="GDS_STOCK"
                    :value="item.GDS_STOCK"
                    class="form-control"
                    name="GDS_STOCK"
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
                    name="GDS_DATE"
                  />
                </div>
                <div class="col-xs-3 img_scope">
                  <img
                    :src="`${getUrl}${item.GDS_IMG}`"
                    ref="image"
                    width="130px;"
                    height="80px;"
                  />
                  <input
                    type="file"
                    ref="files2"
                    name="sampleFile"
                    id="file"
                    @change="previewImg"
                  />
                </div>
                <label for="GDS_DESC">GDS_DESC</label>
                <ckeditor
                  :value="item.GDS_DESC"
                  id="GDS_DESC"
                  name="GDS_DESC"
                  v-model="item.GDS_DESC"
                ></ckeditor>

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
            </form>
          </div>
          <!-- 푸터 -->
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { updateGoods, deleteGoods, getCategory } from '@/api/Goods.js';
import CKEditor from 'ckeditor4-vue';
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
  components: {
    ckeditor: CKEditor.component,
  },
  computed: {
    getUrl() {
      return this.$store.state.url;
    },
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
      try {
        // 상품 카테고리도 수정 해야함
        const form = this.$refs.form;
        const formData = new FormData(form);
        if (formData.get('category2') === '') {
          formData.append('GDS_CATEGORY_CODE', this.selected);
        } else {
          formData.append('GDS_CATEGORY_CODE', this.selected2);
        }
        formData.append('GDS_DESC', this.item.GDS_DESC);
        await updateGoods(formData);
        alert('상품 수정완료');
        this.closeModal();
        this.$emit('refresh');
      } catch (error) {
        alert(error);
      }
    },
    async deleteGoods() {
      try {
        const selectEvent = confirm('상품을 삭제 하시겠습니까? ');
        if (selectEvent) {
          const reqData = {
            GDS_NUM: this.item.GDS_NUM,
          };
          await deleteGoods(reqData);
          alert('상품이 삭제 되었습니다.');
          this.closeModal();
          this.$emit('refresh');
        }
      } catch (error) {
        alert(error);
      }
    },
    async SelectSecond() {
      try {
        const select = document.getElementById('firstOption');
        const reqData = select.options[select.selectedIndex].value;
        const response = await getCategory(reqData);
        this.secondCategory = response.data.results;
      } catch (error) {
        alert(error);
      }
    },
    closeModal() {
      this.$emit('closeModal');
    },
    previewImg(e) {
      const file = e.target.files[0]; // Get first index in files
      this.$refs.image.src = URL.createObjectURL(file); // Create File URL
    },
  },
};
</script>

<style scoped>
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
