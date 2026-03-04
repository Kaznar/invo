/**
 * Reactive invoice data store with localStorage persistence.
 */
import { reactive, watch } from 'vue'

const STORAGE_KEY = 'invo-generator-data'

const defaultData = () => ({
  // Supplier (dodavatel)
  supplier: {
    name: '',
    address: '',
    city: '',
    zip: '',
    country: 'Česká republika',
    ico: '',
    dic: '',
    vatPayer: false,
    email: '',
    phone: '',
    bankAccount: '',
  },
  // Customer (odběratel)
  customer: {
    name: '',
    address: '',
    city: '',
    zip: '',
    country: 'Česká republika',
    ico: '',
    dic: '',
  },
  // Invoice metadata
  invoiceNumber: '',
  issueDate: '',
  dueDate: '',
  symbol: '',
  variableSymbol: '',
  constantSymbol: '',
  paymentMethod: 'transfer',
  // Note displayed above items table
  note: '',
  // Invoice line items
  items: [],
  // Settings
  locale: 'cs',
})

/**
 * Load saved data from localStorage, merged with defaults.
 */
function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultData()
    const saved = JSON.parse(raw)
    const defaults = defaultData()
    return {
      ...defaults,
      ...saved,
      supplier: { ...defaults.supplier, ...(saved.supplier || {}) },
      customer: { ...defaults.customer, ...(saved.customer || {}) },
    }
  } catch {
    return defaultData()
  }
}

export const invoiceData = reactive(loadFromStorage())

// Auto-save to localStorage on every deep change
watch(invoiceData, (val) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
  } catch {
    // localStorage might be full or disabled
  }
}, { deep: true })

/**
 * Create a new empty invoice line item.
 */
export function createItem() {
  return { description: '', quantity: 1, unit: 'ks', unitPrice: 0 }
}

/**
 * Reset all invoice data to defaults (clears localStorage).
 */
export function resetData() {
  const defaults = defaultData()
  Object.keys(defaults).forEach((key) => {
    invoiceData[key] = defaults[key]
  })
}
