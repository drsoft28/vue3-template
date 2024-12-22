import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const drawer = ref(true)
  const toggleDrawer = () => {
    drawer.value = !drawer.value
  }
  return { drawer, toggleDrawer }
})
