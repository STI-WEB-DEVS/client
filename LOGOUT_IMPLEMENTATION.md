# Logout Implementation (Backend + Frontend)

## 1) Laravel logout controller method

**File:** `app/Http/Controllers/AuthController.php`

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function logout(Request $request): JsonResponse
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'message' => 'Unauthenticated.'
            ], 401);
        }

        // Delete only the current access token from personal_access_tokens
        $currentToken = $user->currentAccessToken();

        if ($currentToken) {
            $currentToken->delete();
        }

        return response()->json([
            'message' => 'Logged out successfully.'
        ], 200);
    }
}
```

### Route (api.php)

```php
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->delete('/logout', [AuthController::class, 'logout']);
```

---

## 2) AuthService.ts logout function

**File:** `api/auth/AuthService.ts`

```ts
export interface LogoutResponse {
  success: boolean;
  status: number;
  message?: string;
}

export class AuthService {
  async logout(): Promise<LogoutResponse> {
    const runtimeConfig = useRuntimeConfig();
    const token = typeof window !== 'undefined' ? localStorage.getItem('_token') || '' : '';

    const response = await $fetch.raw('/logout', {
      baseURL: runtimeConfig.public.apiBaseURL,
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
    });

    return {
      success: response.status >= 200 && response.status < 300,
      status: response.status,
      message: (response._data as any)?.message,
    };
  }
}
```

---

## 3) Call logout from default layout when Sign Out is clicked

**File:** `layouts/default.vue`

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { AuthService } from '~/api/auth/AuthService';

const router = useRouter();
const authService = new AuthService();

const showLogoutConfirm = ref(false);
const isLoggingOut = ref(false);

const confirmLogout = async () => {
  isLoggingOut.value = true;

  try {
    const response = await authService.logout();

    // Only if backend logout succeeded
    if (response.success) {
      localStorage.removeItem('_token');
      showLogoutConfirm.value = false;
      await router.replace('/');
    }
  } catch (error) {
    console.error('Logout failed:', error);
  } finally {
    isLoggingOut.value = false;
  }
};
</script>
```

Button binding example:

```vue
<button type="button" @click="confirmLogout">Sign out</button>
```

---

## Expected behavior

1. User clicks **Sign out**.
2. Frontend calls `DELETE /logout`.
3. Backend deletes current token from `personal_access_tokens`.
4. If status is success (`2xx`):
   - remove `_token` from localStorage
   - redirect user to login page (`/`)
5. If request fails: keep token, stay on page.

When user manually revisits protected pages after successful logout, API should return:

```json
{
  "message": "Unauthenticated."
}
```
