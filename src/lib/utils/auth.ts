import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../types/JwtPayload';

export function hasToken(): boolean {
  const token = Cookies.get('auth_token');
  return !!token;
}

export const getDecodedToken = (): JwtPayload | null => {
  const token = Cookies.get('auth_token');
  if (!token) return null;

  try {
    return jwtDecode<JwtPayload>(token);
  } catch (error: unknown) {
    console.error('Failed to decode token:', error);
    return null;
  }
}

export const isTokenExpired = (): boolean => {
  const token = getDecodedToken();
  if (!token) return true;

  const now = Date.now() / 1000;
  return token.exp < now;
}

export const isAdminToken = (): boolean => {
  const token = getDecodedToken();
  if (!token || isTokenExpired()) return false;

  return token.role === 'admin';
}