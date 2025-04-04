import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

// 백운마을 테마 색상
const lightTheme = {
  dark: false,
  colors: {
    primary: '#2E7D32', // 자연을 상징하는 녹색
    secondary: '#795548', // 흙을 상징하는 갈색
    accent: '#FDD835', // 수확을 상징하는 노란색
    background: '#FFFFFF',
    surface: '#FFFFFF',
    'surface-variant': '#F5F5F5',
    error: '#B71C1C',
    info: '#0288D1',
    success: '#388E3C',
    warning: '#F57F17',
  },
  variables: {
    'border-color': '#E0E0E0',
    'border-opacity': 0.12,
    'high-emphasis-opacity': 0.87,
    'medium-emphasis-opacity': 0.60,
    'disabled-opacity': 0.38,
    'idle-opacity': 0.04,
    'hover-opacity': 0.04,
    'focus-opacity': 0.12,
    'selected-opacity': 0.08,
    'activated-opacity': 0.12,
    'pressed-opacity': 0.12,
    'dragged-opacity': 0.08,
    'theme-kbd': '#212529',
    'theme-on-kbd': '#FFFFFF',
    'theme-code': '#F5F5F5',
    'theme-on-code': '#000000',
  }
}

const darkTheme = {
  dark: true,
  colors: {
    primary: '#4CAF50',
    secondary: '#8D6E63',
    accent: '#FFE57F',
    background: '#121212',
    surface: '#212121',
    'surface-variant': '#1E1E1E',
    error: '#CF6679',
    info: '#64B5F6',
    success: '#81C784',
    warning: '#FFB74D',
  },
  variables: {
    'border-color': '#FFFFFF',
    'border-opacity': 0.12,
    'high-emphasis-opacity': 0.87,
    'medium-emphasis-opacity': 0.60,
    'disabled-opacity': 0.38,
    'idle-opacity': 0.10,
    'hover-opacity': 0.04,
    'focus-opacity': 0.12,
    'selected-opacity': 0.08,
    'activated-opacity': 0.12,
    'pressed-opacity': 0.16,
    'dragged-opacity': 0.08,
    'theme-kbd': '#212529',
    'theme-on-kbd': '#FFFFFF',
    'theme-code': '#343434',
    'theme-on-code': '#CCCCCC',
  }
}

export default createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: lightTheme,
      dark: darkTheme,
    },
  },
  defaults: {
    VCard: {
      elevation: 2,
      rounded: 'lg',
    },
    VBtn: {
      rounded: 'lg',
      elevation: 0,
      fontWeight: 500,
    },
    VTextField: {
      variant: 'outlined',
      density: 'comfortable',
      rounded: 'lg',
    },
    VTextarea: {
      variant: 'outlined',
      density: 'comfortable',
      rounded: 'lg',
    },
    VSelect: {
      variant: 'outlined',
      density: 'comfortable',
      rounded: 'lg',
    },
    VChip: {
      rounded: 'lg',
    },
    VAlert: {
      rounded: 'lg',
    },
  },
}) 