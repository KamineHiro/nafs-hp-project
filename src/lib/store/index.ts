import { create } from 'zustand'
import { AuthState } from '@/types/auth'

// 認証状態の管理
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  
  login: async (username: string, password: string) => {
    set({ isLoading: true, error: null })
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      
      if (!response.ok) {
        throw new Error('Login failed')
      }
      
      const user = await response.json()
      set({ user, isAuthenticated: true, isLoading: false })
      return user
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Unknown error', 
        isLoading: false 
      })
      throw error
    }
  },
  
  logout: async () => {
    set({ isLoading: true })
    
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      set({ user: null, isAuthenticated: false, isLoading: false })
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Logout failed', 
        isLoading: false 
      })
    }
  },
  
  checkAuth: async () => {
    set({ isLoading: true })
    
    try {
      const response = await fetch('/api/auth/me')
      
      if (!response.ok) {
        set({ user: null, isAuthenticated: false, isLoading: false })
        return null
      }
      
      const user = await response.json()
      set({ user, isAuthenticated: true, isLoading: false })
      return user
    } catch (error) {
      set({ 
        user: null, 
        isAuthenticated: false, 
        isLoading: false 
      })
      return null
    }
  }
})) 