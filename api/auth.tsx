import { ACCESS_TOKEN } from "../utils/constants";

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN);
}

export function logout() {
    localStorage.removeItem(ACCESS_TOKEN);
}
