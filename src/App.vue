<template>
  <div class="app-layout">
    <FormPanel />
    <PreviewPanel />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { invoiceData } from '@/store'
import FormPanel from '@/components/FormPanel.vue'
import PreviewPanel from '@/components/PreviewPanel.vue'

const { locale } = useI18n({ useScope: 'global' })

// Restore locale from saved data
onMounted(() => {
  if (invoiceData.locale) {
    locale.value = invoiceData.locale
  }
})
</script>
