<template>
  <Header ref="Header"></Header>
  <main class="memo">
    <div class="page-container">
      <h1 class="h6">{{ memoTitle }}</h1>
      <div class="local-mode">ローカルモード</div>
      <p>
        <button class="text-button" @click="edit">編集</button>
      </p>
    </div>

    <div id="memo" v-html="memo" class="memo-view"></div>
  </main>

  <div
    class="warn"
    :class="{ 'show-warn': errorMessage }"
    @click="errorMessage = ''"
  >
    {{ errorMessage }}
  </div>
</template>

<style lang="scss" scoped>
img {
  max-width: 100%;
}

.local-mode {
  width: 100%;
  height: 30px;
  text-align: center;
  background-color: #b3ffb3;
  color: #000;
  font-weight: bolder;
  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 20px;
}
</style>

<script>
import Header from "@/components/HeaderComponent.vue";
import article from "@/assets/article.json";

export default {
  name: "LocalMemoView",
  components: { Header },
  data() {
    return {
      h1List: article.category.h1,
      h2List: [],
      h3List: [],

      memo: "",
      errorMessage: "",
    };
  },
  beforeMount() {
    const p = this.$route.params;
    this.h2List = this.h1List.find((e) => e.id == p.h1Id).h2;
    this.h3List = this.h2List.find((e) => e.id == p.h2Id).h3;
  },
  mounted() {
    this.load();
    const p = this.$route.params;
    this.$refs.Header.setStage(p.h1Id, p.h2Id, p.h3Id);
  },
  computed: {
    h1Name() {
      const p = this.$route.params;
      return this.h1List.find((e) => e.id == p.h1Id).name;
    },
    h2Name() {
      const p = this.$route.params;
      return this.h2List.find((e) => e.id == p.h2Id).name;
    },
    h3Name() {
      const p = this.$route.params;
      return this.h3List.find((e) => e.id == p.h3Id).name;
    },
    memoTitle() {
      return `${this.h1Name} - ${this.h2Name} - ${this.h3Name}`;
    },
  },

  watch: {
    $route() {
      location.reload();
    },
  },
  methods: {
    load() {
      const p = this.$route.params;
      const memoid = `${p.h1Id}-${p.h2Id}-${p.h3Id}`;
      const memo = localStorage.getItem(memoid);

      this.memo = memo ? memo : "";
    },

    edit() {
      const p = this.$route.params;
      this.$router.push({
        name: "local-edit",
        params: {
          h1Id: p.h1Id,
          h2Id: p.h2Id,
          h3Id: p.h3Id,
        },
      });
    },
  },
};
</script>
