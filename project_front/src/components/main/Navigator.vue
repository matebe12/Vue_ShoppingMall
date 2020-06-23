<template>
  <div class="navigation">
    <nav class="navbar navbar-theme">
      <div class="container">
        <!-- Brand and toggle get grouped for better mobile display -->

        <div class="navbar-header">
          <button
            type="button"
            class="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#navbar"
            aria-expanded="false"
          >
            <span class="sr-only">Menu</span>

            <span class="icon-bar"></span>

            <span class="icon-bar"></span>

            <span class="icon-bar"></span>
          </button>
        </div>

        <div class="shop-category nav navbar-nav navbar-right">
          <!-- Single button -->

          <div class="btn-group">
            <button
              type="button"
              class="btn btn-shop-category dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Shop By Category <span class="caret"></span>
            </button>

            <ul class="dropdown-menu">
              <li class="dropdown-submenu">
                <router-link to="/shop/list/category?code=100"
                  >테스트메뉴1</router-link
                >
                <ul class="dropdown-menu">
                  <li>
                    <router-link to="/shop/list/category?code=101">
                      테스트메뉴1-1</router-link
                    >
                  </li>
                  <li>
                    <router-link to="/shop/list/category?code=102">
                      테스트메뉴1-2</router-link
                    >
                  </li>
                  <li>
                    <router-link to="/shop/list/category?code=103">
                      테스트메뉴1-3</router-link
                    >
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->

        <div class="collapse navbar-collapse" id="navbar">
          <ul class="nav navbar-nav navbar-left">
            <li
              v-for="(item, index) in this.$store.state.category.category"
              :key="index"
            >
              <router-link
                v-if="item.CATEGORY_LEVEL == 1"
                :to="`/shop/list/category?code=${item.CATEGORY_CODE}`"
                >{{ item.CATEGORY_NAME }}</router-link
              >
            </li>
          </ul>
        </div>
        <!-- /.navbar-collapse -->
      </div>
      <!-- /.container-fluid -->
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
