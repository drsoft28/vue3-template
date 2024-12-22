<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <v-sheet class="pa-4" color="grey-lighten-4">
        <v-avatar class="mb-4" color="grey-darken-1" size="64"></v-avatar>

        <div v-if="user">{{ user.name }}</div>
      </v-sheet>

      <v-divider></v-divider>
      <SidebarTheme />
      <!--
      <v-list>
        <v-list-item
          v-for="[icon, text, link] in links"
          :key="icon"
          :prepend-icon="icon"
          :title="text"
          link
          :to="{ name: link }"
        ></v-list-item>
      </v-list>
      -->
    </v-navigation-drawer>

    <!--navbar top-->
    <NavbarTop />
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import '@/assets/css/styles.css'
import NavbarTop from './NavbarTop.vue'
import SidebarTheme from './SidebarTheme.vue'
import { computed } from 'vue'
import { useThemeStore, useAuthStore } from '@/stores'
const themeStore = useThemeStore()
const authStore = useAuthStore()
const user = computed(() => authStore.user)
/*const links = [
  ['mdi-home', 'Home', 'home'],
  ['mdi-view-dashboard', 'Dashboard', 'admin.dashboard'],
  ['mdi-office-building-cog-outline', 'Forms', 'admin.form-list'],
  // ['mdi-alert-octagon', 'Spam'],
]*/
const drawer = computed(() => themeStore.drawer)
</script>

<script>
export default {
  data: () => ({ drawer: null }),
}
</script>
