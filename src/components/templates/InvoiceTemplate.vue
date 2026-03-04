<template>
  <div class="invoice-template">
    <!-- ===== SECTION: Identification (header) ===== -->
    <div class="inv-section inv-header-section">
      <div class="inv-sidebar-label">{{ $t('preview.sectionId') }}</div>
      <div class="inv-section-content">
        <div class="inv-header-row">
          <!-- Supplier -->
          <div class="inv-supplier">
            <div class="inv-supplier-title">{{ $t('preview.supplier') }}</div>
            <div class="inv-supplier-name">{{ data.supplier.name }}</div>
            <div class="inv-supplier-detail">
              <template v-if="data.supplier.address">{{ data.supplier.address }}<br></template>
              <template v-if="data.supplier.zip || data.supplier.city">{{ data.supplier.zip }} {{ data.supplier.city }}<br></template>
              <template v-if="data.supplier.country">{{ data.supplier.country }}<br></template>
              <template v-if="data.supplier.ico">IČ: {{ data.supplier.ico }}<br></template>
              <template v-if="data.supplier.dic">DIČ: {{ data.supplier.dic }}<br></template>
              <template v-if="!data.supplier.vatPayer && data.supplier.ico">{{ $t('supplier.notVatPayer') }}</template>
            </div>
          </div>

          <!-- Customer -->
          <div class="inv-customer-block" v-if="hasCustomer">
            <div class="inv-customer-title">{{ $t('preview.customer') }}</div>
            <div class="inv-customer-name">{{ data.customer.name }}</div>
            <div class="inv-customer-detail">
              <template v-if="data.customer.address">{{ data.customer.address }}<br></template>
              <template v-if="data.customer.zip || data.customer.city">{{ data.customer.zip }} {{ data.customer.city }}<br></template>
              <template v-if="data.customer.country">{{ data.customer.country }}<br></template>
              <template v-if="data.customer.ico">IČ: {{ data.customer.ico }}<br></template>
              <template v-if="data.customer.dic">DIČ: {{ data.customer.dic }}</template>
            </div>
          </div>

          <!-- Invoice title + number -->
          <div class="inv-invoice-meta">
            <div class="inv-invoice-title">{{ $t('preview.invoiceTitle') }}<template v-if="data.invoiceNumber">: {{ data.invoiceNumber }}</template></div>
          </div>
        </div>

        <!-- Contact info -->
        <div class="inv-contact" v-if="data.supplier.email || data.supplier.phone">
          <div class="inv-contact-title">{{ $t('preview.contactInfo') }}</div>
          <div class="inv-contact-detail">
            <template v-if="data.supplier.email">E-mail: {{ data.supplier.email }}<br></template>
            <template v-if="data.supplier.phone">Telefon: {{ data.supplier.phone }}</template>
          </div>
        </div>

        <!-- Dates -->
        <div class="inv-dates" v-if="data.issueDate || data.dueDate">
          <div v-if="data.issueDate">
            <span class="inv-date-label">{{ $t('preview.issueDate') }}</span>
            <span class="inv-date-value">{{ data.issueDate }}</span>
          </div>
          <div v-if="data.dueDate">
            <span class="inv-date-label">{{ $t('preview.dueDate') }}</span>
            <span class="inv-date-value">{{ data.dueDate }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ===== SECTION: Payment ===== -->
    <div class="inv-section inv-payment-section">
      <div class="inv-sidebar-label">{{ $t('preview.sectionPayment') }}</div>
      <div class="inv-section-content">
        <div class="inv-payment-group" v-if="data.supplier.bankAccount">
          <span class="inv-payment-label">{{ $t('preview.bankAccount') }}</span>
          <span class="inv-payment-value">{{ data.supplier.bankAccount }}</span>
        </div>

        <div class="inv-payment-group" v-if="data.symbol || data.variableSymbol || data.constantSymbol">
          <span class="inv-payment-label">{{ $t('preview.symbol') }}</span>
          <span class="inv-payment-value" v-if="data.symbol">{{ data.symbol }}</span>
          <span class="inv-payment-sub" v-if="data.variableSymbol">{{ $t('preview.variableSymbol') }} {{ data.variableSymbol }}</span>
          <span class="inv-payment-sub" v-if="data.constantSymbol">{{ $t('preview.constantSymbol') }} {{ data.constantSymbol }}</span>
        </div>

        <div class="inv-payment-group inv-payment-method">
          <span class="inv-payment-label">{{ $t('preview.paymentMethod') }}</span>
          <span class="inv-payment-value">{{ $t('preview.' + data.paymentMethod) }}</span>
        </div>
      </div>
    </div>

    <!-- ===== SECTION: Items ===== -->
    <div class="inv-section inv-items-section">
      <div class="inv-sidebar-label">{{ $t('preview.sectionItems') }}</div>
      <div class="inv-section-content">
        <div class="inv-items-note" v-if="data.note">{{ data.note }}</div>

        <table class="inv-items-table">
          <thead>
            <tr>
              <th class="col-description">{{ $t('preview.itemDescription') }}</th>
              <th class="col-quantity text-center">{{ $t('preview.itemQuantity') }}</th>
              <th class="col-unit text-center">{{ $t('preview.itemUnit') }}</th>
              <th class="col-unit-price text-right">{{ $t('preview.itemUnitPrice') }}</th>
              <th class="col-total text-right col-total-bg">{{ $t('preview.itemTotal') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in data.items" :key="index">
              <td>{{ item.description }}</td>
              <td class="text-center">{{ formatNumber(item.quantity) }}</td>
              <td class="text-center">{{ item.unit }}</td>
              <td class="text-right">{{ formatCurrency(item.unitPrice) }}</td>
              <td class="text-right col-total-bg">{{ formatCurrency(item.quantity * item.unitPrice) }}</td>
            </tr>
            <!-- Empty rows for visual consistency -->
            <tr v-for="n in emptyRows" :key="'empty-' + n" class="empty-row">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td class="col-total-bg"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ===== SECTION: Summary ===== -->
    <div class="inv-section inv-summary-section">
      <div class="inv-sidebar-label">{{ $t('preview.sectionSummary') }}</div>
      <div class="inv-section-content">
        <div class="inv-total-box">
          <span class="inv-total-label">{{ $t('preview.totalDue') }}</span>
          <span class="inv-total-value">{{ formatCurrency(totalAmount) }} {{ $t('preview.currency') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: { type: Object, required: true },
})

const hasCustomer = computed(() => {
  const c = props.data.customer
  return c.name || c.address || c.city || c.ico
})

const totalAmount = computed(() => {
  return props.data.items.reduce((sum, item) => {
    return sum + (item.quantity || 0) * (item.unitPrice || 0)
  }, 0)
})

const emptyRows = computed(() => {
  const minRows = 6
  const filled = props.data.items.length
  return Math.max(0, minRows - filled)
})

/**
 * Format number with Czech locale (comma as decimal separator, space as thousands).
 */
function formatNumber(value) {
  if (value == null || value === '') return ''
  return Number(value).toLocaleString('cs-CZ', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

/**
 * Format currency value with Czech locale.
 */
function formatCurrency(value) {
  if (value == null || value === '') return ''
  return Number(value).toLocaleString('cs-CZ', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}
</script>
