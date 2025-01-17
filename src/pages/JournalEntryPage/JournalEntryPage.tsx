import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Editor from 'components/Editor/Editor'
import { useNavigate } from '@tanstack/react-router' // Use tanstack router for navigation

interface JournalEntryForm {
  title: string
  content: string
  status: 'draft' | 'published'
}

const JournalEntryPage: React.FC = () => {
  const navigate = useNavigate()
  const { control, handleSubmit, register } = useForm<JournalEntryForm>({
    defaultValues: {
      title: '',
      content: '',
      status: 'draft'
    }
  })

  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

  const handleSave = async (data: JournalEntryForm, publish = false) => {
    setError(null)
    setSuccess(false)

    const apiPath = 'http://127.0.0.1:8000/api/v1/journals'

    try {
      const response = await fetch(apiPath, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          ...data,
          status: publish ? 'published' : 'draft'
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to save journal entry')
      }

      const responseData = await response.json()

      setSuccess(true)
      navigate({
        to: '/journals/$id',
        params: { id: responseData.journal.id.toString() }
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  return (
    <div className="p-8">
      <form onSubmit={handleSubmit((data) => handleSave(data, true))}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            {...register('title', { required: 'Title is required' })}
            id="title"
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter a title"
          />
        </div>

        <div className="mb-4">
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <Editor
                value={field.value} // Bind the editor content to form value
                placeholder="Write your journal entry here..."
                onChange={(content) => field.onChange(content)} // Update form state on every keystroke
              />
            )}
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        {success && (
          <p className="text-sm text-green-500">
            Journal entry published successfully! Redirecting...
          </p>
        )}

        <button
          type="submit"
          className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Save & Publish
        </button>
      </form>
    </div>
  )
}

export default JournalEntryPage
