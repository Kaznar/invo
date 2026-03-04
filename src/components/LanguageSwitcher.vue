<template>
  <div class="lang-switcher">
    <button
      v-for="lang in languages"
      :key="lang"
      type="button"
      :class="['btn-lang', { active: locale === lang }]"
      @click="switchLang(lang)"
    >{{ lang.toUpperCase() }}</button>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { invoiceData } from '@/store'

const { locale } = useI18n({ useScope: 'global' })
const languages = ['cs', 'en']

function switchLang(lang) {
  locale.value = lang
  invoiceData.locale = lang
}
</script>
