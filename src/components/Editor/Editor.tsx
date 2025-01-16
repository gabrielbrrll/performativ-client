import React, { useEffect, useRef } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.bubble.css'

interface EditorProps {
  value?: string
  placeholder?: string
  onChange?: (content: string) => void
}

const Editor: React.FC<EditorProps> = ({ value, placeholder, onChange }) => {
  const editorRef = useRef<HTMLDivElement | null>(null)
  const quillInstance = useRef<Quill | null>(null)

  useEffect(() => {
    if (!editorRef.current) return

    if (!quillInstance.current) {
      quillInstance.current = new Quill(editorRef.current, {
        theme: 'bubble',
        placeholder,
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }]
          ]
        }
      })

      quillInstance.current.on('text-change', () => {
        const content = quillInstance.current?.root.innerHTML || ''
        onChange?.(content)
      })
    }

    if (value !== undefined && quillInstance.current) {
      if (quillInstance.current.root.innerHTML !== value) {
        quillInstance.current.root.innerHTML = value
      }
    }
  }, [placeholder, value, onChange])

  return (
    <div
      ref={editorRef}
      style={{ height: '300px', border: '1px solid #ccc', borderRadius: '4px' }}
    />
  )
}

export default Editor
