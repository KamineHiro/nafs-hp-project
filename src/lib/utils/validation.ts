// バリデーション関連のユーティリティ
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isStrongPassword = (password: string): boolean => {
  // 8文字以上、大文字・小文字・数字・特殊文字を含む
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const validateRequired = (value: string): string | null => {
  return value.trim() === '' ? '必須項目です' : null;
};

export const validateMinLength = (value: string, minLength: number): string | null => {
  return value.length < minLength ? `${minLength}文字以上で入力してください` : null;
}; 