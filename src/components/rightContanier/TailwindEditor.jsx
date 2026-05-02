import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEmail } from '../../Context/EmailProvider';

const TailwindEditor = () => {
  const { body, setBody } = useEmail();

  const editor = useEditor({
    extensions: [StarterKit],
    content: body, // Initial content from context
    editorProps: {
      attributes: {
        // 'prose' makes standard HTML tags look beautiful with Tailwind
        class: 'prose prose-sm sm:prose-base max-w-none focus:outline-none min-h-[150px] p-3 bg-white border border-gray-300 rounded-b-lg',
      },
    },
    onUpdate: ({ editor }) => {
      // Every time the user types, it updates the global Context 'body'
      setBody(editor.getHTML());
    },
  });

  if (!editor) return null;

  // Simple Toolbar Button Component
  const ToolbarBtn = ({ onClick, active, label }) => (
    <button
      type="button"
      onClick={() => onClick()}
      className={`px-3 py-1.5 text-xs font-bold rounded transition-all ${
        active ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-gray-100 border border-gray-200'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="w-full flex flex-col rounded-lg overflow-y-auto max-h-47 border border-gray-300">
      {/* TOOLBAR */}
      <div className="flex flex-wrap items-center gap-2 p-2 bg-slate-50 border-b border-gray-300">
        <ToolbarBtn 
          label="B" 
          onClick={() => editor.chain().focus().toggleBold().run()} 
          active={editor.isActive('bold')} 
        />
        <ToolbarBtn 
          label="I" 
          onClick={() => editor.chain().focus().toggleItalic().run()} 
          active={editor.isActive('italic')} 
        />
        <ToolbarBtn 
          label="List" 
          onClick={() => editor.chain().focus().toggleBulletList().run()} 
          active={editor.isActive('bulletList')} 
        />
        <button
          type="button"
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          className="px-3 py-1.5 text-xs text-red-500 hover:bg-red-50 rounded"
        >
          Clear Style
        </button>
      </div>

      {/* TEXT AREA */}
      <EditorContent  editor={editor} />
    </div>
  );
};

export default TailwindEditor;