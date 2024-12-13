<template>
  <form class="form-signin" @submit.prevent="onSignIn">
      <img class="mb-4" src="../assets/logo.png" alt="" width="100" height="100">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <input v-model="username" type="text" id="username" class="form-control mb-2" placeholder="Username">
      <input v-model="password" type="password" id="inputPassword" class="form-control mb-4" placeholder="Password">
      <button class="btn btn-lg btn-outline-dark btn-block" type="submit">
        <span>Sign in</span>
        
        <!-- Loader -->
        <span v-if="loading" class="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="false"></span>
      </button>
    </form>
</template>

<script>
import { loginService } from '../helpers/fecthService'
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      loading: false
    }
  },
  methods: {
    async onSignIn () {
      // AUTHENTICATION
      this.loading = true
      try {
        const response = await loginService(this.username, this.password);
        this.loading = false
        console.log('Response', response);
    } catch (error) {
        this.loading = false
        console.error('Response Error', error);
    }
    }
  }
}
</script>

<style scoped>
.form-signin {
  width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
}
</style>
