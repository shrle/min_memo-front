<template>
  <div id="userinfo">
    <div v-if="$userData.name" class="row">
      <div class="col-6 col-md-9"></div>
      <div class="col-2 col-md-1 text-truncate">{{ $userData.name }}</div>
      <div class="col-2 col-md-1">
        <button class="btn btn-secondary" @click="myPage">マイページ</button>
      </div>
      <form action="/logout" method="post" class="col-2 col-md-1">
        <button class="logout btn btn-secondary" type="submit">logout</button>
      </form>
    </div>
    <div v-else class="row">
      <div class="col-12 text-end">
        <a :href="apiUrl + '/auth/twitter'">twitterでログイン</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  props: {
    rule: String,
    stage: String,
  },
  mounted() {
    this.fetchUserName();
  },
  methods: {
    myPage() {
      this.$router.push({
        name: "userhome",
        params: {
          username: this.$userData.name,
        },
      });
    },
    fetchUserName() {
      this.$http
        .get("/api/", {
          withCredentials: true,
        })
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
      apiUrl: process.env.VUE_APP_API_URL,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
