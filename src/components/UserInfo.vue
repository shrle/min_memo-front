<template>
  <div id="userinfo" class="mb-3">
    <div v-if="!onLoadUserName" class="row">
      <div class="col-4 col-md-6 col-lg-9"></div>
      <div class="col-8 col-md-6 col-lg-3">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>

    <div v-if="$userData.name" class="row">
      <div class="col-4 col-md-6 col-lg-9"></div>
      <div class="col-2 col-md-2 col-lg-1 text-truncate">
        {{ $userData.name }}
      </div>
      <div class="col-3 col-md-2 col-lg-1 p-0">
        <button class="btn btn-secondary btn-sm" @click="myPage">
          マイページ
        </button>
      </div>
      <form
        :action="apiUrl + '/logout'"
        method="post"
        class="col-3 col-md-2 col-lg-1 p-0"
      >
        <button class="logout btn btn-secondary btn-sm" type="submit">
          ログアウト
        </button>
      </form>
    </div>
    <div v-else-if="onLoadUserName" class="row">
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
  async mounted() {
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
        .then((res) => {
          this.$userData.name = res.data.username;
          console.dir("/api/ @ response");
          console.dir(res.data);
          this.onLoadUserName = true;
        })
        .catch((error) => {
          console.dir("/api/ @ error");
          console.dir(error);
          this.onLoadUserName = true;
        });
    },
  },
  data() {
    return {
      username: "",
      onLoadUserName: false,
      apiUrl: process.env.VUE_APP_API_URL,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
