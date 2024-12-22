<template>
  <v-app id="inspire">
    <NavbarTop />
    <v-main class="frontend-theme">
      <router-view />
    </v-main>
    <!-- Footer-->
    <footer class="bg-light py-5">
      <v-container class="px-4 px-lg-5">
        <div class="small text-center text-muted">
          {{ $t('Copyright') }} &copy; {{ appName }} 2024
        </div>
      </v-container>
    </footer>
  </v-app>
</template>

<script setup>
import '@/assets/css/frontend.css'
import NavbarTop from './NavbarTop.vue'
const appName = import.meta.env.VITE_APP_TITLE
</script>
