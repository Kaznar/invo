<template>
  <aside class="form-panel">
    <div class="form-panel-header">
      <h1 class="app-title">{{ $t('appTitle') }}</h1>
      <div class="header-actions">
        <button type="button" class="btn-reset" @click="handleReset" :title="$t('resetData')">↺</button>
        <LanguageSwitcher />
      </div>
    </div>

    <form id="invoice-form" autocomplete="off">
      <SupplierInfo />
      <CustomerInfo />
      <InvoiceSettings />
      <NoteSection />
      <ItemsList />
    </form>
  </aside>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from './LanguageSwitcher.vue'
import SupplierInfo from './form/SupplierInfo.vue'
import CustomerInfo from './form/CustomerInfo.vue'
import InvoiceSettings from './form/InvoiceSettings.vue'
import ItemsList from './form/ItemsList.vue'
import NoteSection from './form/NoteSection.vue'
import { resetData } from '@/store'

const { t } = useI18n({ useScope: 'global' })

function handleReset() {
  if (confirm(t('resetConfirm'))) {
    resetData()
  }
}
</script>
