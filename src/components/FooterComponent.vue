<template>
  <footer>
    <div>
      <router-link to="/tos" class="link-light">利用規約</router-link>
    </div>

    <div>
      <router-link to="/privacy" class="link-light"
        >プライバシーポリシー</router-link
      >
    </div>

    <div>
      <router-link to="/about" class="link-light"
        >このサイトについて</router-link
      >
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent",

  components: {},
  emits: [],
  mounted() {},
  methods: {},
};
</script>

<style scoped>
footer {
  height: 80px;
  width: 100%;
  background-color: #333333;
  color: #ffffff;
  font-weight: bolder;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  column-gap: 40px;
  position: absolute;
  bottom: 0;
}

/* Style for mobile (0 - 600px) */
@media screen and (max-width: 600px) {
  footer {
    display: grid;
    grid-template-columns: 170px 170px;
    column-gap: 0;
    row-gap: 10px;
    margin: 0 auto;
  }
}
</style>
