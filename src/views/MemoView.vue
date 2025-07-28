<template>
  <Header ref="Header"></Header>

  <main class="memo main-container">
    <div class="loading-container" v-if="!memoOnload"></div>

    <h1 class="">{{ title }}</h1>

    <div>投稿者: {{ $route.params.username }}</div>

    <div v-if="$userData.name === $route.params.username">
      <button class="text-button" @click="edit">編集</button>
    </div>

    <div v-if="errorMessage" class="warn">
      {{ errorMessage }}
    </div>

    <div id="memo" class="memo-view" v-html="memo"></div>
  </main>
</template>

<style>
article {
  max-width: 800px;
  width: 100%;
  margin-top: 20px;
  margin-right: auto;
  margin-left: auto;
}
.memo-view {
  min-height: 80vh;
  width: 100%;
  margin-top: 50px;
  margin-bottom: 50px;
  padding: 20px;
}
img {
  max-width: 100%;
}
</style>

<script>
import Header from "@/components/HeaderComponent.vue";

//import article from "@/assets/article.json";

export default {
  name: "MemoView",
  components: { Header },
  data() {
    return {
      category: "",
      h1Id: null,
      h2Id: null,
      h3Id: null,
      title: "",
      memo: "",
      errorMessage: "",
      memoOnload: false,
    };
  },
  computed: {},
  mounted() {
    console.dir("MemoView - mounted");
    this.load();
  },
  watch: {
    $route() {
      location.reload();
    },
  },
  methods: {
    load() {
      this.$http
        .get("/api/memo/load", {
          params: {
            memoId: this.$route.params.memoId,
            username: this.$route.params.username,
          },

          withCredentials: true,
        })
        .then((res) => {
          console.dir("/api/memo/load @ response");
          console.dir(res.data);
          this.memo = res.data.memo;
          this.title = res.data.memoTitle;
          this.category = res.data.attribute.category;
          const h1Id = res.data.attribute.h1;
          const h2Id = res.data.attribute.h2;
          const h3Id = res.data.attribute.h3;
          this.memoOnload = true;

          this.$refs.Header.setStage(h1Id, h2Id, h3Id);
        })
        .catch((error) => {
          console.dir("/api/memo/load @ error");
          console.dir(error);

          if (error.response) {
            console.dir(error.response.data.errorMessage);
            this.errorMessage = error.response.data.errorMessage;
          } else {
            this.errorMessage = "予期せぬエラーが発生しました";
          }
          this.memoOnload = true;
        });
    },
    edit() {
      const p = this.$route.params;
      this.$router.push({
        name: "edit",
        params: {
          username: this.$userData.name,
          memoId: p.memoId,
        },
      });
    },
  },
};
</script>
