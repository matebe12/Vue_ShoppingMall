<template>
  <div class="banner">
    <div class="container">
      <div class="row">
        <div class="single-banner">
          <div class="banner-caption">
            <img :src="getImgUrl().MENU_IMG" alt="" class="BannerImg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    getImgUrl() {
      const banner = this.$route.query.fcode;
      let src = '';
      switch (banner) {
        case '100':
          src = 'doll.png';
          break;
        case '200':
          src = 'dogu.png';
          break;
        case '300':
          src = 'com.png';
          break;
        case '400':
          src = 'jubang.png';
          break;
      }
      console.log(src);
      return {
        MENU_IMG: src && require('@/assets/images/' + src),
      };
    },
  },
};
</script>

<style soped>
@media (min-width: 950px) {
  .container {
    width: 850px;
  }
  .BannerImg {
    width: 850px;
  }
}
@media (max-width: 949px) {
  .container {
    width: 750px;
  }
  .BannerImg {
    width: 750px;
  }
}
</style>
