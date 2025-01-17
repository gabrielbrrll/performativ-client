import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Editor from 'components/Editor/Editor'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { createJournalEntry } from 'api/mutations/journals'

interface JournalEntryForm {
  title: string
  content: string
  status: 'draft' | 'published'
}

const JournalEntryPage: React.FC = () => {
  const { title } = useSearch({
    from: '/_authenticated/journals/create'
  })

  const navigate = useNavigate()
  const { control, handleSubmit, register, watch } = useForm<JournalEntryForm>({
    defaultValues: {
      title: title,
      content: '',
      status: 'draft'
    }
  })

  const [error, setError] = useState<string | null>(null)

  const mutation = useMutation({
    mutationFn: createJournalEntry,
    onSuccess: (data) => {
      navigate({
        to: '/journals/$id',
        params: { id: data.journal.id.toString() }
      })
    },
    onError: (err) => {
      setError(err.message || 'An error occurred')
    }
  })

  const handleSave = (data: JournalEntryForm) => {
    setError(null)
    mutation.mutate(data)
  }

  // Watch the status value from the form state
  const status = watch('status')

  return (
    <div className="p-8">
      <form onSubmit={handleSubmit(handleSave)}>
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

        {/* Status Pill */}
        <div className="mb-4">
          <span
            className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
              status === 'draft'
                ? 'bg-gray-200 text-gray-600'
                : status === 'published'
                  ? 'bg-green-200 text-green-600'
                  : 'bg-yellow-200 text-gray-400'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}{' '}
            {/* Capitalize status */}
          </span>
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

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className="mt-4 inline-flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Saving...' : 'Save & Publish'}
        </button>
      </form>
    </div>
  )
}

export default JournalEntryPage
