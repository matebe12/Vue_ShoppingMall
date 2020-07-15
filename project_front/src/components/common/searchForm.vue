<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-7 col-lg-offset-2 col-md-10 col-md-offset-1">
        <div class="input-group buscador-principal">
          <input
            name="search_param"
            value="all"
            id="search_param"
            type="hidden"
          />
          <input
            class="form-control"
            name="x"
            id="goodName"
            placeholder="상품입력"
            type="text"
            v-model="goodsName"
          />
          <div class="input-group-btn search-panel">
            <select
              class="form-control x-12"
              style="width:200px"
              v-model="selectCategory"
            >
              <option value="">
                전체
              </option>
              <option
                v-for="(item2, index) in getCategory.smenu"
                :key="index"
                :value="item2.CATEGORY_CODE"
                :selected="item2.CATEGORY_CODE == $route.query.scode"
                >{{ item2.CATEGORY_NAME }}</option
              >
            </select>
          </div>
          <span class="input-group-btn">
            <button class="btn btn-primary" type="button" @click="searchGoods">
              <span class="glyphicon glyphicon-search"></span> 검색
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodsName: '',
      selectCategory: '',
    };
  },
  mounted() {
    document.querySelector('#goodName').scrollIntoView();
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
          if (cate[i].CATEGORY_REF == this.$route.query.fcode)
            smenu.push(cate[i]);
        }
      }
      returnValue.fmenu = fmenu;
      returnValue.smenu = smenu;

      return returnValue;
    },
  },
  methods: {
    searchGoods() {
      console.log('검색 클릭');
      if (this.goodsName == '') {
        alert('검색어를 입력해주세요.');
        return;
      }
      this.$emit('searchGoods', {
        goodsName: this.goodsName,
        selectCategory: this.selectCategory,
      });
    },
  },
};
</script>

<style scoped>
.input-group {
  position: relative;
  display: table;
  border-collapse: separate;
}
.input-group .form-control:not(:first-child):not(:last-child),
.input-group-addon:not(:first-child):not(:last-child),
.input-group-btn:not(:first-child):not(:last-child) {
  border-radius: 0;
}
.buscador-principal .form-control {
  height: 52px;
}
/*BUTTON COLORS OVERIDE
.btn-primary {
    color: #fff;
    background: #0086a1;
    background-image: -webkit-linear-gradient(top, #0086a1, #00738a);
    background-image: -moz-linear-gradient(top, #0086a1, #00738a);
    background-image: -ms-linear-gradient(top, #0086a1, #00738a);
    background-image: -o-linear-gradient(top, #0086a1, #00738a);
    background-image: linear-gradient(to bottom, #0086a1, #00738a);
    border: 1px solid #0085a1;
    border-radius: 3px;
    -webkit-transition: all 0.3s linear;
    -o-transition: all 0.3s linear;
    -moz-transition: all 0.3s linear;
    -ms-transition: all 0.3s linear;
    -kthtml-transition: all 0.3s linear;
    transition: all 0.3s linear;
}*/
.btn {
  font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 1px;
  border-radius: 0;
  padding: 15px 25px;
}
@media only screen and (max-width: 768px) {
  .buscador-principal {
    display: block;
  }
  .buscador-principal button {
    width: 100%;
  }
  .claim-container {
    font-size: 20px;
    display: none;
  }
}
</style>
