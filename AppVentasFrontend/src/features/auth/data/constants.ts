export const AUTH_ROUTES = {
  login: "/navigation/auth/login",
  register: "/navigation/auth/register",
  dashboard: "/navigation/home",
  forgotPassword: "/navigation/auth/forgot-password",
};

export const ADMIN_REDIRECT = {
  email: "admin@admin.com",
  destination: "http://localhost:3004/navigation/seller/dashboard/page",
};

export const AUTH_API = {
  baseUrl: (process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8009").replace(/\/$/, ""),
  loginPath: "/api/auth/login",
  registerPath: "/api/auth/register",
};

export const TOKEN_KEYS = {
  access: "access_token",
  refresh: "refresh_token",
  userId: "user_id",
  legacy: "auth_token",
};

export const LOGIN_INITIAL_VALUES = {
  email: "",
  password: "",
  rememberMe: false,
};

export const REGISTER_INITIAL_VALUES = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
};

export const PASSWORD_MIN_LENGTH = 8;

export const ERROR_MESSAGES = {
  required: "Este campo es requerido",
  invalidEmail: "Ingresa un correo valido",
  passwordTooShort: `Minimo ${PASSWORD_MIN_LENGTH} caracteres`,
  passwordMismatch: "Las contrasenas no coinciden",
  termsRequired: "Debes aceptar los terminos",
};
