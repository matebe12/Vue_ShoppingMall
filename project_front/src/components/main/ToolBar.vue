<template>
  <div class="top-bar" style="padding-top: 75px;">
    <div class="container">
      <nav class="navbar navbar-icon-top navbar-default navbar-fixed-top">
        <div class="container-fluid">
          <!-- Brand and toggle get grouped for better mobile display -->
          <div class="navbar-header">
            <button
              type="button"
              class="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
              aria-expanded="false"
            >
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <router-link class="navbar-brand" to="/">HOME</router-link>
          </div>
          <!-- Collect the nav links, forms, and other content for toggling -->
          <div
            class="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >
            <ul class="nav navbar-nav">
              <li class="dropdown mega-dropdown">
                <a
                  href="#"
                  class="dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i class="fa fa-shopping-basket"></i>
                  상품 <span class="caret"></span>
                </a>
                <ul class="dropdown-menu mega-dropdown-menu">
                  <li
                    class="col-sm-3"
                    v-for="(item, index) in getCategory.fmenu"
                    :key="index"
                  >
                    <ul>
                      <li
                        class="dropdown-header"
                        v-if="item.CATEGORY_LEVEL == 1"
                      >
                        <router-link
                          :to="
                            `/shop/list/category?fcode=${item.CATEGORY_CODE}`
                          "
                        >
                          {{ item.CATEGORY_NAME }}</router-link
                        >
                      </li>

                      <li
                        v-for="(item2, index) in getCategory.smenu"
                        :key="index"
                      >
                        <router-link
                          :to="
                            `/shop/list/category?fcode=${item.CATEGORY_CODE}&scode=${item2.CATEGORY_CODE}`
                          "
                          v-if="item.CATEGORY_CODE == item2.CATEGORY_REF"
                          >{{ item2.CATEGORY_NAME }}</router-link
                        >
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#">
                  <i class="fa fa-bell">
                    <span class="badge badge-primary">50</span>
                  </i>
                  알림
                </a>
              </li>

              <li></li>
            </ul>
            <form class="navbar-form navbar-left">
              <div class="form-group">
                <input type="text" class="form-control" placeholder="Search" />
              </div>
              <button type="button" class="btn btn-default">검색</button>
            </form>
            <ul class="nav navbar-nav navbar-right">
              <li>
                <router-link to="/cart/list"
                  ><i class="fa fa-shopping-cart">
                    <span class="badge badge-primary">{{
                      this.$store.state.cart.cart != null
                        ? this.$store.state.cart.cart.length
                        : 0
                    }}</span>
                  </i></router-link
                >
              </li>
              <li>
                <router-link to="/login" v-if="!getUser"
                  ><i class="fa fa-user-o"></i>로그인</router-link
                >
                <a v-else @click="logout" href="javascript:void(0);"
                  >로그아웃</a
                >
              </li>
              <li>
                <router-link to="/signup" v-if="!getUser"
                  ><i class="fa fa-lock"></i>회원가입</router-link
                >
              </li>
              <li class="dropdown" v-if="getUser">
                <a
                  href="#"
                  class="dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i class="fa fa-user-circle-o"></i>
                  <span class="caret"></span>
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <router-link v-if="getUser" to="/order/list"
                      >주문 현황</router-link
                    >
                  </li>
                  <li><a href="#">Another action</a></li>
                  <li><a href="#">Something else here</a></li>
                  <li role="separator" class="divider"></li>
                  <li>
                    <router-link
                      v-if="this.$store.state.user.USER_VERIFY == 9"
                      to="/admin"
                      >관리자 페이지</router-link
                    >
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <!-- /.navbar-collapse -->
        </div>
        <!-- /.container-fluid -->
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    getUser() {
      return this.$store.state.user.USER_ID;
    },
    getCategory() {
      let cate = this.$store.state.category.category;
      let fmenu = [];
      let smenu = [];
      let returnValue = {};
      for (let i = 0; i < cate.length; i++) {
        if (cate[i].CATEGORY_LEVEL == 1) {
          fmenu.push(cate[i]);
        } else {
          smenu.push(cate[i]);
        }
      }
      returnValue.fmenu = fmenu;
      returnValue.smenu = smenu;

      return returnValue;
    },
  },
  methods: {
    logout() {
      this.$store.commit('logout');
      if (this.$route.path != '/') {
        this.$router.push('/');
      }
    },
  },
};
</script>

<style scoped>
@import url('//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
.badge-default {
  background-color: #777;
}
.badge-primary {
  background-color: #337ab7;
}
.badge-success {
  background-color: #5cb85c;
}
.badge-info {
  background-color: #5bc0de;
}
.badge-warning {
  background-color: #f0ad4e;
}
.badge-danger {
  background-color: #d9534f;
}

.navbar-icon-top .navbar-nav > li > a > .fa,
.navbar-icon-top .navbar-nav > li > a > .glyphicon {
  position: relative;
  width: 36px;
  font-size: 24px;
}
.navbar-icon-top .navbar-nav > li > a > .fa > .badge,
.navbar-icon-top .navbar-nav > li > a > .glyphicon > .badge {
  position: absolute;
  right: 0;
  font-family: sans-serif;
}
.navbar-icon-top .navbar-nav > li > a > .fa {
  top: 3px;
  line-height: 12px;
}
.navbar-icon-top .navbar-nav > li > a > .fa > .badge {
  top: -10px;
}
.navbar-icon-top .navbar-nav > li > a > .glyphicon {
  top: 6px;
  line-height: 6px;
}
.navbar-icon-top .navbar-nav > li > a > .glyphicon > .badge {
  top: -16px;
}

@media (min-width: 768px) {
  .navbar-icon-top .navbar-brand {
    padding: 25px 15px;
  }
  .navbar-icon-top .navbar-text {
    margin-top: 25px;
    margin-bottom: 25px;
  }
  .navbar-icon-top .navbar-btn,
  .navbar-icon-top .navbar-form {
    margin-top: 18px;
    margin-bottom: 18px;
  }
  .navbar-icon-top .navbar-nav > li > a {
    text-align: center;
    display: table-cell;
    height: 70px;
    vertical-align: middle;
    padding-top: 0;
    padding-bottom: 0;
  }
  .navbar-icon-top .navbar-nav > li > a > .fa,
  .navbar-icon-top .navbar-nav > li > a > .glyphicon {
    display: block;
    width: 48px;
    margin: 2px auto 4px auto;
    top: 0;
    line-height: 24px;
  }
  .navbar-icon-top .navbar-nav > li > a > .fa > .badge,
  .navbar-icon-top .navbar-nav > li > a > .glyphicon > .badge {
    top: -7px;
  }
}
@import url(http://fonts.googleapis.com/css?family=Open+Sans:400, 700);
body {
  font-family: 'Open Sans', 'sans-serif';
}
.mega-dropdown {
  position: static !important;
}
.mega-dropdown-menu {
  padding: 20px 0px;
  width: 100%;
  box-shadow: none;
  -webkit-box-shadow: none;
}
.mega-dropdown-menu > li > ul {
  padding: 0;
  margin: 0;
}
.mega-dropdown-menu > li > ul > li {
  list-style: none;
}
.mega-dropdown-menu > li > ul > li > a {
  display: block;
  color: #222;
  padding: 3px 5px;
}
.mega-dropdown-menu > li ul > li > a:hover,
.mega-dropdown-menu > li ul > li > a:focus {
  text-decoration: none;
}
.mega-dropdown-menu .dropdown-header {
  font-size: 18px;
  color: #000000;
  font: bold;
  padding: 5px 60px 5px 5px;
  line-height: 30px;
}

.carousel-control {
  width: 30px;
  height: 30px;
  top: -35px;
}
.left.carousel-control {
  right: 30px;
  left: inherit;
}
.carousel-control .glyphicon-chevron-left,
.carousel-control .glyphicon-chevron-right {
  font-size: 12px;
  background-color: #fff;
  line-height: 30px;
  text-shadow: none;
  color: #333;
  border: 1px solid #ddd;
}
</style>
