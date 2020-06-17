<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3 col-sm-4">
        <div class="logo">
          <a href="index.html">
            <img src="@/assets/images/logo.png" alt="Orani E-shop" />
          </a>
        </div>
      </div>

      <div class="col-md-7 col-sm-5">
        <div class="search-form">
          <form class="navbar-form" role="search">
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                placeholder="What do you need..."
              />
            </div>

            <button type="submit" class="btn">
              <i class="fa fa-search"></i>
            </button>
          </form>
        </div>
      </div>

      <div class="col-md-2 col-sm-3">
        <div class="cart">
          <div class="cart-icon">
            <a href=""><i class="fa fa-shopping-cart"></i></a>
          </div>

          <div class="cart-text">
            SHOPPING CART

            <br />

            0 items - $0.00
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
