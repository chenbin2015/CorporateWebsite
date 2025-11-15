const BASE_FONT_SIZE = 16
const DESIGN_WIDTH = 1440
const MIN_FONT_SIZE = 12
const MAX_FONT_SIZE = 22

const setRootFontSize = () => {
  const { clientWidth } = document.documentElement
  if (!clientWidth) {
    return
  }

  const scale = clientWidth / DESIGN_WIDTH
  const size = Math.min(Math.max(BASE_FONT_SIZE * scale, MIN_FONT_SIZE), MAX_FONT_SIZE)
  document.documentElement.style.fontSize = `${size}px`
}

export const setupRem = () => {
  setRootFontSize()

  window.addEventListener('resize', setRootFontSize)
  window.addEventListener('orientationchange', setRootFontSize)
}

export const teardownRem = () => {
  window.removeEventListener('resize', setRootFontSize)
  window.removeEventListener('orientationchange', setRootFontSize)
}

