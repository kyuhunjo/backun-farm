/**
 * plugins/webfontloader.js
 *
 * webfontloader documentation: https://github.com/typekit/webfontloader
 */

export async function loadFonts () {
  const webFontLoader = await import('webfontloader')

  webFontLoader.load({
    google: {
      families: [
        'Noto+Sans+KR:100,300,400,500,700,900',
        'Nanum+Myeongjo:400,700,800'
      ],
    },
  })
} 