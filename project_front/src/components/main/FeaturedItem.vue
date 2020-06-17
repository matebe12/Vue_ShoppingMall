<template>
  <div class="featured-items">
    <div class="container">
      <div class="row">
        <ul class="nav nav-tabs nav-product-tabs">
          <li class="active">
            <a href="#trending" data-toggle="tab">Trending Items</a>
          </li>

          <li><a href="#best-seller" data-toggle="tab">Best Seller</a></li>

          <li class="pull-right collection-url">
            <a href="">View All <i class="fa fa-long-arrow-right"></i></a>
          </li>
        </ul>

        <div class="tab-content">
          <div class="tab-pane active" id="trending">
            <div class="col-md-3 col-sm-4">
              <div class="single-product">
                <div class="product-block">
                  <img
                    src="@/assets/images/product-1.jpg"
                    alt=""
                    class="thumbnail"
                  />

                  <div class="product-description text-center">
                    <p class="title">상품이름</p>

                    <p class="price">가격</p>
                  </div>

                  <div class="product-hover">
                    <ul>
                      <li>
                        <a href="single-product.html"
                          ><i class="fa fa-cart-arrow-down"></i
                        ></a>
                      </li>

                      <li>
                        <a href=""><i class="fa fa-arrows-h"></i></a>
                      </li>

                      <li>
                        <a href=""><i class="fa fa-heart-o"></i></a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-3 col-sm-4">
              <div class="single-product">
                <div class="product-block">
                  <img src="images/product-2.jpg" alt="" class="thumbnail" />

                  <div class="product-description text-center">
                    <p class="title">상품이름</p>

                    <p class="price">가격</p>
                  </div>

                  <div class="product-hover">
                    <ul>
                      <li>
                        <a href="single-product.html"
                          ><i class="fa fa-cart-arrow-down"></i
                        ></a>
                      </li>

                      <li>
                        <a href=""><i class="fa fa-arrows-h"></i></a>
                      </li>

                      <li>
                        <a href=""><i class="fa fa-heart-o"></i></a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
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
