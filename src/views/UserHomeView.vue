<template>
  <UserInfo></UserInfo>

  <PickStage></PickStage>
  <div class="userhome col-10 col-md-6 mx-auto">
    <h1>みんなの覚書 - スプラトゥーン3</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import UserInfo from "@/components/UserInfo.vue";
import PickStage from "@/components/PickStage.vue";

export default {
  name: "UserHomeView",
  components: {
    UserInfo,
    PickStage,
  },
};
</script>
