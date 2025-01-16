import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Editor from 'components/Editor/Editor'

interface JournalEntryForm {
  title: string
  content: string
  status: 'draft' | 'published'
}

const JournalEntryPage: React.FC = () => {
  const { control, handleSubmit, register, reset } = useForm<JournalEntryForm>({
    defaultValues: {
      title: '',
      content: '',
      status: 'draft'
    }
  })

  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

  const onSubmit = async (data: JournalEntryForm) => {
    setError(null)
    setSuccess(false)

    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/journals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}` // Include Bearer token
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to save journal entry')
      }

      setSuccess(true) // Show success feedback
      reset() // Clear the form
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">Create a New Journal Entry</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Title Field */}
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

        {/* Editor Field */}
        <div className="mb-4">
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <Editor
                value={field.value} // Bind the editor content to form value
                placeholder="Write your journal entry here..."
                onBlur={(content) => field.onChange(content)} // Update form state on blur
              />
            )}
          />
        </div>

        {/* Error Feedback */}
        {error && <p className="text-sm text-red-500">{error}</p>}

        {/* Success Feedback */}
        {success && (
          <p className="text-sm text-green-500">
            Journal entry saved successfully!
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Save Entry
        </button>
      </form>
    </div>
  )
}

export default JournalEntryPage
