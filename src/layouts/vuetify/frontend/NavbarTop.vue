<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <v-app-bar class="px-md-3">
    <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon>-->
    <template #prepend>
      <v-app-bar-title>{{ $t('app_name') }}</v-app-bar-title>
    </template>
    <template #append>
      <v-btn text :to="{ name: 'admin.dashboard' }"> {{ $t('dashboard') }} </v-btn>
      <v-btn text href="#about"> {{ $t('about') }} </v-btn>
      <v-btn text href="#services"> {{ $t('services') }} </v-btn>
      <v-btn v-if="false" text href="#portfolio"> {{ $t('portfolio') }} </v-btn>
      <v-btn text href="#contact"> {{ $t('contact-us') }} </v-btn>
      <LangMenu />

      <v-divider vertical />
      <v-btn text v-if="!user" :to="{ name: 'login' }"> Login </v-btn>
      <v-tooltip v-else :text="$t('logout')">
        <template v-slot:activator="{ props }">
          <v-btn
            color="primary"
            variant="flat"
            density="default"
            prepend-icon="mdi-logout"
            v-bind="props"
            >{{ $t('logout') }}
          </v-btn>
        </template>
      </v-tooltip>
    </template>
  </v-app-bar>
  <v-dialog v-if="user" v-model="dialog" max-width="600">
    <v-card prepend-icon="mdi-logout" :title="$t('logout')">
      <v-card-text>
        Select "Logout" below if you are ready to end your current session.
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          :text="$t('close')"
          :disabled="logoutLoading"
          variant="plain"
          @click="dialog = false"
        ></v-btn>

        <v-btn
          color="primary"
          :loading="logoutLoading"
          :text="$t('logout')"
          variant="tonal"
          @click="logout"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { computed, ref } from 'vue'
import LangMenu from '../LangMenu.vue'
import { useAuthStore } from '@/stores'
//const themeStore = useThemeStore()
const authStore = useAuthStore()
const dialog = ref(false)
const logoutLoading = ref(false)
/*const logoutShow = () => {
  dialog.value = true
  console.log('logoutShouw')
}*/
const logout = async () => {
  logoutLoading.value = true
  try {
    await authStore.authLogout()
  } catch (error) {
    console.log('error', error)
  }
  logoutLoading.value = false
}
/*
const items = ref([
  { text: 'Dash', icon: 'mdi-account', route: 'admin.profile' },
  { text: 'Settings', icon: 'mdi-cog-outline', route: 'admin.profile.settings' },
  { text: 'Logout', icon: 'mdi-logout', action: logoutShow },
])*/

const user = computed(() => authStore.getUser())
/*const clickItem = (item) => {
  if (!item.action) return
  item.action()
}
*/
</script>
