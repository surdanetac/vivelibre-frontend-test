<template>
  <div>
    <form class="form-signin" @submit.prevent="onSignIn">
      <img class="mb-4" src="../assets/logo.png" alt="" width="100" height="100">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <div class="position-relative">
        <input v-model="username" type="text" id="username" class="form-control mb-2" placeholder="username" >
        <div v-if="showError.username" class="alert alert-danger" role="alert">
          {{ errorUsernameMessage }}
        </div>
      </div>
        <div class="position-relative">
        <input v-model="password" type="password" id="inputPassword" class="form-control mb-4" placeholder="password" >
          <div v-if="showError.password" class="alert alert-danger" role="alert">
          {{ errorPasswordMessage }}
        </div>
      </div>
      <button class="btn btn-lg btn-outline-dark btn-block" type="submit">
        <span>Sign in</span>
        <!-- Loader -->
        <span v-if="loading" class="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="false"></span>
      </button>
    </form>
  </div>
</template>

<script>
import { loginService } from '../helpers/fecthService'
import { validateFields } from '../helpers/utils'
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      loading: false,
      showError: { 
        username: false,
        password: false
      },
    }
  },
  computed: {
    errorUsernameMessage () {
      return this.errors.username
    },
    errorPasswordMessage () {
      return this.errors.password
    }
  },
  mounted() {
    this.username = 'mor_2314'
    this.password = '83r5^_'
  },
  methods: {
    async onSignIn () {
      this.errors = {}
      Object.keys(this.showError).map(key => this.showError[key] = false)
      // VALIDATIONS FIELDS
       const { isValid, errors } = validateFields({ username: this.username, password: this.password })
       if (!isValid) {
        this.errors = errors
        Object.keys(this.errors).map(key => this.showError[key] = true)
        return
       }
      // AUTHENTICATION
      this.loading = true
      try {
        const response = await loginService(this.username, this.password);
        this.loading = false
        this.$router.push({ name: 'home' })
      } catch (error) {
          this.loading = false
          this.$toast(error, 'danger')
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
