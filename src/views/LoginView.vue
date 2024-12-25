<template>
  <div class="d-flex justify-center align-items-center vh-100">
    <div class="card p-4 mt-5 mx-auto shadow" style="width: 100%; max-width: 400px">
      <h3 class="text-center mb-4">Login</h3>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <v-text-field
            label="Email address"
            type="email"
            id="email"
            v-model="email"
            class="form-control"
            placeholder="Enter your email"
            :class="{ 'is-invalid': errors['email'] }"
            required
          />
          <div v-if="errors['email']" class="invalid-feedback">
            {{ errors['email'] }}
          </div>
        </div>
        <div class="mb-3">
          <v-text-field
            label="Password"
            type="password"
            id="password"
            v-model="password"
            class="form-control"
            placeholder="Enter your password"
            required
          />
          <div v-if="errors['password']" class="invalid-feedback">
            {{ errors['password'] }}
          </div>
        </div>
        <button type="submit" class="btn btn-primary w-100">Login</button>
      </form>
      <div class="text-center mt-3">
        <a href="#" @click.prevent="forgotPassword">Forgot password?</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores'
const useAuth = useAuthStore()
const errors = ref([])
const email = ref('dif.rabie@gmail.com')
const password = ref('12345678')

const handleLogin = async () => {
  // Handle login logic here
  errors.value = []
  try {
    let { data } = await useAuth.authLogin({ email: email.value, password: password.value })
    if (data.success) {
      useAuth.authSetData(data.data.token, data.data.user)
      // will redirect automatically ,using setupAuthChangeListener
    } else {
      // not success
      console.log('not success', data)
    }
  } catch (error) {
    console.log('error', error)
    if (error.response) {
      const status = error.response.status
      if (status == 401) {
        let data = error.response.data
        console.log('data error', data)
        errors.value = data ? data : []
      } else {
        alert(`code ${status},${error.message}`)
      }
    }
  }
}

const forgotPassword = () => {
  // Handle forgot password logic here
  alert('Forgot password clicked!')
}
</script>

<style scoped>
main {
  margin-top: 40px;
}
/* Custom styling, if needed */
@media (min-width: 992px) {
  #mainNav {
    background-color: grey !important;
  }
}
</style>
