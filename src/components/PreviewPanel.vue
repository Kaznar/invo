<template>
  <main class="preview-panel">
    <!-- Toolbar -->
    <div class="preview-toolbar">
      <button type="button" class="btn btn-primary" @click="exportPdf">{{ $t('exportPdf') }}</button>
    </div>

    <!-- Preview area -->
    <div class="preview-scroll">
      <div v-if="hasAnyData" class="preview-pages-container" ref="pagesContainer">
        <div class="invoice-preview" ref="invoicePreview">
          <InvoiceTemplate :data="store" />
        </div>
        <!-- Page break indicators -->
        <div
          v-for="n in pageBreakCount"
          :key="n"
          class="page-break-indicator"
          :style="{ top: (n * pageHeightPx) + 'px' }"
          aria-hidden="true"
        />
      </div>
      <p v-else class="preview-empty">{{ $t('previewEmpty') }}</p>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { invoiceData } from '@/store'
import InvoiceTemplate from './templates/InvoiceTemplate.vue'

const store = invoiceData

const hasAnyData = computed(() => {
  return store.supplier.name || store.customer.name ||
    store.invoiceNumber || store.items.length > 0
})

// --- Page break detection ---
const invoicePreview = ref(null)
const contentHeight = ref(0)
const pageHeightPx = ref(1122.5) // fallback: 297mm at 96dpi

/**
 * Measure the exact pixel height of 297mm in the current browser.
 */
function measurePageHeight() {
  const probe = document.createElement('div')
  probe.style.width = '297mm'
  probe.style.height = '0'
  probe.style.position = 'absolute'
  probe.style.visibility = 'hidden'
  document.body.appendChild(probe)
  pageHeightPx.value = probe.offsetWidth // width of 297mm in px
  document.body.removeChild(probe)
}

const pageBreakCount = computed(() => {
  if (contentHeight.value <= pageHeightPx.value) return 0
  return Math.floor(contentHeight.value / pageHeightPx.value)
})

let resizeObserver = null

onMounted(() => {
  measurePageHeight()

  resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      contentHeight.value = entry.contentRect.height
    }
  })

  if (invoicePreview.value) {
    resizeObserver.observe(invoicePreview.value)
  }
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
})

/**
 * Sanitize string for use as a filename — remove diacritics, replace spaces with underscores.
 */
function sanitizeForFilename(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9_-]/g, '')
}

function exportPdf() {
  const originalTitle = document.title
  const namePart = sanitizeForFilename(store.supplier.name || 'Faktura')
  const numberPart = store.invoiceNumber || 'bez-cisla'
  document.title = `${namePart}_${numberPart}`

  window.print()

  // Restore original title after print dialog closes
  setTimeout(() => {
    document.title = originalTitle
  }, 500)
}
</script>
