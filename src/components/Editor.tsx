// EditorPropsインターフェースを拡張
interface CustomEditorProps {
  value: string;
  onChange: (value: string) => void;
  onImageUpload?: (file: File) => Promise<string>;
}

export default function Editor({ value, onChange }: CustomEditorProps) {
  // JSX要素を返す
  return (
    <div className="editor-container">
      {/* エディターのコンテンツ */}
      <textarea 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-64 p-2 border rounded"
      />
    </div>
  );
} 