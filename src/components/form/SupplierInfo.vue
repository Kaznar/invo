<template>
  <fieldset>
    <legend>{{ $t('supplier.legend') }}</legend>

    <div class="form-group">
      <label for="supplierName">{{ $t('supplier.name') }}</label>
      <input type="text" id="supplierName" v-model="store.supplier.name" :placeholder="$t('supplier.namePlaceholder')">
    </div>

    <div class="form-group">
      <label for="supplierAddress">{{ $t('supplier.address') }}</label>
      <input type="text" id="supplierAddress" v-model="store.supplier.address" :placeholder="$t('supplier.addressPlaceholder')">
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="supplierCity">{{ $t('supplier.city') }}</label>
        <input type="text" id="supplierCity" v-model="store.supplier.city" :placeholder="$t('supplier.cityPlaceholder')">
      </div>
      <div class="form-group">
        <label for="supplierZip">{{ $t('supplier.zip') }}</label>
        <input type="text" id="supplierZip" v-model="store.supplier.zip" :placeholder="$t('supplier.zipPlaceholder')">
      </div>
    </div>

    <div class="form-group">
      <label for="supplierCountry">{{ $t('supplier.country') }}</label>
      <input type="text" id="supplierCountry" v-model="store.supplier.country" :placeholder="$t('supplier.countryPlaceholder')">
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="supplierIco">{{ $t('supplier.ico') }}</label>
        <input type="text" id="supplierIco" v-model="store.supplier.ico" :placeholder="$t('supplier.icoPlaceholder')">
      </div>
      <div class="form-group">
        <label for="supplierDic">{{ $t('supplier.dic') }}</label>
        <input type="text" id="supplierDic" v-model="store.supplier.dic" :placeholder="$t('supplier.dicPlaceholder')">
      </div>
    </div>

    <div class="form-check">
      <input type="checkbox" id="supplierVat" v-model="store.supplier.vatPayer">
      <label for="supplierVat">{{ $t('supplier.vatPayer') }}</label>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="supplierEmail">{{ $t('supplier.email') }}</label>
        <input type="email" id="supplierEmail" v-model="store.supplier.email" :placeholder="$t('supplier.emailPlaceholder')">
      </div>
      <div class="form-group">
        <label for="supplierPhone">{{ $t('supplier.phone') }}</label>
        <input type="tel" id="supplierPhone" v-model="store.supplier.phone" :placeholder="$t('supplier.phonePlaceholder')">
      </div>
    </div>

    <div class="form-group">
      <label for="supplierBank">{{ $t('supplier.bankAccount') }}</label>
      <input type="text" id="supplierBank" v-model="store.supplier.bankAccount" :placeholder="$t('supplier.bankAccountPlaceholder')">
    </div>
  </fieldset>
</template>

<script setup>
import { invoiceData } from '@/store'

const store = invoiceData
</script>
