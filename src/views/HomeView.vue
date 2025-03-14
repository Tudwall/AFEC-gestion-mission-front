<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="username" type="username" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/authentication'
const authStore = useAuthStore()
const username = ref('')
const password = ref('')
const router = useRouter()

const handleLogin = async () => {
  try {
    await authStore.login(username.value, password.value)
    router.push('/dashboard')
  } catch (error) {
    console.error(error)
    alert('Login failed')
  }
}
</script>
