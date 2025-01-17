import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Editor from 'components/Editor/Editor'
import { Route } from 'routes/_authenticated/journals/$id'
import { useNavigate } from '@tanstack/react-router'

interface JournalEntryForm {
  title: string
  content: string
  status: 'draft' | 'published' | 'archived'
}

const JournalUpdatePage: React.FC = () => {
  const journal = Route.useLoaderData()
  const navigate = useNavigate()

  const { control, handleSubmit, register } = useForm<JournalEntryForm>({
    defaultValues: {
      title: journal.title,
      content: journal.html_content,
      status: journal.status
    }
  })

  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

  const handleUpdate = async (data: JournalEntryForm, publish = false) => {
    setError(null)
    setSuccess(false)

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/journals/${journal.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          },
          body: JSON.stringify({
            ...data,
            status: publish ? 'published' : 'draft'
          })
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to update journal entry')
      }

      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  const handleArchive = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/journals/${journal.id}/archive`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to archive the journal')
      }

      const result = await response.json()
      if (result) {
        navigate({ to: '/journals' })
      }
    } catch (error) {
      console.error('Error archiving journal', error)
    }
  }

  return (
    <div className="p-8">
      {error && <p className="text-red-500">{error}</p>}
      {success && (
        <p className="text-green-500">
          Journal {journal.status === 'archived' ? 'archived' : 'updated'}{' '}
          successfully!
        </p>
      )}

      <form onSubmit={handleSubmit((data) => handleUpdate(data, true))}>
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        <div className="mb-4">
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <Editor
                value={field.value}
                placeholder="Write your journal entry here..."
                onChange={field.onChange}
              />
            )}
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="mt-4 inline-flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-white"
          >
            Update & Publish
          </button>

          <button
            type="button"
            onClick={handleArchive}
            className="mt-4 inline-flex justify-center rounded-md bg-red-600 px-4 py-2 text-white"
          >
            Archive
          </button>
        </div>
      </form>
    </div>
  )
}

export default JournalUpdatePage
