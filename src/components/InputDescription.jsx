import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const DescriptionForm = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    // 1. Initialize Quill if it doesn't exist
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'clean'],
          ],
        },
      });

      // 2. Initial Load: Fill editor with existing data from DB/State
      if (value) {
        quillRef.current.clipboard.dangerouslyPasteHTML(value);
      }

      // 3. The Bridge: Listen for changes and push them to React Hook Form
      quillRef.current.on('text-change', () => {
        const html = quillRef.current.getSemanticHTML();
        if (onChange) {
          onChange(html); // This notifies RHF that the value changed
        }
      });
    }
  }, []); // Only runs once on mount

  return (
    <div className="editor-wrapper">
      {/* This ref is where Quill "injects" the editor UI */}
      <div ref={editorRef} style={{ height: '200px' }} />
    </div>
  );
};

export default DescriptionForm;