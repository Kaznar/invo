<template>
  <fieldset>
    <legend>{{ $t('invoice.legend') }}</legend>

    <div class="form-group">
      <label for="invoiceNumber">{{ $t('invoice.number') }}</label>
      <input type="text" id="invoiceNumber" v-model="store.invoiceNumber" :placeholder="$t('invoice.numberPlaceholder')">
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="issueDate">{{ $t('invoice.issueDate') }}</label>
        <input type="text" id="issueDate" v-model="store.issueDate" :placeholder="$t('invoice.issueDatePlaceholder')">
      </div>
      <div class="form-group">
        <label for="dueDate">{{ $t('invoice.dueDate') }}</label>
        <input type="text" id="dueDate" v-model="store.dueDate" :placeholder="$t('invoice.dueDatePlaceholder')">
      </div>
    </div>

    <div class="form-group">
      <label for="symbol">{{ $t('invoice.symbol') }}</label>
      <input type="text" id="symbol" v-model="store.symbol" :placeholder="$t('invoice.symbolPlaceholder')">
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="variableSymbol">{{ $t('invoice.variableSymbol') }}</label>
        <input type="text" id="variableSymbol" v-model="store.variableSymbol" :placeholder="$t('invoice.variableSymbolPlaceholder')">
      </div>
      <div class="form-group">
        <label for="constantSymbol">{{ $t('invoice.constantSymbol') }}</label>
        <input type="text" id="constantSymbol" v-model="store.constantSymbol" :placeholder="$t('invoice.constantSymbolPlaceholder')">
      </div>
    </div>

    <div class="form-group">
      <label for="paymentMethod">{{ $t('invoice.paymentMethod') }}</label>
      <select id="paymentMethod" v-model="store.paymentMethod">
        <option value="transfer">{{ $t('invoice.paymentMethods.transfer') }}</option>
        <option value="cash">{{ $t('invoice.paymentMethods.cash') }}</option>
        <option value="card">{{ $t('invoice.paymentMethods.card') }}</option>
      </select>
    </div>
  </fieldset>
</template>

<script setup>
import { invoiceData } from '@/store'

const store = invoiceData
</script>
