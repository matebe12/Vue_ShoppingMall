<template>
  <div id="root">
    <section id="container">
      <div class="container_box"></div>
    </section>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style>
ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

div#root {
  width: 90%;
  margin: 0 auto;
}

nav#nav ul li {
  display: inline-block;
  margin-left: 10px;
}

section#container {
  padding: 20px 0;
  border-top: 2px solid #eee;
  border-bottom: 2px solid #eee;
}
section#container::after {
  content: '';
  display: block;
  clear: both;
}
div#container_box {
  float: right;
  width: calc(100% - 200px - 20px);
}

aside ul li {
  text-align: center;
  margin-bottom: 10px;
}
</style>
