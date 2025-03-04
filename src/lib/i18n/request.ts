import { getRequestConfig } from "next-intl/server"
// import { locales as importedLocales, defaultLocale as importedDefaultLocale } from "../i18n"

// 有効なロケールを型として定義
type ValidLocale = "ja" | "en" | "zh";

// ローカル変数として再定義
const locales: ValidLocale[] = ["ja", "en", "zh"];
const defaultLocale: ValidLocale = "ja";

// デフォルトエクスポート
export default getRequestConfig(async ({ locale }) => {
  return {
    messages: (await import(`../../../messages/${locale}.json`)).default
  };
});

// 名前を変更して競合を避ける
export function getCustomRequestConfig({ locale }: { locale: string }): Record<string, unknown> {
  return {
    locale,
    messages: {} // 実際の実装に合わせて修正
  };
}

export function getValidLocale(locale?: string): ValidLocale {
  // ロケールが無効な場合はデフォルトを使用
  if (!locale || !locales.includes(locale as ValidLocale)) {
    return defaultLocale;
  }
  
  return locale as ValidLocale;
}