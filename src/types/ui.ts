// UI関連の型定義
export type Translations = {
  [key: string]: any;
}

export type NavigationLink = {
  href: string;
  label: string;
  icon?: React.ReactNode;
  children?: NavigationLink[];
}

export type BreadcrumbItem = {
  label: string;
  href?: string;
} 