'use client';
import { Editor } from '@tinymce/tinymce-react';

type CustomEditorProps = {
    onChange: (...event: any[]) => void;
    name: string;
    id: string;
    initialContent?: string;
    height?: number;
    
}

const CustomEditor: React.FC<CustomEditorProps> = ({ onChange, name, id ,initialContent,height=400}) => (
  <Editor
    apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
    onEditorChange={onChange}
    init={{
      height: height,
      menubar: false,
      plugins: [
        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
        'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
      ],
      toolbar: 'undo redo | blocks | ' +
        'bold italic forecolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat | help',
      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
    }}
    initialValue={initialContent}
    textareaName={name}
    id={id}
  />
);

export default CustomEditor;

