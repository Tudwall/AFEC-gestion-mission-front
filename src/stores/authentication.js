import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({ user: null }),

  actions: {
    async login(username, password) {
      const response = await fetch(`${import.meta.env.BASE_URL}/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) throw new Error('Login failed')

      const data = await response.json()

      this.user = data.user
    },

    async signup(username, password) {
      const response = await fetch(`${import.meta.env.BASE_URL}/register`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (response.ok) {
        this.user = await response.json()
      } else {
        console.error('Signup failed', response)
        throw new Error('nup failed')
      }
    },

    async logout() {
      await fetch(`${import.meta.env.BASE_URL}/logout`, { method: 'POST', credentials: 'include' })
      this.user = null
    },

    async checkAuth() {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}/checkAuth`, {
          method: 'GET',
          credentials: 'include',
        })

        if (!response.ok) throw new Error('Not authenticated')
        return true
      } catch (error) {
        console.error(error)
        this.user = null
        return false
      }
    },
  },
})
