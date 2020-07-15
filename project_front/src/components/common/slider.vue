<template>
  <div class="accordian">
    <ul>
      <!-- <li>
        <div class="image_title">
          <router-link
            to="https://www.youtube.com/channel/UCXTfDJ60DBmA932Du6B1ydg"
            >KungFu Panda</router-link
          >
        </div>
        <router-link to="http://localhost:8080/shop/list/category?fcode=100">
          <img src="http://thecodeplayer.com/uploads/media/3yiC6Yq.jpg" />
        </router-link>
      </li> -->
      <li>
        <div class="image_title">
          <router-link to="/shop/list/category?fcode=100"
            >인형/토이</router-link
          >
        </div>
        <router-link to="/shop/list/category?fcode=100">
          <img src="http://thecodeplayer.com/uploads/media/40Ly3VB.jpg" />
        </router-link>
      </li>
      <li>
        <div class="image_title">
          <router-link to="/shop/list/category?fcode=200">문구</router-link>
        </div>
        <router-link to="/shop/list/category?fcode=200">
          <img src="http://thecodeplayer.com/uploads/media/00kih8g.jpg" />
        </router-link>
      </li>
      <li>
        <div class="image_title">
          <router-link to="/shop/list/category?fcode=300"
            >컴퓨터/모바일</router-link
          >
        </div>
        <router-link to="/shop/list/category?fcode=300">
          <img src="http://thecodeplayer.com/uploads/media/2rT2vdx.jpg" />
        </router-link>
      </li>
      <li>
        <div class="image_title">
          <router-link to="/shop/list/category?fcode=400">주방용품</router-link>
        </div>
        <router-link to="/shop/list/category?fcode=400">
          <img src="http://thecodeplayer.com/uploads/media/8k3N3EL.jpg" />
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
body {
  background: #ccc;
  font-family: arial, verdana, tahoma;
}

/*Time to apply widths for accordian to work
Width of image = 640px
total images = 5
so width of hovered image = 640px
width of un-hovered image = 40px - you can set this to anything
so total container width = 640 + 40*4 = 800px;
default width = 800/5 = 160px;
*/

.accordian {
  width: 805px;
  height: 320px;
  overflow: hidden;

  /*Time for some styling*/
  margin: 100px auto;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.35);
  -webkit-box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.35);
  -moz-box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.35);
}

/*A small hack to prevent flickering on some browsers*/
.accordian ul {
  width: 1200px;
  /*This will give ample space to the last item to move
	instead of falling down/flickering during hovers.*/
}

.accordian li {
  position: relative;
  display: block;
  width: 160px;
  float: left;

  border-left: 1px solid #888;

  box-shadow: 0 0 25px 10px rgba(0, 0, 0, 0.5);
  -webkit-box-shadow: 0 0 25px 10px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0 0 25px 10px rgba(0, 0, 0, 0.5);

  /*Transitions to give animation effect*/
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  /*If you hover on the images now you should be able to 
	see the basic accordian*/
}

/*Reduce with of un-hovered elements*/
.accordian ul:hover li {
  width: 40px;
}
/*Lets apply hover effects now*/
/*The LI hover style should override the UL hover style*/
.accordian ul li:hover {
  width: 640px;
}

.accordian li img {
  display: block;
}

/*Image title styles*/
.image_title {
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  left: 0;
  bottom: 0;
  width: 640px;
}
.image_title a {
  display: block;
  color: #fff;
  text-decoration: none;
  padding: 20px;
  font-size: 16px;
}
</style>
