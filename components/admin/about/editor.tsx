'use client';
import React,{ useRef, useImperativeHandle } from "react";
import { Editor } from "@tinymce/tinymce-react";

const CustomEditor = React.forwardRef((props, ref:any) => {

    useImperativeHandle(ref, () => ({
        getContent: () => {
            //@ts-ignore
            return editorRef.current ? editorRef.current.getContent() : '';
        }
    }));

    return (
        <Editor
            apiKey='5ufnn6gw2zkk2cznypfqjx3cdowlv1pcbgxx9y7p8yee4ixn'
            onInit={(evt, editor) =>( ref.current as any )= editor}
            init={{
                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                tinycomments_mode: 'embedded',
                tinycomments_author: 'Author name',
                mergetags_list: [
                    { value: 'First.Name', title: 'First Name' },
                    { value: 'Email', title: 'Email' },
                ],
                ai_request: (request:any, respondWith:any) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
            }}
            initialValue="Welcome to TinyMCE!"
        />
    );
});

export default CustomEditor;
