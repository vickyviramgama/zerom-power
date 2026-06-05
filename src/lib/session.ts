import type { SessionOptions } from 'iron-session'

export interface SessionData {
  isAdmin?: boolean
  username?: string
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET || 'xerom_power_super_secret_session_key_2024_change_me_please',
  cookieName: 'xerom_admin_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 8,
  },
}
