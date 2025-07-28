<template>
  <Header></Header>
  <main class="privacy main-container">
    <h1>プライバシーポリシー</h1>

    <p>
      本プライバシーポリシーは、みんなの覚書（以下、「本アプリ」といいます。）におけるお客様の個人情報の取り扱いについて定めるものです。本アプリをご利用になるお客様（以下、「ユーザー」といいます。）は、本ポリシーの内容を理解し同意の上、本アプリをご利用ください。
    </p>

    <hr />

    <h2>1. 取得する情報とその利用目的</h2>
    <p>本アプリは、以下の情報を取得し、それぞれの目的のために利用します。</p>
    <ol>
      <li>
        <h3>Twitter認証により取得する情報</h3>
        <ul>
          <li>
            <strong>取得情報</strong>:
            <strong
              >Twitterアカウントに紐づくユーザー識別ID（ユーザーを特定するための固有のID）のみ</strong
            >を取得します。<strong
              >ユーザーの表示名、プロフィール画像、ツイート内容など、その他のTwitterに関する情報は一切取得しません。</strong
            >
          </li>
          <li>
            <strong>利用目的</strong>:
            <strong
              >ユーザーの識別および本アプリへのログイン機能提供のため</strong
            >にのみ利用します。
          </li>
        </ul>
      </li>
      <li>
        <h3>Googleアナリティクスによる情報収集</h3>
        <ul>
          <li>
            <strong>取得情報</strong>:
            本アプリの利用状況に関する情報（アクセス回数、利用時間、使用デバイス情報、地域情報など、個人を特定しない形式のデータ）。これらの情報は、Googleアナリティクスを通じてCookieなどを利用して収集されます。
          </li>
          <li>
            <strong>利用目的</strong>:
            <strong
              >本アプリの機能改善、利便性向上、および利用状況の分析のため</strong
            >に利用します。
          </li>
        </ul>
      </li>
    </ol>

    <hr />

    <h2>2. 取得した情報の管理と第三者提供</h2>
    <ol>
      <li>
        運営者は、取得した情報を厳重に管理し、漏洩、紛失、改ざん等を防止するため、適切な安全管理措置を講じます。
      </li>
      <li>
        <strong
          >運営者は、ユーザーから取得した情報を、本プライバシーポリシーに定める利用目的の範囲でのみ利用し、法令で認められる場合を除き、ユーザーの同意なく第三者に開示または提供することはありません。</strong
        >
      </li>
      <li>
        Googleアナリティクスによる情報収集は、Googleのプライバシーポリシーに基づいて行われます。Googleアナリティクスでデータが収集、処理される仕組みについては、<a
          href="https://policies.google.com/technologies/partner-sites"
          target="_blank"
          >Googleのポリシーと規約のページ</a
        >をご参照ください。
      </li>
    </ol>

    <hr />

    <h2>3. プライバシーポリシーの変更</h2>
    <p>
      運営者は、必要に応じて本プライバシーポリシーを変更することがあります。変更後のプライバシーポリシーは、本アプリのウェブサイト上に表示した時点より効力を生じるものとします。
    </p>

    <hr class="footer" />

    <div class="footer">
      <p>附則</p>
      <p>2025年7月25日 制定</p>
    </div>
  </main>
</template>

<style scoped>
body {
  font-family: "Helvetica Neue", Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
}
h2 {
  font-size: 1.5em;
  color: #34495e;
  margin-top: 30px;
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
}
h3 {
  font-size: 1.2em;
  color: #34495e;
  margin-top: 25px;
  margin-bottom: 10px;
}
p {
  margin-bottom: 10px;
}
ol,
ul {
  margin-left: 25px;
  margin-bottom: 10px;
}
li {
  margin-bottom: 5px;
}
strong {
  color: #2980b9;
}
.note {
  background-color: #eaf2f8;
  border-left: 5px solid #3498db;
  padding: 15px;
  margin: 20px 0;
  border-radius: 4px;
}
.footer {
  text-align: right;
  margin-top: 40px;
  font-size: 0.9em;
  color: #777;
  border-top: 1px dashed #ccc;
  padding-top: 10px;
}
.privacy-link {
  text-align: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px dashed #ccc;
}
</style>

<script>
// @ is an alias to /src

import Header from "@/components/HeaderComponent.vue";
export default {
  name: "PrivacyView",
  components: { Header },
};
</script>
