import { ref } from 'vue'

const snackbar = ref({
  show: false,
  text: '',
  color: 'success'
})

export function useSnackbar() {
  const showSnackbar = (text, color = 'success') => {
    snackbar.value = {
      show: true,
      text,
      color
    }
  }

  return {
    snackbar,
    showSnackbar
  }
} 