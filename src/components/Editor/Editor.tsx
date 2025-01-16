import React, { useEffect, useRef } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.bubble.css'

interface EditorProps {
  theme?: string
  placeholder?: string
  value?: string
  onBlur?: (content: string) => void
}

const Editor: React.FC<EditorProps> = React.memo(
  ({
    theme = 'bubble',
    placeholder = 'Start writing here...',
    value,
    onBlur
  }) => {
    const editorRef = useRef<HTMLDivElement | null>(null)
    const quillInstance = useRef<Quill | null>(null)

    useEffect(() => {
      if (!editorRef.current || quillInstance.current) return

      // Initialize Quill instance
      quillInstance.current = new Quill(editorRef.current, {
        theme,
        placeholder,
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }]
          ]
        }
      })

      // Trigger onBlur when editor loses focus
      quillInstance.current.on('selection-change', (range) => {
        if (range === null) {
          const content = quillInstance.current?.root.innerHTML || ''
          onBlur?.(content)
        }
      })

      return () => {
        quillInstance.current = null // Cleanup instance on unmount
      }
    }, [theme, placeholder, onBlur])

    // Synchronize content when value changes
    useEffect(() => {
      if (quillInstance.current && value !== undefined) {
        if (quillInstance.current.root.innerHTML !== value) {
          quillInstance.current.root.innerHTML = value
        }
      }
    }, [value])

    return (
      <div
        ref={editorRef}
        style={{
          height: '300px',
          border: '1px solid #ccc',
          borderRadius: '4px'
        }}
      />
    )
  }
)

Editor.displayName = 'Editor'

export default Editor
