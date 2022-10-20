<template>
  <UserInfo :rule="$route.params.rule" :stage="$route.params.stage"></UserInfo>

  <div class="memo col-10 col-md-6 mx-auto">
    <h1>{{ title }}</h1>
    <div>投稿者: {{ $route.params.username }}</div>
    <div v-if="$userData.name === $route.params.username">
      <button class="btn btn-secondary mt-3 mb-5" @click="edit">編集</button>
    </div>
    <div style="color: red">{{ errorMessage }}</div>
    <div class="lh-lg" v-html="memoHtml"></div>
  </div>
</template>

<script>
import UserInfo from "@/components/UserInfo.vue";
import article from "@/assets/article.json";

export default {
  name: "UserMemo",
  components: { UserInfo },
  data() {
    return {
      title: "",
      memo: "",
      errorMessage: "",
    };
  },
  computed: {
    memoHtml() {
      return this.memo.replace("\n", "<br>");
    },
  },
  mounted() {
    console.dir("MemoView - mounted");
    this.setTitle();
    this.load();
  },
  watch: {
    $route() {
      location.reload();
    },
  },
  methods: {
    setTitle() {
      const rules = article.battle.rules;
      const stages = article.battle.stages;

      const rule = rules.find((rule) => rule.id === this.$route.params.rule);
      const stage = stages.find(
        (stage) => stage.id === this.$route.params.stage
      );

      this.title = `${rule.name}-${stage.name}`;
    },
    escapeHtml(string) {
      if (typeof string !== "string") {
        return string;
      }
      return string.replace(/['`"<>]/g, (match) => {
        return {
          "'": "&#x27;",
          "`": "&#x60;",
          '"': "&quot;",
          "<": "&lt;",
          ">": "&gt;",
        }[match];
      });
    },
    insertUserTag(string) {
      if (typeof string !== "string") {
        return string;
      }
      string = string.replace(/\ns&gt;(.*)\n/g, "<strong>$1</strong>");
      return string.replace(/\nh&gt;(.*)\n/g, "<h3>$1</h3>");
    },
    insertBrTag(string) {
      if (typeof string !== "string") {
        return string;
      }
      return string.replaceAll("\n", "<br>");
    },
    insertTag(memo) {
      memo = "\n" + memo;
      memo = this.escapeHtml(memo);
      memo = this.insertUserTag(memo);
      memo = this.insertBrTag(memo);
      console.dir(memo);
      return memo;
    },
    load() {
      this.$http
        .get("/api/memo/load", {
          params: {
            rule: this.$route.params.rule,
            stage: this.$route.params.stage,
            username: this.$route.params.username,
          },
        })
        .then((res) => {
          console.dir("/api/memo/load @ response");
          console.dir(res.data);
          this.memo = this.insertTag(res.data.memo);
        })
        .catch((error) => {
          console.dir("/api/memo/load @ error");
          console.dir(error);
          console.dir(error.response.data.errorMessage);
          this.errorMessage = error.response.data.errorMessage;
        });
    },
    edit() {
      const p = this.$route.params;
      this.$router.push({ path: `/u/${p.username}/${p.rule}/${p.stage}/edit` });
    },
  },
};
</script>
