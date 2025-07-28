<template>
  <div class="userinfo">
    <!--
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
        <input
          type="text"
          name="csrfToken"
          :value="$userData.csrfToken"
          hidden
        />

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
    -->

    <div class="" v-if="$userData.name">
      {{ $userData.name }}
    </div>

    <PopupButton v-if="$userData.name" class="account-container">
      <template v-slot:button>
        <button class="icon-button">
          <span class="material-symbols-outlined"> account_circle </span>
        </button>
      </template>

      <template v-slot:popup>
        <div class="popup">
          <div>
            <form :action="apiUrl + '/logout'" method="post" class="logout">
              <input
                type="text"
                name="csrfToken"
                :value="$userData.csrfToken"
                hidden
              />
              <button class="logout-button" type="submit">
                <span class="material-symbols-outlined"> logout </span
                >ログアウト
              </button>
            </form>
          </div>
          <div>
            <router-link to="/account-remove" class="link">
              アカウントの削除について
            </router-link>
          </div>
        </div>
      </template>
    </PopupButton>

    <template v-else-if="onLoadUserName">
      <PopupButton>
        <template v-slot:button>
          <button class="text-button silent">ログイン</button>
        </template>

        <template v-slot:popup>
          <div class="popup">
            <div class="login-container">
              <button class="text-button big" @click="login">
                <svg
                  height="15"
                  viewBox="0 0 1200 1227"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
                    fill="black"
                  />
                </svg>
                でログイン
              </button>
            </div>
          </div>
        </template>
      </PopupButton>
    </template>
  </div>
</template>

<script>
const xLogo = require("@/assets/img/x-logo.svg");
import PopupButton from "@/components/PopupButton.vue";
//import SignupView from "@/views/SignupView.vue";
export default {
  name: "UserInfo",
  props: {
    rule: String,
    stage: String,
  },
  components: { PopupButton },
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
        .get("/fetch-username", {
          withCredentials: true,
        })
        .then((res) => {
          this.$userData.name = res.data.username;
          console.dir("/fetch-username @ response");
          console.dir(res.data);
          this.onLoadUserName = true;
        })
        .catch((error) => {
          console.dir("/fetch-username @ error");
          console.dir(error);
          this.onLoadUserName = true;
        });
    },

    login() {
      location.href = this.apiUrl + "/auth/twitter";
    },
  },
  data() {
    return {
      username: "",
      onLoadUserName: false,
      apiUrl: process.env.VUE_APP_API_URL,
      xLogo: xLogo,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.userinfo {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  column-gap: 10px;
}

.account-container .material-symbols-outlined {
  font-size: 40px;
}

.account-container .popup {
  width: 300px;
  padding: 10px 0;
}

.account-container .popup > * {
  width: 100%;
  height: 40px;
  padding-left: 30px;
  display: flex;
  align-items: center;
}
.account-container .popup > *:hover {
  background-color: #cccccc;
}

.account-container .popup > * > .link {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logout {
  width: 100%;
  height: 100%;
}
.logout-button {
  width: 100%;
  height: 100%;
  background: transparent;
  display: flex;
  justify-content: left;
  align-items: center;
}

.login-container {
  width: 300px;
  height: 100px;
  display: flex;

  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
}

path {
  fill: #000000;
}
</style>
