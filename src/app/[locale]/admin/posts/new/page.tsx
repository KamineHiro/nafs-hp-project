import { getTranslations } from 'next-intl/server'
import PostEditorClient from '@/components/Editor/PostEditorClient'

export const dynamic = 'force-dynamic';

export default async function NewPostPage() {
  const t = await getTranslations('admin.posts');
  
  // 必要な翻訳データを抽出（不足しているプロパティを追加）
  const translations = {
    title: t('new.title'),
    titleLabel: t('form.titleLabel'),
    contentLabel: t('form.contentLabel'),
    saveButton: t('form.saveButton'),
    saving: t('form.saving'),
    errorMessage: t('form.errorMessage'),
    successMessage: t('form.successMessage'),
    // 不足しているプロパティを追加
    previewToggle: t('form.previewToggle'),
    backToList: t('form.backToList'),
    thumbnailLabel: t('form.thumbnailLabel'),
    thumbnailHint: t('form.thumbnailHint'),
    publishedLabel: t('form.publishedLabel'),
    draftSaved: t('form.draftSaved')
  };
  
  return <PostEditorClient translations={translations} isNew={true} />;
} 