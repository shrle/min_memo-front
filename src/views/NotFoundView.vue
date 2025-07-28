<template>
  <Header></Header>
  <main class="notfound main-container">ページが見つかりません</main>
</template>

<script>
// @ is an alias to /src

import Header from "@/components/HeaderComponent.vue";
export default {
  name: "NotFoundView",
  components: { Header },
};
</script>
