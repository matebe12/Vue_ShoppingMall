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

        <div class="shop-category nav navbar-nav navbar-left">
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
                <router-link to="">테스트메뉴1</router-link>
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

              <li><a href="">Women</a></li>

              <li><a href="">Kids</a></li>

              <li role="separator" class="divider"></li>

              <li><a href="">Leather</a></li>

              <li><a href="">Electronics</a></li>
            </ul>
          </div>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->

        <div class="collapse navbar-collapse" id="navbar">
          <ul class="nav navbar-nav navbar-right">
            <li><a href="#">Home</a></li>

            <li><a href="#">Blog</a></li>

            <li><a href="#">Shortcode</a></li>

            <li><a href="#">Features</a></li>

            <li><a href="#">Media</a></li>

            <li><a href="#">About Us</a></li>

            <li><a href="#">Contact Us</a></li>
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
