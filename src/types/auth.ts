// 認証関連の型定義
export type User = {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  createdAt: string;
  updatedAt: string;
}

export type LoginCredentials = {
  username: string;
  password: string;
}

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
} 