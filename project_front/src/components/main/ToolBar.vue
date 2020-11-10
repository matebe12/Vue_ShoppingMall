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
            <ul class="nav navbar-nav navbar-right">
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
                          to=""
                          @click.native="replaceUrl(item.CATEGORY_CODE)"
                        >
                          {{ item.CATEGORY_NAME }}</router-link
                        >
                      </li>

                      <li
                        v-for="(item2, index) in getCategory.smenu"
                        :key="index"
                      >
                        <router-link
                          to=""
                          @click.native="
                            replaceUrl(item.CATEGORY_CODE, item2.CATEGORY_CODE)
                          "
                          v-if="item.CATEGORY_CODE == item2.CATEGORY_REF"
                          >{{ item2.CATEGORY_NAME }}</router-link
                        >
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
              <li>
                <form
                  class="navbar-form"
                  role="search"
                  @submit.prevent="searchGoods"
                >
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="검색"
                      name="q"
                      v-model="searchName"
                    />
                    <div class="input-group-btn">
                      <button class="btn btn-default" type="submit">
                        <i class="glyphicon glyphicon-search"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </li>
              <li>
                <router-link to="/cart/list" @click.native="replace"
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
                <a
                  v-if="!getUser"
                  onclick="javascript:void(0);"
                  @click="login()"
                  ><i class="fa fa-user-o"></i>관리자 체험하기</a
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
                <ul class="dropdown-menu" v-if="getUser">
                  <li>
                    <router-link
                      to="/order/list?status=0&page=1&pageStart=0&perPageNum=10&gdsName="
                      @click.native="replaceOrder()"
                      >주문 현황</router-link
                    >
                  </li>
                  <li>
                    <router-link to="" @click.native="openModal"
                      >내 정보</router-link
                    >
                  </li>
                  <li>
                    <router-link
                      to=""
                      @click.native="deleteUser"
                      v-if="
                        $store.state.user.ISSNS != 'kakao' &&
                          this.$store.state.user.USER_VERIFY != 9
                      "
                      >회원 탈퇴</router-link
                    >
                  </li>
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
    <UserInfoModal
      v-if="$store.state.isModal"
      @closeModal="openModal"
      @refresh="refresh"
    >
    </UserInfoModal>
  </div>
</template>

<script>
import Validation from '@/util/data/Validation.js';
import UserInfoModal from '@/components/common/UserInfoModal.vue';
import { deleteUser } from '@/api/User.js';
export default {
  components: {
    UserInfoModal,
  },
  data() {
    return {
      searchName: '',
    };
  },
  computed: {
    getUrl() {
      return this.$store.state.url;
    },
    getUser() {
      return this.$store.state.user.USER_ID;
    },
    getCategory() {
      let cate = this.$store.state.category.category;
      let fmenu = [];
      let smenu = [];
      let returnValue = {};
      fmenu = cate.filter(x => x.CATEGORY_LEVEL == 1);
      smenu = cate.filter(x => x.CATEGORY_LEVEL == 2);
      // for (let i = 0; i < cate.length; i++) {
      //   if (cate[i].CATEGORY_LEVEL == 1) {
      //     fmenu.push(cate[i]);
      //   } else {
      //     smenu.push(cate[i]);
      //   }
      // }
      returnValue.fmenu = fmenu;
      returnValue.smenu = smenu;

      return returnValue;
    },
    isModal() {
      return this.isModal;
    },
  },

  methods: {
    login() {
      const reqData = {
        USER_ID: 'matebe12',
        USER_PW: '1234',
      };
      this.$http
        .post(this.getUrl + 'api/user/login', reqData)
        .then(async response => {
          if (
            !response.data.resultData.isMatchedPw ||
            !response.data.resultData.searchUser
          ) {
            alert('아이디 및 비밀번호가 틀립니다.');
          } else {
            alert('로그인 되었습니다.');
            this.$store.commit('login', response.data);
            this.$router.push({ path: '/admin' });
          }
        })
        .catch(error => {
          alert(error.response.data);
        });
    },
    searchGoods() {
      this.$router.push({
        query: {
          fcode: '',
          scode: '',
          page: 1,
          pageStart: (1 - 1) * 9,
          perPageNum: 9,
          gdsName: this.searchName,
          order: 'newItem',
          t: new Date().getTime(),
        },
      });
    },
    logout() {
      this.$store.commit('logout');
      //eslint-disable-next-line
      this.$router.push({ path: '/' }).catch(error => {});
    },
    openModal() {
      this.$store.state.isModal = !this.$store.state.isModal;
    },
    refresh() {
      this.logout();
    },
    async deleteUser() {
      const result = confirm('회원 탈퇴 하시겠습니까?');
      if (result) {
        try {
          let reqData = { ITEM: [{ USER_ID: this.$store.state.user.USER_ID }] };
          await deleteUser(reqData);
          alert('회원 탈퇴 됐습니다.');
          this.logout();
        } catch (error) {
          alert(error);
        }
      }
    },
    replace() {
      this.$router.replace({
        path: '/cart/list',
        query: {
          t: new Date().getTime(),
        },
      });
    },
    replaceOrder(status) {
      this.$router.replace({
        path: '/order/list',
        query: {
          status: !Validation.isNull(status) ? '' : status,
          page: 1,
          pageStart: 0,
          perPageNum: 10,
          gdsName: '',
          t: new Date().getTime(),
        },
      });
    },
    replaceUrl(fcode, scode) {
      this.$router.replace({
        path: '/shop/list/category',
        query: {
          fcode: !Validation.isNull(fcode) ? '' : fcode,
          scode: !Validation.isNull(scode) ? '' : scode,
          page: 1,
          pageStart: 0,
          perPageNum: 9,
          t: new Date().getTime(),
        },
      });
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
