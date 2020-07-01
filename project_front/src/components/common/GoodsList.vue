<template>
  <div class="content">
    <div class="container">
      <div class="row">
        <div
          class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb40 text-center"
        ></div>
      </div>
      <div class="row">
        <div
          class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12"
          v-for="(goods, index) in getGoods"
          :key="index"
        >
          <!-- team-img -->
          <div class="team-block">
            <div class="team-img">
              <img
                :src="getImgSrc(goods.GDS_IMG).GDS_IMG"
                alt=""
                class="imgDiv"
              />
              <div class="overlay">
                <div class="text"></div>
                <a href="javascript:void(0);">
                  <i class="fa fa-shopping-cart fa-2x"></i
                ></a>
              </div>
            </div>
            <p class="mb30 team-meta">
              <router-link :to="`/shop/view/${goods.GDS_NUM}`">{{
                goods.GDS_NAME
              }}</router-link>
            </p>
            <p style="font-weight:bold">{{ goods.GDS_PRICE }} 원</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    getGoods() {
      return this.$store.state.goods.goods;
    },
  },
  methods: {
    getImgSrc(GDS_IMG) {
      return {
        GDS_IMG: GDS_IMG && require('@/assets/upload/' + GDS_IMG),
      };
    },
  },
};
</script>

<style scoped>
.imgDiv {
  width: 200px;
  height: 200px;
}
body {
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  font-family: 'Lato', sans-serif;
  letter-spacing: 0px;
  font-size: 16px;
  font-weight: 400;
  line-height: 28px;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 300;
  color: #11181f;
  margin: 0px 0px 15px 0px;
  font-family: 'Lato', sans-serif;
}
h1 {
  font-size: 44px;
}
h2 {
  font-size: 38px;
}
h3 {
  font-size: 24px;
  font-weight: 400;
}
h4 {
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
}
h5 {
  font-size: 16px;
  font-weight: 400;
}
h6 {
  font-size: 12px;
  font-weight: 400;
}
p {
  margin: 0 0 20px;
  line-height: 1.7;
}
p:last-child {
  margin: 0px;
}
ul,
ol {
}
a {
  text-decoration: none;
  color: #131212;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
}
a:focus,
a:hover {
  text-decoration: none;
  color: #f67800;
}

.mb40 {
  margin-bottom: 40px;
}
.team-block {
  margin-bottom: 20px;
  width: 200px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.team-content {
  position: absolute;
  background-color: rgba(17, 24, 31, 0.8);
  bottom: 0px;
  display: inline-block;
  width: 200px;
  color: #fff;
  padding: 30px;
}
.team-img {
  position: relative;
}
.team-img img {
  width: 200px;
}
.team-title {
}
.team-meta {
  color: #9da4aa;
  font-weight: 400;
  font-size: 16px;
}
.overlay {
  border-radius: 0px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20%;
  width: 200px;
  opacity: 0;
  transition: 1s ease;
  background-color: #000000;
}
.team-img:hover .overlay {
  opacity: 0.8;
}
.team-img:hover .team-content {
  opacity: 0;
}
.text {
  color: #fff;
  position: absolute;
  top: 30%;
  left: 30%;
  transform: translate(-26%, -26%);
  -ms-transform: translate(-26%, -26%);
  right: 0;
  font-weight: 400;
  font-size: 16px;
  display: -webkit-inline-box;
}
.fa-shopping-cart {
  color: white;
  float: unset;
  padding: 5px;
}
</style>
