<template>
  <div class="position-relative min-vh-100" style="padding-bottom: 100px">
    <article class="container">
      <h2 class="h6">
        <router-link to="/" class="text-decoration-none link-dark"
          >みんなの覚書</router-link
        >
      </h2>
      <h2 class="h6">
        <router-link to="/" class="text-decoration-none link-dark"
          >スプラトゥーン3</router-link
        >
      </h2>
      <router-view />
    </article>

    <footer
      class="position-absolute bottom-0 col-12 pt-5 bg-secondary"
      style="height: 140px"
    >
      <div class="container">
        <div class="row">
          <div class="col-5 col-md-3 mb-3">
            <router-link to="/tos" class="link-light">利用規約</router-link>
          </div>

          <div class="col-5 col-md-3 mb-3">
            <router-link to="/privacy" class="link-light"
              >プライバシーポリシー</router-link
            >
          </div>

          <div class="col-5 col-md-3">
            <router-link to="/about" class="link-light"
              >このサイトについて</router-link
            >
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  mounted() {
    this.$http
      .get("/api/test")
      .then(
        function (res) {
          this.$userData.name = res.data.username;
          console.dir("/api/test @ response");
          console.dir(res.data);
        }.bind(this)
      )
      .catch(function (error) {
        console.dir("/api/test @ error");
        console.dir(error);
      });
  },
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
