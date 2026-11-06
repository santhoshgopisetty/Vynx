import useAuthStore from '../store/authStore';

export default function useMockAuth() {
  const { user, isAuthenticated, login, register, logout, updateProfile } = useAuthStore();

  return {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
  };
}
