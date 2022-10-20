<template>
  <div class="container">
    <h2 class="h6">みんなの覚書</h2>
    <h2 class="h6">スプラトゥーン3</h2>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  mounted() {},
  data() {
    return {
      todos: [],
    };
  },
  methods: {},
};
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
}
</style>
