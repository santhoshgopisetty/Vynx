import { create } from 'zustand';
import { currentUser } from '../mock/users';

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,

  login: (email, password) => {
    // Mock login
    set({ user: currentUser, isAuthenticated: true });
    return { success: true };
  },

  register: (data) => {
    // Mock register
    const newUser = {
      ...currentUser,
      username: data.username,
      email: data.email,
      secretCode: `${data.username.substring(0, 3).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 4).toUpperCase()}`,
    };
    set({ user: newUser, isAuthenticated: true });
    return { success: true, secretCode: newUser.secretCode };
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },

  updateProfile: (data) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...data } : null,
    }));
  },
}));

export default useAuthStore;
