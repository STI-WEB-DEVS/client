import * as BaseModule from '~/api/BaseService'

const BaseCls: any = (BaseModule && (BaseModule.default || BaseModule))

const base = new BaseCls()

export const authService = {
  async login(payload: { email: string; password: string }) {
    return base.request('/login', 'POST', payload)
  },

  async logout() {
    const authToken = useCookie<string | null>('_token')
    authToken.value = null
    localStorage.removeItem('_token')
    return base.request('/logout', 'POST')
  },
}

export default authService

