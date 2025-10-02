import { useAuthStore } from '../store/auth';

export function useAuth() {
  const token = useAuthStore((s) => s.token);
  const isAuthenticated = Boolean(token);
  return { token, isAuthenticated };
}
