<template>
  <div>
    <h1>Hello</h1>
    <button @click="testApi1">테스트 호출</button>
    <div>
      <ul v-for="item in items" :key="item.id">
        <li>{{ item.id }}</li>
        <li>{{ item.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    };
  },
  methods: {
    testApi1() {
      this.$http.get('/api/test').then(response => {
        console.log('response', response);
        this.items = response.data;
      });
    },
  },
};
</script>

<style></style>
