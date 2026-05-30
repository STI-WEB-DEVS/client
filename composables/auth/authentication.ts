import { ref } from "vue";
import { AuthService } from "~/api/auth/AuthService";

export const useAuthentication = () => {
const email = ref("");
const password = ref("");
const error = ref("");
const isLoading = ref(false);
 
const authService = new AuthService();
 
const handleSubmit = async () => {
  error.value = "";
  isLoading.value = true;
 
  try {
    const response = await authService.login(email.value, password.value);
 
    if (response?.token) {
      localStorage.setItem("_token", response.token);
    }
 
    // // if (response?.user.customer_uuid) {
    // //   localStorage.setItem("_uuid", response.user.customer_uuid);
    // // } else if (response?.user.uuid) {
    // //   localStorage.setItem("_uuid", response.user.uuid);
    // // }
 
    // /// if (response?.user.role) {
    // //   localStorage.setItem("_role", response.user.role);
    // // }
 
    // await navigateTo("/admin/dashboard");
 
    await navigateTo(
      response.user.role === "admin" ? "/admin/dashboard" : "/dashboard",
    );
  } catch (err: any) {
    error.value = err?.message || "";
  } finally {
    isLoading.value = false;
  }
};

return {
    email,
    password,
    error,
    isLoading,
    handleSubmit,
  };
}