import axios from 'axios'

export const useProduct = () => {
  const config = useRuntimeConfig()
  
  // State
  const products = ref<any[]>([])
  const meta = ref({
    current_page: 1,
    last_page: 1,
    per_page: 15,
    total: 0,
    from: 0,
    to: 0
  })
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Get auth token
  const getAuthToken = () => {
    // Adjust this based on how you store your token
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    return token
  }

  // Fetch all products (paginated)
  const fetchProducts = async (page: number = 1) => {
    loading.value = true
    error.value = null
    
    try {
      const token = getAuthToken()
      const response = await axios.get(`/api/products?page=${page}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      })
      
      products.value = response.data.data
      meta.value = response.data.meta
      
      return { products: products.value, meta: meta.value }
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch products'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Fetch single product by UUID
  const fetchProduct = async (uuid: string) => {
    loading.value = true
    error.value = null
    
    try {
      const token = getAuthToken()
      const response = await axios.get(`/api/products/${uuid}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      })
      
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch product'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Create new product
  const createProduct = async (productData: {
    name: string
    description?: string
    price: number
    stock_quantity: number
  }) => {
    loading.value = true
    error.value = null
    
    try {
      const token = getAuthToken()
      const response = await axios.post('/api/products', productData, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      })
      
      await fetchProducts()
      return response.data
    } catch (err: any) {
      if (err.response?.data?.errors) {
        error.value = Object.values(err.response.data.errors).flat().join(', ')
        throw err.response.data.errors
      }
      error.value = err.response?.data?.message || 'Failed to create product'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Update product with restock
  const updateProduct = async (uuid: string, productData: {
    name?: string
    description?: string
    price?: number
    restock_quantity?: number
  }) => {
    loading.value = true
    error.value = null
    
    try {
      const token = getAuthToken()
      const response = await axios.put(`/api/products/${uuid}`, productData, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      })
      
      await fetchProducts()
      return response.data
    } catch (err: any) {
      if (err.response?.data?.errors) {
        error.value = Object.values(err.response.data.errors).flat().join(', ')
        throw err.response.data.errors
      }
      error.value = err.response?.data?.message || 'Failed to update product'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Delete product
  const deleteProduct = async (uuid: string) => {
    loading.value = true
    error.value = null
    
    try {
      const token = getAuthToken()
      const response = await axios.delete(`/api/products/${uuid}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      })
      
      await fetchProducts()
      return response.data
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to delete product'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Validate product name (no numbers)
  const validateProductName = (name: string): string | null => {
    const hasNumber = /\d/.test(name)
    if (hasNumber) {
      return 'Product name should not contain numbers'
    }
    if (name.trim().length < 2) {
      return 'Product name must be at least 2 characters'
    }
    return null
  }

  // Validate price
  const validatePrice = (price: number): string | null => {
    if (price < 0) {
      return 'Price cannot be negative'
    }
    if (price === 0) {
      return 'Price must be greater than 0'
    }
    return null
  }

  // Validate stock quantity
  const validateStock = (stock: number): string | null => {
    if (stock < 0) {
      return 'Stock cannot be negative'
    }
    return null
  }

  // Calculate new stock after restock
  const calculateNewStock = (currentStock: number, restockQuantity: number): number => {
    return currentStock + restockQuantity
  }

  return {
    // State
    products,
    meta,
    loading,
    error,
    
    // Methods
    fetchProducts,
    fetchProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    
    // Validators
    validateProductName,
    validatePrice,
    validateStock,
    calculateNewStock
  }
}