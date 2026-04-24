import React, { useRef, useEffect, useState } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap, lineNumbers, highlightActiveLineGutter, highlightSpecialChars, drawSelection, dropCursor, rectangularSelection, crosshairCursor, highlightActiveLine, placeholder } from '@codemirror/view';
import { python } from '@codemirror/lang-python';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { syntaxHighlighting, defaultHighlightStyle } from '@codemirror/language';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  language?: string;
  height?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange, placeholder: placeholderText = '编写Python代码...', height = '400px' }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (editorRef.current && !viewRef.current) {
      const startState = EditorState.create({
        doc: value,
        extensions: [
          lineNumbers(),
          highlightActiveLineGutter(),
          highlightSpecialChars(),
          drawSelection(),
          dropCursor(),
          rectangularSelection(),
          crosshairCursor(),
          highlightActiveLine(),
          history(),
          syntaxHighlighting(defaultHighlightStyle),
          python(),
          keymap.of([...defaultKeymap, ...historyKeymap]),
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              onChange(update.state.doc.toString());
            }
          }),
          placeholder(placeholderText),
          EditorView.theme({
            '&': {
              height: '100%',
              fontSize: '14px',
              lineHeight: '1.5',
            },
            '.cm-content': {
              fontFamily: '"Fira Code", monospace',
              padding: '10px',
            },
            '.cm-gutters': {
              backgroundColor: '#f8f9fa',
              border: 'none',
            },
            '.cm-activeLineGutter': {
              backgroundColor: '#e9ecef',
            },
            '.cm-activeLine': {
              backgroundColor: '#f8f9fa',
            },
          }),
        ],
      });

      const view = new EditorView({
        state: startState,
        parent: editorRef.current,
      });

      viewRef.current = view;
      setIsMounted(true);
    }

    return () => {
      if (viewRef.current) {
        viewRef.current.destroy();
        viewRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (viewRef.current && isMounted && viewRef.current.state.doc.toString() !== value) {
      viewRef.current.dispatch({
        changes: {
          from: 0,
          to: viewRef.current.state.doc.length,
          insert: value,
        },
      });
    }
  }, [value, isMounted]);

  return (
    <div 
      ref={editorRef} 
      style={{ height, width: '100%' }} 
      className="border border-gray-300 rounded-md overflow-hidden"
    />
  );
};

export default CodeEditor;