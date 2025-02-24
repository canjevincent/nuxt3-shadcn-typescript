declare module '#auth-utils' {
  interface User {
    id: string
    email: string
    role: 'USER' | 'ADMIN'
    name: string
    avatarUrl: string
  }

  interface UserSession {

  }

  interface SecureSessionData {

  }
}