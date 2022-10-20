<template>
  <div class="login">
    <h1>Login</h1>
    <LoginForm />
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from "@/components/LoginForm.vue";

export default {
  name: "HomeView",
  components: {
    LoginForm,
  },
};
</script>
