export const INSTAGRAM_URL =
  'https://www.instagram.com/sg_bbeauty?igsh=cXdneGdvNjY2cjZu'

export const BOOKING_URL = 'https://www.vagaro.com/sgbeauty1/services'

export function openExternal(url: string) {
  const openedWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (openedWindow) openedWindow.opener = null
}
