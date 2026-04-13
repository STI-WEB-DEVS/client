
export class BaseService {

  async request<T>(url: string, method: string, data: object = {}): Promise<T> {

    const runtimeConfig = useRuntimeConfig();

    const token = useCookie('auth_token'); // Nuxt helper: works on SSR and Client



    const options: any = {

      baseURL: runtimeConfig.public.apiBaseURL,

      method,

      headers: {

        Accept: 'application/json',

        ...(token.value && { Authorization: `Bearer ${token.value}` }),

      },

    };



    if (method.toUpperCase() === 'GET') {

      options.params = data;

    } else {

      options.body = data;

    }



    try {

      const response = await $fetch<T>(url, options);



      // Handle token storage for Auth calls

      if ((url.includes('login') || url.includes('register')) && (response as any).token) {

        token.value = (response as any).token;

      }



      return response;

    } catch (error: any) {

      const status = error.response?.status;

      

      if (status === 401) {

        token.value = null; // Clear cookie

        throw new Error("Session expired.");

      }

      

      // ... rest of your error handling

      throw error;

    }

  }

}