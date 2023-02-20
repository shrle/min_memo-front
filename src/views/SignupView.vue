<template>
  <div class="signup col-10 col-md-6 mx-auto">
    <h1>アカウント登録</h1>

    <div class="mt-5">ユーザー名を決めてください</div>
    <div>https://memo.shrle.net/あなたのユーザー名/</div>

    <form @submit.prevent="submit">
      <div class="mt-3 mb-3">
        <input
          type="text"
          minlength="4"
          maxlength="14"
          pattern="^[0-9a-zA-Z]+$"
          placeholder="ユーザー名(半角英数字のみ)"
          title="ユーザー名(半角英数字のみ) 4文字以上14文字以下"
          v-model="username"
          class="form-control"
        />
      </div>

      <div class="">
        <input
          type="checkbox"
          class="form-check-input"
          name="tos"
          id="tos"
          v-model="tosChecked"
        />
        <label class="form-check-label" for="tos">利用規約に同意する</label>
      </div>

      <p>
        <router-link to="/tos" target="_blank">利用規約</router-link>
        <router-link to="/privacy" target="_blank"
          >プライバシーポリシー</router-link
        >
      </p>
      <input
        type="submit"
        class="btn btn-primary"
        value="ユーザー登録"
        v-bind:disabled="!tosChecked"
      />
    </form>
    <div class="alert alert-warning mt-3" v-if="errorMessage">
      {{ errorMessage }}
    </div>
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
      tosChecked: false,
    };
  },
  methods: {
    submit() {
      this.$http
        .post(
          "/api/signup",
          {
            username: this.username,
          },
          {
            withCredentials: true,
          }
        )
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
