import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:5002");

// Save token key
const TOKEN_KEY = 'elearn_token';

export const authenticate = async (email, password) => {
  try {
    const authData = await pb.collection('users').authWithPassword(email, password);

    // Save token as a cookie
    document.cookie = `${TOKEN_KEY}=${authData.token}; path=/`;

    return authData;
  } catch (error) {
    throw new Error("Authentication failed");
  }
};

export const logout = () => {
  // Clear token
  localStorage.removeItem(TOKEN_KEY);
  document.cookie = `${TOKEN_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  // Clear auth data
  pb.authStore.clear();
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const isAuthenticated = () => pb.authStore.isValid;

export const getUserId = () => pb.authStore.model.id;
