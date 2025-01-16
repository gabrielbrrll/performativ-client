import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Editor from 'components/Editor/Editor'
import { Route } from 'routes/_authenticated/journals/create'

interface JournalEntryForm {
  title: string
  content: string
  status: 'draft' | 'published'
}

const JournalEntryPage: React.FC = () => {
  const { title = '' } = Route.useSearch()

  const { control, handleSubmit, register, setValue } =
    useForm<JournalEntryForm>({
      defaultValues: {
        title: title,
        content: '',
        status: 'draft'
      }
    })

  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)
  const [status, setStatus] = useState<'draft' | 'published'>('draft')
  const [journalId, setJournalId] = useState<number | null>(null)

  const handleSave = async (data: JournalEntryForm, publish = false) => {
    setError(null)
    setSuccess(false)

    const apiPath = journalId
      ? `http://127.0.0.1:8000/api/v1/journals/${journalId}`
      : 'http://127.0.0.1:8000/api/v1/journals'
    const method = journalId ? 'PUT' : 'POST'

    try {
      const response = await fetch(apiPath, {
        method,
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
      setStatus(publish ? 'published' : 'draft')
      setJournalId(responseData.journal.id)
      setValue('status', publish ? 'published' : 'draft')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">Create a New Journal Entry</h1>

      <div className="mb-4">
        <span
          className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
            status === 'published'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {status === 'published' ? 'Published' : 'Draft'}
        </span>
      </div>
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
            Journal entry {journalId ? 'updated' : 'published'} successfully!
          </p>
        )}

        <button
          type="submit"
          className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {journalId ? 'Update' : 'Save'} & Publish
        </button>
      </form>
    </div>
  )
}

export default JournalEntryPage
