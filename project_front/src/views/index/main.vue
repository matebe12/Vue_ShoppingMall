<template>
  <div>
    <FeaturedItem />
    <router-view></router-view>
  </div>
</template>

<script>
import FeaturedItem from '@/components/main/FeaturedItem';
export default {
  components: {
    FeaturedItem,
  },
};
</script>

<style></style>
