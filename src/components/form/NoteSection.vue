<template>
  <fieldset>
    <legend>{{ $t('note.legend') }}</legend>

    <div class="form-group">
      <label for="invoiceNote">{{ $t('note.label') }}</label>
      <input type="text" id="invoiceNote" v-model="store.note" :placeholder="$t('note.placeholder')">
    </div>
  </fieldset>
</template>

<script setup>
import { invoiceData } from '@/store'

const store = invoiceData
</script>
