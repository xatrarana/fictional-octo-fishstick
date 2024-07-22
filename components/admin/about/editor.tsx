'use client';
import { Editor } from '@tinymce/tinymce-react';

type CustomEditorProps = {
    onChange: (...event: any[]) => void;
    name: string;
    id: string;
    initialContent?: string;
    
}

const CustomEditor: React.FC<CustomEditorProps> = ({ onChange, name, id ,initialContent}) => (
  <Editor
    apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
    onEditorChange={onChange}
    init={{
      plugins: "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
      toolbar: "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
      tinycomments_mode: "embedded",
      tinycomments_author: "Author name",
      mergetags_list: [
        { value: "First.Name", title: "First Name" },
        { value: "Email", title: "Email" }
      ],
      ai_request: (request: any, respondWith: any) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant"))
    }}
    initialValue={initialContent}
    textareaName={name}
    id={id}
  />
);

export default CustomEditor;

