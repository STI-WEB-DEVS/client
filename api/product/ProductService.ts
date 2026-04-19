import BaseService from '../BaseService'

class ProductService extends BaseService {
  constructor() {
    super('/products')
  }

  async list(params?: any) {
    return this.get('', { params })
  }

  async get(uuid: string) {
    return this.get(`/${uuid}`)
  }

  async create(data: any) {
    return this.post('', data)
  }

  async update(uuid: string, data: any) {
    return this.put(`/${uuid}`, data)
  }

  async delete(uuid: string) {
    return this.delete(`/${uuid}`)
  }
}

export default new ProductService()