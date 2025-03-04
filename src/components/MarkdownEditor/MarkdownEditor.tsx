"use client";

import React from 'react';
import dynamic from 'next/dynamic';

// MDEditorをクライアントサイドのみで動的にインポート
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
  loading: () => <div style={{ height: '400px' }} className="bg-gray-100 animate-pulse rounded-md" />
});

export type MarkdownEditorProps = {
  value: string;
  onChange: (value: string) => void;
  height?: number;
  imageUploadFn?: (file: File) => Promise<string>;
};

export default function MarkdownEditor({
  value,
  onChange,
  height = 400,
  imageUploadFn,
  ...otherProps
}: MarkdownEditorProps) {
  
  // デフォルトの画像アップロード処理
  const handleImageUpload = async (file: File): Promise<string> => {
    if (imageUploadFn) {
      return imageUploadFn(file);
    }
    
    // フォールバック：ローカルURLを返す（実際の実装では適切なアップロード処理が必要）
    return URL.createObjectURL(file);
  };
  
  // MDEditorに渡すプロパティを明示的に定義
  const editorProps = {
    value,
    onChange: (newValue?: string) => {
      if (newValue !== undefined) {
        onChange(newValue);
      }
    },
    height,
    imageUploadFn: handleImageUpload,
    ...otherProps
  };
  
  return (
    <div data-color-mode="light" className="w-full">
      <MDEditor {...editorProps} />
    </div>
  );
} 