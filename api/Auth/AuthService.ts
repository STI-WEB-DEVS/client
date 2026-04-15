import { BaseService } from "../BaseService";

const base = new BaseService();

export const AuthService = {
	async login(email: string, password: string) {
		const res: any = await base.request("/login", "POST", {
			email,
			password,
		});

		const token = res.token;

		if (!token) {
			throw new Error("Token not found in response");
		}

		localStorage.setItem("authToken", token);

		return res;
	},
};
