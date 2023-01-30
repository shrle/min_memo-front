<template>
  <div id="userinfo">
    <div v-if="$userData.name" class="row">
      <div class="col-8 col-md-10"></div>
      <div class="col-2 col-md-1 text-truncate">{{ $userData.name }}</div>

      <form action="/logout" method="post" class="col-2 col-md-1">
        <button class="logout btn btn-secondary" type="submit">logout</button>
      </form>

      <PickStage :rule="rule" :stage="stage"></PickStage>
    </div>
    <div v-else class="row">
      <div class="col-12 text-end">
        <a :href="process.env.VUE_APP_API_URL + 'auth/twitter'"
          >twitterでログイン</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import PickStage from "@/components/PickStage.vue";

export default {
  name: "UserInfo",
  components: {
    PickStage,
  },
  props: {
    rule: String,
    stage: String,
  },
  mounted() {
    console.dir(process.env.VUE_APP_API_URL);
    this.fetchUserName();
  },
  methods: {
    fetchUserName() {
      this.$http
        .get("/api/")
        .then(
          function (res) {
            this.$userData.name = res.data.username;
            console.dir("/api/ @ response");
            console.dir(res.data);
          }.bind(this)
        )
        .catch(function (error) {
          console.dir("/api/ @ error");
          console.dir(error);
        });
    },
  },
  data() {
    return {
      username: "",
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
