<template>
  <div class="home">
    <h1>Signup</h1>

    <div>ユーザー名を決めてください</div>
    <form @submit.prevent="submit">
      <input
        type="text"
        minlength="4"
        maxlength="14"
        pattern="^[0-9a-zA-Z]+$"
        placeholder="ユーザー名(半角英数字のみ)"
        title="ユーザー名(半角英数字のみ) 4文字以上14文字以下"
        v-model="username"
      />
      <input type="submit" />
    </form>
    <div>https://shrle.net/memo/あなたのユーザー名/</div>
    <div v-if="errorMessage">{{ errorMessage }}</div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "SignupView",
  components: {},
  props: {},
  data() {
    return {
      username: "",
      errorMessage: "",
    };
  },
  methods: {
    submit() {
      this.$http
        .post("/api/signup", {
          username: this.username,
        })
        .then((res) => {
          console.dir("/api/signup @ response");
          console.dir(res.data);

          this.$router.push("/");
        })
        .catch((error) => {
          console.dir("/api/signup @ error");
          console.dir(error);
          console.dir(error.response.data.errorMessage);
          this.errorMessage = error.response.data.errorMessage;
        });
    },
  },
};
</script>
