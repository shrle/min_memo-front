<template>
  <UserInfo></UserInfo>

  <PickStage v-if="memoOnload" :h2="h2Id" :h3="h3Id"></PickStage>
  <div class="memo col-10 col-md-10 col-xl-6 mx-auto mb-5">
    <h1 class="h6">{{ title }}</h1>
    <div>投稿者: {{ $route.params.username }}</div>
    <div v-if="$userData.name === $route.params.username">
      <button class="btn btn-secondary mt-3 mb-5" @click="edit">編集</button>
    </div>
    <div v-if="errorMessage" class="alert alert-warning" role="alert">
      {{ errorMessage }}
    </div>

    <div v-if="!memoOnload" class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>

    <div id="memo" class="lh-lg mb-5" v-html="memo"></div>
  </div>
</template>

<style>
img {
  max-width: 100%;
}
</style>

<script>
import UserInfo from "@/components/UserInfo.vue";

import PickStage from "@/components/PickStage.vue";
//import article from "@/assets/article.json";

export default {
  name: "MemoView",
  components: { UserInfo, PickStage },
  data() {
    return {
      category: "",
      h2Id: "",
      h3Id: "",
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
          this.h2Id = res.data.attribute.h2;
          this.h3Id = res.data.attribute.h3;
          this.memoOnload = true;
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
