import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type AuthStore = {
  token: string|null
  accountId: string|null
  country: string|null
  language: string|null
  resultUnit: string
  setCountry: (value: string) => void
  setLanguage: (value: string) => void
  setResultUnit: (value: string) => void
  login: (token: string, country: string, language: string, accountId: string) => void
  logout: () => void
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      accountId: null,
      country: null,
      language: null,
      resultUnit: 'mg/dL',
      login: (token: string, country: string, language: string, accountId: string) => set(() => ({ token, country, language, accountId })),
      logout: () => set(() => ({ token: null })),
      setCountry: (value) => set(() => ({ country: value })),
      setLanguage: (value) => set(() => ({ language: value })),
      setResultUnit: (value) => set(() => ({ resultUnit: value })),
    }), {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    },
  )
)

export {
  useAuthStore
}
