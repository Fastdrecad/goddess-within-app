export const BASE_URL = "https://goddess-within.andrijadesign.com/api";

// export const BASE_URL =
//   !import.meta.env.MODE || import.meta.env.MODE === "development"
//     ? "http://localhost:3000/api" // Use local URL in development
//     : import.meta.env.VITE_API_URL; // Use production URL in other environments

// Product-related endpoints
export const PRODUCTS_URL = `${BASE_URL}/products`;
export const BRANDS_URL = `${BASE_URL}/brands`;
export const CATEGORIES_URL = `${BASE_URL}/categories`;

// User-related endpoints
export const AUTH_URL = `${BASE_URL}/auth`;
export const USERS_URL = `${BASE_URL}/users`;

// Order-related endpoints
export const ORDERS_URL = `${BASE_URL}/orders`;
export const PAYPAL_URL = `${BASE_URL}/config/paypal`;

// Upload endpoint
export const UPLOAD_URL = `${BASE_URL}/upload`;
