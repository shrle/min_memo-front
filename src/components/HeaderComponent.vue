<template>
  <header>
    <div class="left">
      <h2 class="h6">
        <router-link to="/" class="">みんなの覚書</router-link>
      </h2>
    </div>

    <div class="center">
      <PickStage ref="pickStage"> </PickStage>
    </div>

    <div class="right">
      <UserInfo></UserInfo>
    </div>
  </header>
</template>

<script>
import UserInfo from "@/components/UserInfo.vue";
import PickStage from "./PickStage.vue";
export default {
  name: "HeaderComponent",

  components: { UserInfo, PickStage },
  emits: [],

  data() {
    return {};
  },
  mounted() {},
  methods: {
    setStage(h1Id, h2Id, h3Id) {
      this.$refs.pickStage.setStage(h1Id, h2Id, h3Id);
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

header {
  width: 100%;
  height: auto;
  margin-bottom: 40px;
  background-color: #fff;
  display: grid;
  grid-template-columns: 130px 1fr 200px;
  column-gap: 10px;
}

header > .left {
  width: 100%;
  padding: 10px;
}

header > .center {
  padding: 10px;
  flex-grow: 1;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 0;
}

header > .right {
  width: 100%;
  padding: 10px;
}

/* Style for tablet PCs (401px - 750px) */
@media screen and (max-width: 750px) {
  header {
    height: 90px;
    grid-template-areas: "a c" "b b";
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }
  header > .center {
    grid-area: b;
  }
  header > .left {
    grid-area: a;
  }
  header > .right {
    grid-area: c;
  }
}

h2 {
  font-size: 16px;
  font-weight: bolder;
}
</style>
