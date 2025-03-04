declare module '@uiw/react-md-editor' {
  import * as React from 'react';

  export interface ICommand {
    name?: string;
    keyCommand?: string;
    buttonProps?: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
    icon?: React.ReactNode;
    execute?: (
      text: string,
      selection: { start: number; end: number },
    ) => { text: string; selection: { start: number; end: number } };
  }

  export interface MDEditorProps {
    value?: string;
    onChange?: (value?: string) => void;
    commands?: Array<ICommand | string>;
    height?: number;
    visibleDragbar?: boolean;
    highlightEnable?: boolean;
    preview?: 'live' | 'edit' | 'preview';
    fullscreen?: boolean;
    overflow?: boolean;
    maxHeight?: number;
    minHeight?: number;
    autoFocus?: boolean;
    previewOptions?: {
      skipHtml?: boolean;
      escapeHtml?: boolean;
      linkTarget?: string | ((href: string) => string);
    };
    textareaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
    tabSize?: number;
    defaultTabEnable?: boolean;
    imageUploadFn?: (file: File) => Promise<string>;
  }

  const MDEditor: React.ForwardRefExoticComponent<MDEditorProps & React.RefAttributes<HTMLDivElement>> & {
    Markdown: React.FC<{ source: string }>;
  };

  export default MDEditor;
} 