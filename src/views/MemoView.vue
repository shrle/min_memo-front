<template>
  <UserInfo></UserInfo>

  <PickStage v-if="memoOnload" :rule="ruleId" :stage="stageId"></PickStage>
  <div class="memo col-10 col-md-6 mx-auto mb-5">
    <h1 class="h6">{{ title }}</h1>
    <div>投稿者: {{ $route.params.username }}</div>
    <div v-if="$userData.name === $route.params.username">
      <button class="btn btn-secondary mt-3 mb-5" @click="edit">編集</button>
    </div>
    <div style="color: red">{{ errorMessage }}</div>
    <div class="lh-lg" v-html="memo"></div>
  </div>
</template>

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
      ruleId: "",
      stageId: "",
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
          this.ruleId = res.data.attribute.rule;
          this.stageId = res.data.attribute.stage;
          this.memoOnload = true;
        })
        .catch((error) => {
          console.dir("/api/memo/load @ error");
          console.dir(error);
          console.dir(
            error.response.data ? error.response.data.errorMessage : ""
          );
          this.errorMessage = error.response.data
            ? error.response.data.errorMessage
            : "";
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
