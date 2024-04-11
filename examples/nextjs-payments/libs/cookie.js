export const COOKIE_NAME = 'nextjs-payments-jwt'
export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  maxAge: 60 * 60 * 24 * 30 * 5,
}
