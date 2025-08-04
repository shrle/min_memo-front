<template>
  <Header></Header>
  <div class="account-remove page-container">
    <div class="">
      <h3>アカウントの削除について</h3>
      <p>アカウントを削除するとあなたの投稿した記事と画像が全て削除されます</p>
      <p>
        アカウントを削除したい場合はユーザー名を入力して「アカウント削除」ボタンを押してください
      </p>
      <p><strong>削除されたデータは元に戻すことはできません</strong></p>

      <div class="">
        <input
          type="text"
          placeholder="あなたのユーザー名を入力してください"
          v-model="inputUserName"
          class="username simple"
        />
      </div>
      <div class="mt-20">
        <button
          class="text-button primary"
          v-bind:disabled="$userData.name !== inputUserName || saving"
          @click="showFinalConfirmation = true"
        >
          アカウント削除
        </button>
      </div>
    </div>
    <div
      class="final-confirmation-container"
      v-if="showFinalConfirmation"
      @click="showFinalConfirmation = false"
    >
      <div class="final-confirmation" @click.stop>
        <p>
          <span class="material-symbols-outlined"> brightness_alert </span
          >アカウントが削除されます。本当によろしいですか？
        </p>
        <form @submit.prevent="deactivate">
          <button
            type="submit"
            class="text-button primary"
            v-bind:disabled="$userData.name !== inputUserName || saving"
          >
            アカウント削除
          </button>
          <button class="text-button" @click="showFinalConfirmation = false">
            キャンセル
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
input.username {
  width: 500px;
}

.final-confirmation-container {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #00000080;
}

.final-confirmation {
  width: 80vw;
  height: 50vh;

  background-color: #fff;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;

  p {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  form {
    display: flex;
    justify-content: center;
    flex-direction: row;
    gap: 20px;
  }

  .material-symbols-outlined {
    color: #e32;
    font-size: 48px;
    font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 48;
  }
}
</style>

<script>
// @ is an alias to /src

import Header from "@/components/HeaderComponent.vue";

export default {
  name: "AccountRemoveView",
  components: {
    Header,
  },
  data() {
    return {
      showFinalConfirmation: false,
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
