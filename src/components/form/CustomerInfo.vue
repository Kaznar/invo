<template>
  <fieldset>
    <legend>{{ $t('customer.legend') }}</legend>

    <div class="form-group">
      <label for="customerName">{{ $t('customer.name') }}</label>
      <input type="text" id="customerName" v-model="store.customer.name" :placeholder="$t('customer.namePlaceholder')">
    </div>

    <div class="form-group">
      <label for="customerAddress">{{ $t('customer.address') }}</label>
      <input type="text" id="customerAddress" v-model="store.customer.address" :placeholder="$t('customer.addressPlaceholder')">
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="customerCity">{{ $t('customer.city') }}</label>
        <input type="text" id="customerCity" v-model="store.customer.city" :placeholder="$t('customer.cityPlaceholder')">
      </div>
      <div class="form-group">
        <label for="customerZip">{{ $t('customer.zip') }}</label>
        <input type="text" id="customerZip" v-model="store.customer.zip" :placeholder="$t('customer.zipPlaceholder')">
      </div>
    </div>

    <div class="form-group">
      <label for="customerCountry">{{ $t('customer.country') }}</label>
      <input type="text" id="customerCountry" v-model="store.customer.country" :placeholder="$t('customer.countryPlaceholder')">
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="customerIco">{{ $t('customer.ico') }}</label>
        <input type="text" id="customerIco" v-model="store.customer.ico" :placeholder="$t('customer.icoPlaceholder')">
      </div>
      <div class="form-group">
        <label for="customerDic">{{ $t('customer.dic') }}</label>
        <input type="text" id="customerDic" v-model="store.customer.dic" :placeholder="$t('customer.dicPlaceholder')">
      </div>
    </div>
  </fieldset>
</template>

<script setup>
import { invoiceData } from '@/store'

const store = invoiceData
</script>
