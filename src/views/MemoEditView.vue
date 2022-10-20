<template>
  <UserInfo :rule="$route.params.rule" :stage="$route.params.stage"></UserInfo>

  <div class="edit col-10 col-md-6 mx-auto">
    <h1>{{ title }}</h1>
    <div>投稿者: {{ $route.params.username }}</div>

    <div>{{ errorMessage }}</div>
    <div class="mt-2 mb-5">
      <button @click="end" class="btn btn-secondary">編集終了</button>
    </div>
    <form @submit.prevent="save">
      <textarea
        class="form-control"
        cols="30"
        rows="10"
        v-model="memo"
      ></textarea>
      <div class="mt-3 text-end">
        <input type="submit" class="btn btn-primary" />
      </div>
    </form>
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
  mounted() {
    this.setTitle();
    this.load();
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
    end() {
      const p = this.$route.params;
      this.$router.push({
        name: "memo",
        params: {
          username: p.username,
          rule: p.rule,
          stage: p.stage,
        },
        //path: `/u/${this.$userData.name}/${this.pickRule}/${this.pickStage}`,
      });
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
          this.memo = res.data.memo;
        })
        .catch((error) => {
          console.dir("/api/memo/load @ error");
          console.dir(error);
          console.dir(error.response.data.errorMessage);
          this.errorMessage = error.response.data.errorMessage;
        });
    },
    save() {
      this.$http
        .post("/api/memo/save", {
          rule: this.$route.params.rule,
          stage: this.$route.params.stage,
          memo: this.memo,
        })
        .then((res) => {
          console.dir("/api/memo/save @ response");
          console.dir(res.data);

          alert("投稿しました");
        })
        .catch((error) => {
          console.dir("/api/memo/save @ error");
          console.dir(error);
          console.dir(error.response.data.errorMessage);
          this.errorMessage = error.response.data.errorMessage;
        });
    },
  },
};
</script>
