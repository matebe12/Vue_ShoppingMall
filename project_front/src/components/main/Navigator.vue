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
                :to="`/shop/list/category?code=${item.CATEGORY_CODE}&page=1`"
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
