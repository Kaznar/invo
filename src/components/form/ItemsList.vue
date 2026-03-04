<template>
  <fieldset>
    <legend>{{ $t('items.legend') }}</legend>

    <div class="dynamic-list">
      <div
        v-for="(item, index) in store.items"
        :key="index"
        class="dynamic-item"
      >
        <div class="dynamic-item-header">
          <span class="dynamic-item-title">{{ $t('items.legend') }} #{{ index + 1 }}</span>
          <button type="button" class="btn-remove" @click="remove(index)">✕</button>
        </div>

        <div class="form-group">
          <label>{{ $t('items.description') }}</label>
          <input type="text" v-model="item.description" :placeholder="$t('items.descriptionPlaceholder')">
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>{{ $t('items.quantity') }}</label>
            <input type="number" v-model.number="item.quantity" min="0" step="0.01">
          </div>
          <div class="form-group">
            <label>{{ $t('items.unit') }}</label>
            <input type="text" v-model="item.unit" placeholder="ks">
          </div>
          <div class="form-group">
            <label>{{ $t('items.unitPrice') }}</label>
            <input type="number" v-model.number="item.unitPrice" min="0" step="0.01">
          </div>
        </div>
      </div>
    </div>

    <button type="button" class="btn btn-add" @click="add">{{ $t('items.add') }}</button>
  </fieldset>
</template>

<script setup>
import { invoiceData, createItem } from '@/store'

const store = invoiceData

function add() {
  store.items.push(createItem())
}

function remove(index) {
  store.items.splice(index, 1)
}
</script>
