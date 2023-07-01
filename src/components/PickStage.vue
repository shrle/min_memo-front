<template>
  <div class="pick-stage row mb-5">
    <div class="col-4 col-md-2">
      <select class="form-select" v-model="pickH2" @change="memoExist = true">
        <option v-for="h2 in h2List" :value="h2.id" :key="h2.id">
          {{ h2.name }}
        </option>
      </select>
    </div>
    <div class="col-4 col-md-2">
      <select class="form-select" v-model="pickH3" @change="memoExist = true">
        <option v-for="h3 in h3List" :value="h3.id" :key="h3.id">
          {{ h3.name }}
        </option>
      </select>
    </div>
    <div class="col-3 col-md-2">
      <button @click="changeStage" class="btn btn-secondary">移動</button>
    </div>

    <div v-if="pageJumping" class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>

    <div v-if="!memoExist" class="alert alert-primary p-2 mt-2" role="alert">
      「{{ memoTitle }}」 のメモはありません

      <button
        @click.once="memoCreate"
        class="btn btn-secondary ms-2"
        v-if="$userData.name === $route.params.username"
        v-bind:disabled="pageJumping"
      >
        新規作成
      </button>
    </div>
  </div>
</template>

<script>
import article from "@/assets/article.json";

export default {
  name: "pickH3",
  props: {
    h2: String,
    h3: String,
  },
  mounted() {
    this.h3List = article.category.h2.find((e) => e.id == this.pickH2).h3;
  },
  data() {
    return {
      pickH2: this.h2 ? this.h2 : "nawabari",
      pickH3: this.h3 ? this.h3 : "ama",

      h2List: article.category.h2,
      h3List: [],

      pageJumping: false,

      memoExist: true,
    };
  },
  watch: {
    pickH2() {
      this.h3List = article.category.h2.find((e) => e.id == this.pickH2).h3;
      this.pickH3 = this.h3List[0].id;
    },
  },
  computed: {
    h2Id() {
      return this.h2List.find((e) => e.id == this.pickH2).id;
    },
    h3Id() {
      return this.h3List.find((e) => e.id == this.pickH3).id;
    },
    h2Name() {
      return this.h2List.find((e) => e.id == this.pickH2).name;
    },
    h3Name() {
      return this.h3List.find((e) => e.id == this.pickH3).name;
    },
    memoTitle() {
      return `${this.h2Name} - ${this.h3Name}`;
    },
  },
  methods: {
    async fetchMemoId() {
      // const title = `splatoon3-${this.pickH2}-${this.pickH3}`;
      const title = `Splatoon3 - ${this.memoTitle}`;
      let memoId = null;

      try {
        const res = await this.$http.get("/api/memo/fetch-memoid", {
          params: {
            username: this.$route.params.username,
            memoTitle: title,
          },
          withCredentials: true,
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
      this.pageJumping = true;
      const memoId = await this.fetchMemoId();
      if (!memoId) {
        this.memoExist = false;
        this.pageJumping = false;
        return;
      }

      this.$router.push({
        name: "memo",
        params: {
          username: this.$route.params.username,
          memoId: memoId,
        },
      });

      this.pageJumping = false;
      return;
    },

    memoCreate() {
      this.pageJumping = true;
      const title = `Splatoon3 - ${this.memoTitle}`;
      this.$http
        .post(
          "/api/memo/create",
          {
            username: this.$route.params.username,
            memoTitle: title,
            attribute: {
              category: "spaltoon3",
              h2: this.h2Id,
              h3: this.h3Id,
            },
          },
          {
            withCredentials: true,
          }
        )
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
          this.pageJumping = false;
        })
        .catch((error) => {
          this.pageJumping = false;
          console.dir("/api/memo/create @ error");
          console.dir(error);
          if (error.response) {
            console.dir(error.response.data.errorMessage);
            this.errorMessage = error.response.data.errorMessage;
          } else {
            this.errorMessage = "予期せぬエラーが発生しました";
          }
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
