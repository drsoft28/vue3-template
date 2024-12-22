import { defineStore } from 'pinia'
import router from '@/router'
import axios from 'axios'
import {
  availableLocales,
  defaul_locale,
  getCurrentLanguage,
  listavailableLocales,
  loadLocaleMessages,
} from '@/plugins/Vue-i18n'
import Cookies from 'js-cookie'
import { vuetify } from '@/plugins/vuetify'
const isTesting = import.meta.env.VITE_APP_TEST
export const useAuthStore = defineStore('auth', {
  state: () => ({
    lang: availableLocales.find((l) => l.locale === defaul_locale),
    user: isTesting === true ? { name: 'rabie' } : null, // for testing
    token: null,
    apiUrl: import.meta.env.VITE_API_URL, // Use the environment variable here
  }),
  getters: {
    isAuthenticated: (state) => {
      return !!state.user
    },
  },
  actions: {
    getLang() {
      return this.lang
    },
    setLang(locale) {
      vuetify.locale.current.value = locale
      let list = listavailableLocales()
      if (!list.includes(locale)) return

      let _l = locale.toLowerCase()
      Cookies.set('i18n_lang', _l)
      this.lang = availableLocales.find((l) => l.locale === _l)
      loadLocaleMessages(_l)
    },
    getToken() {
      return this.token || localStorage.getItem('token') || null
    },
    getUser() {
      return this.user
    },
    _setToken(t) {
      if (t) {
        this.token = t
        localStorage.setItem('token', t)
      } else {
        this.token = null
        localStorage.removeItem('token')
      }
    },
    async setToken(t, userCheck = false) {
      if (t) {
        // Set the Authorization header globally
        axios.defaults.headers.common['Authorization'] = `Bearer ${t}`
        if (userCheck) {
          try {
            let { data } = await this.authMe()
            if (data.success) {
              this._setToken(t)
              this.setUser(data.data.user)
            }
          } catch (error) {
            this._setToken(null)
            this.setUser(null)
            console.log('error', error)
            //
          }
        } else this._setToken(t)
      } else {
        this.setUser(null)
      }
    },
    setUser(u) {
      if (u) {
        this.user = u
        localStorage.setItem('user', JSON.stringify(u))
      } else {
        this.user = null
        localStorage.removeItem('user')
      }
    },
    authSetData(t, u) {
      this._setToken(t)
      this.setUser(u)
    },
    authLogout() {
      return new Promise((resolve, reject) => {
        axios
          .post(`${this.apiUrl}/auth/logout`)
          .then((res) => resolve(res))
          .catch((error) => reject(error))
          .finally(() => {
            this.authSetData(null, null) /// for clearing auth data
          })
      })
    },
    authMe() {
      return new Promise((resolve, reject) => {
        axios
          .post(`${this.apiUrl}/auth/me`)
          .then((res) => resolve(res))
          .catch((error) => reject(error))
      })
    },
    authLogin(data, config = null) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${this.apiUrl}/auth/login`, data, config)
          .then((res) => resolve(res))
          .catch((error) => reject(error))
      })
    },
    async initialize() {
      axios.defaults.baseURL = this.apiUrl
      console.log('initializing')
      let _token = localStorage.getItem('token') || null
      let _lang = getCurrentLanguage()

      this.setLang(_lang)
      if (isTesting !== true) await this.setToken(_token, true)
      // Add a request interceptor
      axios.interceptors.request.use(
        (config) => {
          /*if (!window.$pinia && !window.$pinia._s.get('auth')) {
            return
          }*/
          //const useAuth = window.$pinia._s.get('auth')
          if (config.url.startsWith(this.apiUrl)) {
            config.headers['x-localization'] = this.getLang()
            const token = this.getToken()
            if (token) {
              config.headers['Authorization'] = `Bearer ${token}`
            } else {
              delete config.headers['Authorization'] // Remove the Authorization header if token is null
            }
          }
          return config
        },
        (error) => {
          return Promise.reject(error)
        },
      )
    },
    setupAuthChangeListener() {
      this.$subscribe((mutation, state) => {
        console.log('subscribe', mutation, state)
        // Check if the mutation affects the user (authentication state)
        if (mutation.events.key === 'user') {
          const currentRoute = router.currentRoute.value
          const authRequired = currentRoute.meta.auth
          // Access the `isAuthenticated` getter through `this`
          const isAuthenticated = this.isAuthenticated
          // Trigger any global logic here
          if (isAuthenticated) {
            console.log('User is now authenticated')

            // E.g., you could emit a global event or call a global method here
            if (authRequired === false) {
              // Redirect to  home page if the user is already authenticated
              router.push({ name: 'admin.dashboard' })
            }
          } else {
            console.log('User is now logged out')
            // If the route requires authentication
            if (authRequired === true) {
              // Redirect to login if the user is not authenticated
              router.push({ name: 'home' })
            }
          }
        }
      })
    },
  },

  setup() {
    console.log('"auth" store installed')

    // Add any custom code you want to run when the store is initialized
    // Example: Checking if user data is stored in localStorage
  },
})
