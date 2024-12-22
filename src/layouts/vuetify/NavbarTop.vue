<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <v-app-bar>
    <v-app-bar-nav-icon @click="toggle"></v-app-bar-nav-icon>

    <v-app-bar-title>{{ $t('app_name') }}</v-app-bar-title>
    <LangMenu />
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-avatar v-bind="props" color="primary" size="56">
          {{ user.name }}
        </v-avatar>
      </template>

      <v-list density="compact">
        <v-list-subheader>REPORTS</v-list-subheader>

        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :value="item"
          color="primary"
          :to="item.route ? { name: item.route } : undefined"
          @click="clickItem(item)"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>

          <v-list-item-title v-html="item.text"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
  <v-dialog v-model="dialog" max-width="600">
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
import LangMenu from './LangMenu.vue'
import { useThemeStore, useAuthStore } from '@/stores'
const themeStore = useThemeStore()
const authStore = useAuthStore()
const dialog = ref(false)
const logoutLoading = ref(false)
const logoutShow = () => {
  dialog.value = true
  console.log('logoutShouw')
}
const logout = async () => {
  logoutLoading.value = true
  try {
    await authStore.authLogout()
  } catch (error) {
    console.log('error', error)
  }
  logoutLoading.value = false
}
const items = ref([
  { text: 'Profile', icon: 'mdi-account', route: 'admin.profile' },
  { text: 'Settings', icon: 'mdi-cog-outline', route: 'admin.profile.settings' },
  { text: 'Logout', icon: 'mdi-logout', action: logoutShow },
])

const user = computed(() => authStore.getUser())
const clickItem = (item) => {
  if (!item.action) return
  item.action()
}
const toggle = () => {
  themeStore.toggleDrawer()
}
</script>
