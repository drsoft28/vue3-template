<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props" size="48">
        <span class="lang-flag" v-html="currentLocale.flag"></span>
      </v-btn>
    </template>

    <v-list density="compact">
      <v-list-item
        v-for="(item, i) in availableLocales"
        :key="i"
        :value="item.code"
        :active="currentLocale.locale === item.locale"
        color="primary"
        @click="clickItem(item)"
      >
        <template v-slot:prepend>
          <span class="px-1 lang-flag" v-html="item.flag"></span>
        </template>

        <v-list-item-title v-text="item.code"></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup>
import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill'
import { computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores'
const authStore = useAuthStore()
import { availableLocales } from '@/plugins/Vue-i18n'

const currentLocale = computed(() => authStore.getLang())
const clickItem = (lang) => {
  authStore.setLang(lang.locale)
}
onMounted(() => {
  // ...

  polyfillCountryFlagEmojis()
})
</script>

<style></style>
