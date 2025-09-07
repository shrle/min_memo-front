<template>
  <router-view />

  <Footer></Footer>
</template>

<script>
import Footer from "./components/FooterComponent.vue";
export default {
  name: "App",
  components: { Footer },
  mounted() {
    this.$http
      .get("/get-csrf-token", {
        withCredentials: true,
      })
      .then((res) => {
        this.$userData.csrfToken = res.data.csrfToken;
        console.dir("/get-csrf-token @ response");
        console.dir(res.data);
      })
      .catch((error) => {
        console.dir("/get-csrf-token @ error");
        console.dir(error);
      });
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Kosugi+Maru&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  border: 0;
  font-family: "Roboto", sans-serif;
}

ul,
ol {
  margin-left: 20px;
}

h1 {
  font-size: 28px;
  margin-bottom: 50px;
  text-align: center;
}

#app {
  width: 100%;
  min-height: 100vh;
  padding-bottom: 80px;
  position: relative;
}

a {
  font-weight: bolder;
  color: inherit;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

button.icon-button {
  width: 40px;
  height: 40px;
  border: 0;
  background-color: #eeeeee;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

button.icon-button.primary {
  background-color: #aaaaaa;
}

button.icon-button.silent {
  background-color: transparent;
}

button.icon-button:hover {
  cursor: pointer;
  background-color: #cccccc;
}

button.icon-button:active {
  background-color: #aaaaaa;
}

button.text-button {
  background-color: #dddddd;
  color: #000000;
  min-width: 100px;
  width: fit-content;
  font-size: 1em;
  font-weight: bolder;

  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  padding: 0 20px;
  border-radius: 26px;
  border: transparent 2px solid;
}

button.text-button.big {
  height: 50px;
  font-size: large;
  border-radius: 25px;
}

button.text-button.primary {
  background-color: #000000;
  color: #ffffff;
}

button.text-button.silent {
  background-color: transparent;
  color: #000000;
  border: #aaaaff 2px solid;
}

button.text-button:disabled {
  border: #aaaaaa 2px solid;
  color: #aaaaaa;
  background-color: #ffffff;
}

button.text-button:active {
  background-color: #222222;
}

button.text-button:hover {
  cursor: pointer;
  background-color: #cccccc;
}

button.text-button:focus {
  background-color: #ffffff;
  border: #000000 2px solid;
  color: #000000;
}

input[type="text"].simple {
  min-width: 200px;
  height: 40px;
  border: #5599ff 1px solid;
  border-radius: 10px;
}

input[type="checkbox"] {
  margin-right: 20px;
}

.popup {
  background-color: #ffffff;
  border: 0;
  font-size: 14px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(100, 100, 100, 0.5);
  display: flex;
  flex-direction: column;
}

p {
  margin-bottom: 20px;
}

.warn {
  width: fit-content;
  padding: 5px 20px;
  font-weight: bolder;
  color: #333333;
  background-color: #ffff76;
  border-radius: 15px;
  opacity: 0;

  position: fixed;
  top: 100px;
  left: 50vw;
  z-index: 9999;

  transform: translateY(-50px) translateX(-50%);

  transition: all 0.25s ease-in-out;
}

.warn.show-warn {
  transform: translateY(0) translateX(-50%);
  opacity: 1;
}

.loading-container {
  width: 100vw;
  height: 5px;
  background: #aaaaaa;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.loading-container::after {
  width: 100vw;
  height: 5px;
  background: #3131ff;
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1001;

  animation: 3s ease-in-out 0s infinite loading;
}

@keyframes loading {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}

/*  (751px - 1299px ) */
.page-container {
  width: 600px;

  margin: 0 auto;
}

/* Style for desktop PCs (1301px - max) */
@media screen and (min-width: 1301px) {
  .page-container {
    width: 800px;
  }
}

/* Style for tablet PCs (401px - 750px) */
@media screen and (max-width: 750px) {
  .page-container {
    width: 450px;
  }
}

/* Style for mobile (0 - 400px) */
@media screen and (max-width: 450px) {
  .page-container {
    width: 95vw;
  }
}

.memo-view {
  min-height: 80vh;
  width: 600px;
  margin: 50px auto;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 5px;
    margin-bottom: 20px;
  }

  /* Style for desktop PCs (1301px - max) */
  @media screen and (min-width: 1301px) {
    width: 800px;
  }

  /* Style for tablet PCs (401px - 750px) */
  @media screen and (max-width: 750px) {
    width: 450px;
  }

  /* Style for mobile (0 - 400px) */
  @media screen and (max-width: 450px) {
    width: 90%;
  }
}

.mt-20 {
  margin-top: 20px;
}
</style>
