import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Navigation from '@/components/Navigation/Navigation'
import { NextIntlClientProvider } from 'next-intl'

// テスト用のメッセージ
const messages = {
  nav: {
    home: 'ホーム',
    courses: 'コース',
    about: '学校紹介',
    contact: 'お問い合わせ',
    adminLogin: '管理者ログイン',
    selectLanguage: '言語を選択'
  }
};

// テスト用のラッパーコンポーネント
const renderWithIntl = (component: React.ReactNode) => {
  return render(
    <NextIntlClientProvider locale="ja" messages={messages}>
      {component}
    </NextIntlClientProvider>
  );
};

describe('Navigation', () => {
  it('renders navigation links correctly', () => {
    renderWithIntl(<Navigation />);
    
    expect(screen.getByText('ホーム')).toBeInTheDocument();
    expect(screen.getByText('コース')).toBeInTheDocument();
    expect(screen.getByText('学校紹介')).toBeInTheDocument();
  });
  
  it('toggles mobile menu when button is clicked', async () => {
    renderWithIntl(<Navigation />);
    
    const menuButton = screen.getByLabelText(/メニューを開く/i);
    await userEvent.click(menuButton);
    
    expect(screen.getByRole('navigation')).toHaveClass('md:hidden');
  });
}); 