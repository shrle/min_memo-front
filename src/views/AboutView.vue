<template>
  <Header></Header>
  <main class="about main-container">
    <h1 class="">みんなの覚書について</h1>
    <p>みんなの覚書は特定のカテゴリの覚書に特化したサイトです</p>

    <p>投稿した内容はすべてのユーザーが閲覧することができます</p>

    <p>
      覚書の管理って面倒ですよね<br />
      書き残しても読み直したいときにはどこに保管したのか分からなかったり<br />
      細かく分類分けすると記事の作成がもう面倒
    </p>

    <p>なにもかも面倒くさいという思いから生まれたのがこのサイトです</p>

    <p>皆様の労力を一手間二手間だけでも省ければ幸いです</p>

    <h3 class="mt-5">運営者情報</h3>
    <address>
      しゅるる - <a href="https://twitter.com/puyoquerensim">twitter</a><br />
      お問い合わせ - shrle2424@gmail.com
    </address>
  </main>
</template>

<script>
// @ is an alias to /src

import Header from "@/components/HeaderComponent.vue";
export default {
  name: "AboutView",
  components: { Header },
};
</script>
