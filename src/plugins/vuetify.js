import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

// 백운마을 테마 색상
const lightTheme = {
  dark: false,
  colors: {
    primary: '#98B9AB', // 파스텔 세이지 그린
    secondary: '#D4B5B0', // 파스텔 테라코타
    accent: '#F7E1D7', // 파스텔 피치
    background: '#FFFFFF',
    surface: '#FFFFFF',
    'surface-variant': '#F5F5F5',
    error: '#FFB3B3', // 파스텔 레드
    info: '#B3E0FF', // 파스텔 블루
    success: '#B8D8BE', // 파스텔 그린
    warning: '#FFE5B4', // 파스텔 옐로우
    'on-primary': '#2C3532', // 진한 회색빛 그린 (primary 텍스트)
    'on-secondary': '#4A403A', // 진한 브라운 (secondary 텍스트)
    'on-accent': '#4F4846', // 진한 웜그레이 (accent 텍스트)
    'on-surface': '#2C3532', // 진한 회색빛 그린 (일반 텍스트)
    'on-error': '#802020', // 진한 레드 (error 텍스트)
    'on-info': '#0D47A1', // 진한 블루 (info 텍스트)
    'on-success': '#1B4332', // 진한 그린 (success 텍스트)
    'on-warning': '#8B4513', // 진한 브라운 (warning 텍스트)
  },
  variables: {
    'border-color': '#E0E0E0',
    'border-opacity': 0.12,
    'high-emphasis-opacity': 1,
    'medium-emphasis-opacity': 0.8,
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
    primary: '#B8D8BE', // 파스텔 그린 (다크모드)
    secondary: '#E6C5C0', // 파스텔 테라코타 (다크모드)
    accent: '#FFE5D9', // 파스텔 피치 (다크모드)
    background: '#121212',
    surface: '#212121',
    'surface-variant': '#1E1E1E',
    error: '#FFB3B3', // 파스텔 레드
    info: '#B3E0FF', // 파스텔 블루
    success: '#C8E6CE', // 파스텔 그린
    warning: '#FFE5B4', // 파스텔 옐로우
    'on-primary': '#1A2421', // 매우 진한 회색빛 그린 (primary 텍스트)
    'on-secondary': '#2D2724', // 매우 진한 브라운 (secondary 텍스트)
    'on-accent': '#2D2A29', // 매우 진한 웜그레이 (accent 텍스트)
    'on-background': '#FFFFFF', // 흰색 (배경 텍스트)
    'on-surface': '#FFFFFF', // 흰색 (표면 텍스트)
    'on-error': '#4D1313', // 매우 진한 레드 (error 텍스트)
    'on-info': '#082B63', // 매우 진한 블루 (info 텍스트)
    'on-success': '#10291E', // 매우 진한 그린 (success 텍스트)
    'on-warning': '#543A0D', // 매우 진한 브라운 (warning 텍스트)
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

// CSS 변수로 폰트 정의
document.documentElement.style.setProperty('--font-heading', '"Pretendard Variable", "Noto Sans KR", sans-serif')
document.documentElement.style.setProperty('--font-body', '"Pretendard Variable", "Noto Sans KR", sans-serif')

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
      rounded: '0',
      class: 'font-body',
      VCardTitle: {
        class: 'font-heading'
      },
      VCardText: {
        class: 'font-body'
      }
    },
    VBtn: {
      rounded: '0',
      elevation: 0,
      fontWeight: 500,
      class: 'font-body'
    },
    VTextField: {
      variant: 'outlined',
      density: 'comfortable',
      rounded: '0',
      class: 'font-body'
    },
    VTextarea: {
      variant: 'outlined',
      density: 'comfortable',
      rounded: '0',
      class: 'font-body'
    },
    VSelect: {
      variant: 'outlined',
      density: 'comfortable',
      rounded: '0',
      class: 'font-body'
    },
    VChip: {
      rounded: '0',
      class: 'font-body'
    },
    VAlert: {
      rounded: '0',
      VAlertTitle: {
        class: 'font-heading'
      }
    },
    VAppBar: {
      VToolbarTitle: {
        class: 'font-heading'
      }
    },
    VList: {
      class: 'font-body',
      VListItemTitle: {
        class: 'font-heading'
      },
      VListItemSubtitle: {
        class: 'font-body'
      }
    },
    VToolbar: {
      VToolbarTitle: {
        class: 'font-heading'
      }
    },
    VNavigationDrawer: {
      class: 'font-body'
    },
    VMenu: {
      class: 'font-body'
    },
    VDialog: {
      VDialogTitle: {
        class: 'font-heading'
      }
    },
    typography: {
      class: 'font-body',
      h1: { class: 'font-heading' },
      h2: { class: 'font-heading' },
      h3: { class: 'font-heading' },
      h4: { class: 'font-heading' },
      h5: { class: 'font-heading' },
      h6: { class: 'font-heading' },
      subtitle1: { class: 'font-body' },
      subtitle2: { class: 'font-body' },
      body1: { class: 'font-body' },
      body2: { class: 'font-body' },
      button: { class: 'font-body' },
      caption: { class: 'font-body' },
      overline: { class: 'font-body' }
    }
  },
}) 