/**
 * API Utility for ContentForge
 */

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

/**
 * Get the full URL for an API endpoint
 */
export const getApiUrl = (endpoint: string) => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_URL}${cleanEndpoint}`;
};

/**
 * Standard fetch options with auth token
 */
export const getAuthHeaders = (token: string | null) => {
  return {
    "Content-Type": "application/json",
    ...(token ? { "Authorization": `Bearer ${token}` } : {})
  };
};
