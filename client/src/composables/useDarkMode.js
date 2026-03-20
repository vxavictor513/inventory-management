import { ref, watch } from 'vue'

const STORAGE_KEY = 'darkMode'

// Initialize from localStorage or system preference
const getInitialValue = () => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored !== null) {
    return stored === 'true'
  }
  // Fall back to system preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

const isDark = ref(getInitialValue())

// Apply dark class to document on init
if (isDark.value) {
  document.documentElement.classList.add('dark')
}

// Sync class and localStorage whenever isDark changes
watch(isDark, (val) => {
  if (val) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  localStorage.setItem(STORAGE_KEY, String(val))
})

export function useDarkMode() {
  const toggleDark = () => {
    isDark.value = !isDark.value
  }

  return { isDark, toggleDark }
}
