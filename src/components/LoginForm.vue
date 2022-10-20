<template>
  <a href="http://localhost:3000/auth/twitter">twitterLogin</a>
  <form action="http://localhost:3000/login/password" method="post">
    <section>
      <label for="username">Username</label>
      <input
        id="username"
        name="username"
        type="text"
        autocomplete="username"
        required
        autofocus
      />
    </section>
    <section>
      <label for="current-password">Password</label>
      <input
        id="current-password"
        name="password"
        type="password"
        autocomplete="current-password"
        required
      />
    </section>
    <button type="submit">Sign in</button>
  </form>
</template>

<script>
export default {
  name: "LoginForm",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
