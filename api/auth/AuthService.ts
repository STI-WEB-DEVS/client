export interface LoginResponse {
	token: string;
	user: {
		uuid: string;
		role: string;
		[key: string]: any;
	};
}

export class AuthService {
	async login(email: string, password: string): Promise<LoginResponse> {
		const runtimeConfig = useRuntimeConfig();

		try {
			return await $fetch<LoginResponse>("/login", {
				baseURL: runtimeConfig.public.apiBaseURL,
				method: "POST",
				headers: {
					Accept: "application/json",
				},
				body: {
					email,
					password,
				},
			});
		} catch (error: any) {
			const status = error?.response?.status;
			const message =
				error?.response?._data?.message ||
				error?.data?.message ||
				error?.message;

			switch (status) {
				case 400:
				case 401:
				case 404:
					throw new Error(
						message ||
							"API endpoint not found. Please check your API_BASE_URL configuration.",
					);
				case 422:
				case 429:
					throw new Error(message || "Validation or Request Error");
				case 500:
					throw new Error(
						"Server error. Please try again or contact the administrator.",
					);
				default:
					throw new Error(message || "Something went wrong. Please try again.");
			}
		}
	}

	async logout() {
		const runtimeConfig = useRuntimeConfig();
		try {
			const token = localStorage.getItem("_token");
			const response = await fetch(
				`${runtimeConfig.public.apiBaseURL}/logout`,
				{
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${token}`,
						Accept: "application/json",
					},
				},
			);

			if (response.ok) {
				localStorage.removeItem("_token");
				localStorage.removeItem("_uuid");
				localStorage.removeItem("_role");
				return true;
			}
			return false;
		} catch (error) {
			console.error("Network error", error);
			return false;
		}
	}
}
export default new AuthService();
