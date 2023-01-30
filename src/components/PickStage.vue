<template>
  <div class="pick-stage row mb-5">
    <div class="col-4 col-md-2">
      <select class="form-select" v-model="pickRule" @change="memoExist = true">
        <option v-for="rule in rules" :value="rule.id" :key="rule.id">
          {{ rule.name }}
        </option>
      </select>
    </div>
    <div class="col-4 col-md-2">
      <select
        class="form-select"
        v-model="pickStage"
        @change="memoExist = true"
      >
        <option v-for="stage in stages" :value="stage.id" :key="stage.id">
          {{ stage.name }}
        </option>
      </select>
    </div>
    <div class="col-3 col-md-2">
      <button @click="changeStage" class="btn btn-secondary">移動</button>
    </div>
    <div v-if="!memoExist" class="alert alert-primary p-2 mt-2" role="alert">
      「{{ memoTitle }}」 のメモはありません

      <button
        @click.once="memoCreate"
        class="btn btn-secondary ms-2"
        v-if="$userData.name === $route.params.username"
      >
        新規作成
      </button>
    </div>
  </div>
</template>

<script>
import article from "@/assets/article.json";

export default {
  name: "PickStage",
  props: {
    rule: String,
    stage: String,
  },
  mounted() {},
  data() {
    return {
      pickRule: this.rule ? this.rule : "nawabari",
      pickStage: this.stage ? this.stage : "ama",

      rules: article.battle.rules,
      stages: article.battle.stages,
      articleLinks: {},

      memoExist: true,
    };
  },
  computed: {
    memoTitle() {
      const ruleName = this.rules.find((e) => e.id == this.pickRule).name;
      const stageName = this.stages.find((e) => e.id == this.pickStage).name;
      return `${ruleName} - ${stageName}`;
    },
  },
  methods: {
    async fetchMemoId() {
      // const title = `splatoon3-${this.pickRule}-${this.pickStage}`;
      const title = `Splatoon3 - ${this.memoTitle}`;
      let memoId = null;

      try {
        const res = await this.$http.get("/api/memo/fetch-memoid", {
          params: {
            memoTitle: title,
          },
        });

        memoId = res.data.memoId;
        console.dir("/api/memo/fetch-memoid @ response");
        console.dir(res.data);
      } catch (error) {
        console.dir("/api/memo/fetch-memoid @ error");
        console.dir(error);
      }

      return memoId;
    },
    async changeStage() {
      const memoId = await this.fetchMemoId();
      if (!memoId) {
        this.memoExist = false;
        return;
      }

      this.$router.push({
        name: "memo",
        params: {
          username: this.$userData.name,
          memoId: memoId,
        },
      });
      /*
      this.$router.push({
        name: "memo",
        params: {
          username: this.$userData.name,
          rule: this.pickRule,
          stage: this.pickStage,
        },
      });
        */
      //path: `/u/${this.$userData.name}/${this.pickRule}/${this.pickStage}`,
      return;
    },

    memoCreate() {
      const title = `Splatoon3 - ${this.memoTitle}`;
      this.$http
        .post("/api/memo/create", {
          memoTitle: title,
        })
        .then((res) => {
          console.dir("/api/memo/create @ response");
          console.dir(res.data);

          this.$router.push({
            name: "memo",
            params: {
              username: this.$userData.name,
              memoId: res.data.memoId,
            },
          });
        })
        .catch((error) => {
          console.dir("/api/memo/create @ error");
          console.dir(error);
          console.dir(error.response.data.errorMessage);
          this.errorMessage = error.response.data.errorMessage;
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
