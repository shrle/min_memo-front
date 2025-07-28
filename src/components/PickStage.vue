<template>
  <div class="pick-stage">
    <div class="loading-container" v-if="pageJumping"></div>
    <div class="select-container">
      <select class="form-select" v-model="pickH1" @change="changeH1">
        <option v-for="h1 in h1List" :value="h1.id" :key="h1.id">
          {{ h1.name }}
        </option>
      </select>

      <select class="form-select" v-model="pickH2" @change="changeH2">
        <option v-for="h2 in h2List" :value="h2.id" :key="h2.id">
          {{ h2.name }}
        </option>
      </select>

      <select class="form-select" v-model="pickH3" @change="memoExist = true">
        <option v-for="h3 in h3List" :value="h3.id" :key="h3.id">
          {{ h3.name }}
        </option>
      </select>
    </div>

    <button class="icon-button edit-button" @click="changeStage">
      <span class="material-symbols-outlined"> edit </span>
    </button>
  </div>
</template>

<script>
import article from "@/assets/article.json";

export default {
  name: "pickStage",

  mounted() {
    console.dir("this.pickH1");
    console.dir(this.pickH1);
    this.h2List = article.category.h1.find((e) => e.id == this.pickH1).h2;
    this.pickH2 = this.h2List[0].id;
    this.h3List = this.h2List.find((e) => e.id == this.pickH2).h3;
    this.pickH3 = this.h3List[0].id;
  },
  data() {
    return {
      pickH1: "Splatoon3",
      pickH2: "nawabari",
      pickH3: "ama",

      h1List: article.category.h1,
      h2List: [],
      h3List: [],

      pageJumping: false,

      memoExist: true,
    };
  },
  watch: {
    // h1Id(newId) {
    //   this.pickH1 = newId;
    // },
    // h2Id(newId) {
    //   this.pickH2 = newId;
    // },
    // h3Id(newId) {
    //   this.pickH3 = newId;
    // },
  },
  computed: {
    /*
    h1Id() {
      return this.h1List.find((e) => e.id == this.pickH1).id;
    },
    h2Id() {
      return this.h2List.find((e) => e.id == this.pickH2).id;
    },
    h3Id() {
      return this.h3List.find((e) => e.id == this.pickH3).id;
    },
    */
    h1Name() {
      return this.h1List.find((e) => e.id == this.pickH1).name;
    },
    h2Name() {
      return this.h2List.find((e) => e.id == this.pickH2).name;
    },
    h3Name() {
      return this.h3List.find((e) => e.id == this.pickH3).name;
    },
    memoTitle() {
      return `${this.h1Name} - ${this.h2Name} - ${this.h3Name}`;
    },
  },
  methods: {
    setStage(h1Id, h2Id, h3Id) {
      console.dir("setStage");
      console.dir({ h1Id, h2Id, h3Id });
      this.pickH1 = h1Id;
      this.pickH2 = h2Id;
      this.pickH3 = h3Id;

      this.h2List = article.category.h1.find((e) => e.id == this.pickH1).h2;
      this.h3List = this.h2List.find((e) => e.id == this.pickH2).h3;
    },
    changeH1() {
      console.log("changeH1");
      this.h2List = article.category.h1.find((e) => e.id == this.pickH1).h2;
      this.pickH2 = this.h2List[0].id;
      this.changeH2();
    },
    changeH2() {
      console.log("changeH2");
      this.h3List = this.h2List.find((e) => e.id == this.pickH2).h3;
      this.pickH3 = this.h3List[0].id;
    },
    async fetchMemoId() {
      let memoId = null;

      try {
        const res = await this.$http.get("/api/memo/fetch-memoid", {
          params: {
            username: this.$userData.name,
            memoTitle: this.memoTitle,
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
      if (!this.$userData.name) {
        // ログインしていなければローカルモードで記事の作成
        this.$router.push({
          name: "local-memo",
          params: {
            h1Id: this.pickH1,
            h2Id: this.pickH2,
            h3Id: this.pickH3,
          },
        });
        return;
      }

      // 記事のIDを取得
      const memoId = await this.fetchMemoId();
      if (!memoId) {
        // 記事がなければ作成する
        this.pageJumping = false;
        this.memoCreate();
        return;
      }

      // 記事があれば記事に飛ぶ
      this.$router.push({
        name: "memo",
        params: {
          username: this.$userData.name,
          memoId: memoId,
        },
      });

      this.pageJumping = false;
      return;
    },

    memoCreate() {
      this.pageJumping = true;
      this.$http
        .post(
          "/api/memo/create",
          {
            csrfToken: this.$userData.csrfToken,
            username: this.$userData.name,
            memoTitle: this.memoTitle,
            attribute: {
              category: this.h1Id,
              h1: this.pickH1,
              h2: this.pickH2,
              h3: this.pickH3,
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
.pick-stage {
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.select-container {
  max-width: 650px;
  width: 100%;
  height: 40px;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 5px;
  justify-content: center;
  align-items: center;

  border: #aaaaaa 1px solid;
  background-color: #ffffff;
  border-radius: 20px 0 0 20px;
}
select {
  max-width: 200px;
  width: 100%;
  border: 0;
  background-color: transparent;
}

.edit-button {
  height: 40px;
  width: 60px;
  border: #aaaaaa 1px solid;
  border-left: 0;
  border-radius: 0 20px 20px 0;
}
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
