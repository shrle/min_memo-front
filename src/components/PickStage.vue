<template>
  <div class="pick-stage row mb-5">
    <div class="col-2">
      <select class="form-select" v-model="pickRule">
        <option v-for="rule in rules" :value="rule.id" :key="rule.id">
          {{ rule.name }}
        </option>
      </select>
    </div>
    <div class="col-2">
      <select class="form-select" v-model="pickStage">
        <option v-for="stage in stages" :value="stage.id" :key="stage.id">
          {{ stage.name }}
        </option>
      </select>
    </div>
    <div class="col-1">
      <button @click="changeStage" class="btn btn-secondary">移動</button>
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
    };
  },
  methods: {
    changeStage() {
      this.$router.push({
        name: "memo",
        params: {
          username: this.$userData.name,
          rule: this.pickRule,
          stage: this.pickStage,
        },
        //path: `/u/${this.$userData.name}/${this.pickRule}/${this.pickStage}`,
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
