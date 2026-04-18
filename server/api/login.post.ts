export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;

  // Mock authentication logic
  // In a real app, you would verify this against a database
  if (email && password) {
    // Return a mock token and user info
    return {
      token: 'mock-jwt-token-' + Math.random().toString(36).substring(2, 15),
      user: {
        id: 1,
        email: email,
        name: email.split('@')[0],
      }
    };
  }

  throw createError({
    statusCode: 401,
    statusMessage: 'Invalid credentials. Please use any email and password for this mock.',
  });
});
