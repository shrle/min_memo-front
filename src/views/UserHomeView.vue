<template>
  <Header></Header>
  <div class="userhome page-container">
    <form
      :action="apiUrl + '/logout'"
      method="post"
      class="col-3 col-md-2 col-lg-1 p-0"
    >
      <input type="text" name="csrfToken" :value="$userData.csrfToken" hidden />

      <button class="logout btn btn-secondary btn-sm" type="submit">
        ログアウト
      </button>
    </form>

    <button
      class="btn btn-secondary btn-sm mt-5"
      @click="deactivateAboutView = true"
    >
      アカウントの削除について
    </button>
    <div
      class="border border-danger bg-light mt-5 p-2 border-3 rounded-3"
      v-if="deactivateAboutView"
    >
      <h3>アカウントの削除について</h3>
      <p>アカウントを削除するとあなたの投稿した記事と画像が全て削除されます</p>
      <p>
        アカウントを削除したい場合はユーザー名を入力して「アカウント削除」ボタンを押してください
      </p>
      <p><strong>削除されたデータは元に戻すことはできません</strong></p>
      <form @submit.prevent="deactivate">
        <div class="mt-3">
          <input
            type="text"
            placeholder="あなたのユーザー名を入力してください"
            v-model="inputUserName"
            class="form-control"
          />
        </div>
        <div class="text-end mt-3">
          <input
            type="submit"
            class="btn btn-primary"
            value="アカウント削除"
            v-bind:disabled="$route.params.username !== inputUserName || saving"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import Header from "@/components/HeaderComponent.vue";

export default {
  name: "UserHomeView",
  components: {
    Header,
  },
  data() {
    return {
      deactivateAboutView: false,
      inputUserName: "",
      saving: false,
    };
  },
  mounted() {},
  methods: {
    deactivate() {
      console.dir("deactivate");
      this.saving = true;
      this.$http
        .delete("/api/deactivate", {
          withCredentials: true,
        })
        .then((res) => {
          console.dir("/api/deactivate @ response");
          console.dir(res.data);

          this.saving = false;
          this.$userData.name = undefined;
          alert("アカウントを削除しました");
          this.$router.push({
            name: "home",
          });
        })
        .catch((error) => {
          console.dir("/api/deactivate @ error");
          console.dir(error);
          if (error.response) {
            console.dir(error.response.data.errorMessage);
            this.errorMessage = error.response.data.errorMessage;
          } else {
            this.errorMessage = "予期せぬエラーが発生しました";
          }
          this.saving = false;
        });
    },
  },
};
</script>
