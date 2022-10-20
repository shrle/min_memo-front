<template>
  <UserInfo></UserInfo>
  <div class="home col-10 col-md-6 mx-auto">
    <h1>みんなの覚書 - スプラトゥーン3</h1>
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
</template>

<script>
// @ is an alias to /src
import UserInfo from "@/components/UserInfo.vue";

export default {
  name: "HomeView",
  components: {
    UserInfo,
  },
};
</script>
