<template>
  <div class="footer-container">
    <section class="container-full footer">
      <div class="container grid-xl footer-contents mb-0">
        <div class="columns text-center">
          <div class="column col-12">
            <div class="footer-social my-4">
              <a href="https://github.com/matebe12" target="_blank"
                ><i class="fab fa-github"></i
              ></a>
            </div>
            <p>
              © 2020 All rights reserved. 이 사이트는 개발 포트폴리오 용 사이트
              입니다 상업적인 목적이 아님을 밝힙니다.
            </p>
            <a
              class="text-small"
              href="https://github.com/matebe12/Vue_ShoppingMall"
              target="_blank"
              >Powered by Vue_Project</a
            >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.footer-container {
  margin-top: 15%;
}
.footer {
  position: absolute;
  bottom: 0;

  width: 100%;
  background: #868796;
}
#anglesvg {
  display: block;
}
svg:not(:root) {
  overflow: hidden;
}
.footer .footer-contents {
  padding-top: 80px;
}
.container.grid-xl {
  max-width: 1096px;
}
.container {
  margin-left: auto;
  margin-right: auto;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  width: 100%;
}
.mb-0 {
  margin-bottom: 0 !important;
}
.my-4 {
  margin-bottom: 0.8rem !important;
  margin-top: 0.8rem !important;
}
.footer .footer-contents .footer-social a {
  display: inline-block;
  font-size: 1.5em;
}
.footer a {
  color: #fffffe;
  display: block;
}
.footer a:hover {
  color: #3498db;
  cursor: pointer;
}
.footer .fab:before,
.footer .far:before {
  font-style: normal;
  font-weight: 400;
  speak: none;
  display: inline-block;
  text-decoration: inherit;
  width: 1em;
  margin-right: 0.2em;
  text-align: center;
  font-variant: normal;
  text-transform: none;
  line-height: 1em;
  margin-left: 0.2em;
}
.footer p {
  color: #d7d8e1;
  font-size: 0.8em;
  margin: 15px 0;
}
.text-small {
  font-size: 0.8em;
  font-weight: 800;
}
.text-small:hover {
  text-decoration: none;
}
</style>
