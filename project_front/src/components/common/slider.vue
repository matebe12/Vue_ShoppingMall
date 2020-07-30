<template>
  <div class="container">
    <div id="myCarousel" class="carousel slide" data-ride="carousel">
      <!-- Wrapper for slides -->
      <div class="carousel-inner">
        <div class="item active">
          <router-link to="" @click.native="replaceUrl()">
            <img
              :src="require('@/assets/images/all.png')"
              style="width:100%; height: 400px"
            />
            <div class="carousel-caption">
              <h3>전체</h3>
            </div>
          </router-link>
        </div>
        <!-- End Item -->

        <div class="item">
          <router-link @click.native="replaceUrl(100)" to="">
            <img
              :src="require('@/assets/images/doll.jpg')"
              style="width:100%; height: 400px"
            />
            <div class="carousel-caption">
              <h3>Headline</h3>
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                invidunt ut labore et dolore magna aliquyam erat, sed diam
                voluptua.
                <a
                  href="http://sevenx.de/demo/bootstrap-carousel/"
                  target="_blank"
                  class="label label-danger"
                  >Bootstrap 3 - Carousel Collection</a
                >
              </p>
            </div>
          </router-link>
        </div>
        <!-- End Item -->

        <div class="item">
          <router-link to="" @click.native="replaceUrl(200)">
            <img
              :src="require('@/assets/images/moongu.jpg')"
              style="width:100%; height: 400px"
            />

            <div class="carousel-caption">
              <h3>Headline</h3>
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                invidunt ut labore et dolore magna aliquyam erat, sed diam
                voluptua.
                <a
                  href="http://sevenx.de/demo/bootstrap-carousel/"
                  target="_blank"
                  class="label label-danger"
                  >Bootstrap 3 - Carousel Collection</a
                >
              </p>
            </div>
          </router-link>
        </div>
        <!-- End Item -->

        <div class="item">
          <router-link @click.native="replaceUrl(300)" to="">
            <img
              :src="require('@/assets/images/com.jpeg')"
              style="width:100%; height: 400px"
            />
            <div class="carousel-caption">
              <h3>Headline</h3>
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                invidunt ut labore et dolore magna aliquyam erat, sed diam
                voluptua.
              </p>
            </div>
          </router-link>
        </div>

        <div class="item">
          <router-link to="" @click.native="replaceUrl(400)">
            <img
              :src="require('@/assets/images/jubang.jpg')"
              style="width:100%; height: 400px"
            />
            <div class="carousel-caption">
              <h3>Headline</h3>
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                invidunt ut labore et dolore magna aliquyam erat, sed diam
                voluptua.
              </p>
            </div>
          </router-link>
        </div>
        <!-- End Item -->
      </div>
      <!-- End Carousel Inner -->

      <ul class="nav nav-pills nav-justified">
        <li data-target="#myCarousel" data-slide-to="0" class="active">
          <a href="#"> 전체 상품<small>쇼핑몰의 전체 상품을 봅니다.</small> </a>
        </li>
        <li data-target="#myCarousel" data-slide-to="1">
          <a href="#"> 인형/토이<small>인형/토이 상품을 봅니다.</small> </a>
        </li>
        <li data-target="#myCarousel" data-slide-to="2">
          <a href="#"> 문구<small>문구 상품을 봅니다.</small> </a>
        </li>
        <li data-target="#myCarousel" data-slide-to="3">
          <a href="#">
            컴퓨터/모바일<small>컴퓨터/모바일 상품을 봅니다.</small>
          </a>
        </li>
        <li data-target="#myCarousel" data-slide-to="4">
          <a href="#"> 주방용품<small>주방용품 상품을 봅니다.</small> </a>
        </li>
      </ul>
    </div>
    <!-- End Carousel -->
  </div>
</template>

<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
<script>
import Validation from '@/util/data/Validation.js';
import 'hooper/dist/hooper.css';

export default {
  mounted() {
    $(document).ready(function() {
      $('#myCarousel').carousel({
        interval: 4000,
      });

      var clickEvent = false;
      $('#myCarousel')
        .on('click', '.nav a', function() {
          clickEvent = true;
          $('.nav li').removeClass('active');
          $(this)
            .parent()
            .addClass('active');
        })
        .on('slid.bs.carousel', function(e) {
          if (!clickEvent) {
            var count = $('.nav').children().length - 1;
            var current = $('.nav li.active');
            current
              .removeClass('active')
              .next()
              .addClass('active');
            var id = parseInt(current.data('slide-to'));
            if (count == id) {
              $('.nav li')
                .first()
                .addClass('active');
            }
          }
          clickEvent = false;
        });
    });
  },
  methods: {
    replaceUrl(fcode, scode) {
      this.$router.replace({
        path: '/shop/list/category',
        query: {
          fcode: !Validation.isNull(fcode) ? '' : fcode,
          scode: !Validation.isNull(scode) ? '' : scode,
          page: 1,
          pageStart: 0,
          perPageNum: 10,
          t: new Date().getTime(),
        },
      });
      this.preUrl = this.$route.path;
    },
  },
};
</script>

<style scoped>
body {
  padding-top: 20px;
}
#myCarousel .nav a small {
  display: block;
}
#myCarousel .nav {
  background: #eee;
}
#myCarousel .nav a {
  border-radius: 0px;
}
</style>
