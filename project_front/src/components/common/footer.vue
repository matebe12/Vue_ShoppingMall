<template>
  <div class="container-fluid bg-primary py-3">
    <div class="container">
      <div class="row">
        <div class="col-md-7">
          <div class="row py-0">
            <div class="col-sm-1 hidden-md-down"></div>
            <div class="col-sm-11 text-white">
              <div>
                <h4>상업목적이 아닌 개발 목적의 웹사이트입니다.</h4>
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

<style scoped>
.header-font {
  font-family: 'Josefin Slab', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: #fd1506;
}
.fa-facebook {
  color: #3b5998;
}
.fa-linkedin {
  color: #0077b5;
}
.fa-twitter {
  color: #4099ff;
}
.fa-google {
  color: #d34836;
}
.bg-primary {
  background-color: #94d2e6;
}

.bg-circle {
  display: inline-block;
  width: 60px;
  height: 60px;
  padding: 14px 4px;
  color: #ececec;
  text-align: center;
  border-radius: 50%;
}

.bg-circle-outline {
  width: 50px;
  height: 50px;
  color: smoke;
  padding: 8px 2px;
  border: 2px solid;
  border-color: smoke;
  border-radius: 50%;
}

.bg-circle a,
a:hover,
.media a:focus {
  text-decoration: none !important;
  outline: none;
  color: #ececec;
}
.bg-circle-outline a,
a:hover,
.media a:focus {
  text-decoration: none !important;
  outline: none;
  color: #ececec;
}
.footer {
  background: #edeff1;
  height: auto;
  padding-bottom: 30px;
  width: 100%;
  border-bottom: 1px solid #cccccc;
  border-top: 1px solid #dddddd;
  position: fixed;
}
.footer p {
  margin: 0;
}
.footer img {
  max-width: 100%;
}
.footer h3 {
  border-bottom: 1px solid #bac1c8;
  color: #54697e;
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  padding: 40px 0 10px;
  text-transform: uppercase;
}
.footer ul {
  font-size: 13px;
  list-style-type: none;
  margin-left: 0;
  padding-left: 0;
  margin-top: 15px;
  color: #7f8c8d;
}
.footer ul li a {
  padding: 0 0 5px 0;
  display: block;
}
.footer a {
  color: #78828d;
}
</style>
