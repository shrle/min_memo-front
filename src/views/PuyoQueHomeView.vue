<template>
  <Header></Header>
  <main class="home main-container">
    <h1>みんなの覚書へようこそ！</h1>
    <p>みんなの覚書はカテゴリ特化型のメモ帳です。</p>
    <p>現在はぷよクエにも対応しています。</p>
    <p>Xアカウントでログインすることでメモを記録することができます。</p>
    <p>
      また、アカウントを必要としないローカルモードもあります。<br />
      こちらではお使いの端末上にメモが一時的に記録されます。
    </p>
  </main>
</template>

<style scoped></style>

<script>
// @ is an alias to /src
import Header from "@/components/HeaderComponent.vue";
export default {
  name: "PuyoQue",
  components: { Header },
};
</script>
