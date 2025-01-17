import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import Editor from 'components/Editor/Editor'
import { useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { Route } from 'routes/_authenticated/journals/$id'
import { TJournal } from 'pages/DashboardPage/DashboardPage'
import { archiveJournal, updateJournal } from 'api/mutations/journals'

const JournalUpdatePage: React.FC = () => {
  const journal = Route.useLoaderData()
  const navigate = useNavigate()

  const { control, handleSubmit, register } = useForm<TJournal>({
    defaultValues: {
      title: journal.title,
      content: journal.html_content,
      status: journal.status
    }
  })

  const updateMutation = useMutation({
    mutationFn: (data: TJournal) =>
      updateJournal(journal.id, {
        ...data,
        status: data.status === 'published' ? 'published' : 'draft'
      }),
    onSuccess: () => {
      navigate({ to: `/journals/${journal.id}` })
    },
    onError: (error) => {
      console.error(error.message || 'An error occurred')
    }
  })

  const archiveMutation = useMutation({
    mutationFn: () => archiveJournal(journal.id),
    onSuccess: () => {
      navigate({ to: '/journals' })
    },
    onError: (error) => {
      console.error(error.message || 'An error occurred')
    }
  })

  const handleUpdate = (data: TJournal) => {
    updateMutation.mutate(data)
  }

  const handleArchive = () => {
    archiveMutation.mutate()
  }

  return (
    <div className="p-8">
      {updateMutation.isError && (
        <p className="text-red-500">{updateMutation.error?.message}</p>
      )}
      {archiveMutation.isError && (
        <p className="text-red-500">{archiveMutation.error?.message}</p>
      )}
      {updateMutation.isSuccess && (
        <p className="text-green-500">Journal updated successfully!</p>
      )}

      <form onSubmit={handleSubmit(handleUpdate)}>
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

        {/* Status Pill */}
        <div className="mb-4">
          <span
            className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
              journal.status === 'draft'
                ? 'bg-gray-200 text-gray-600'
                : journal.status === 'published'
                  ? 'bg-green-200 text-green-600'
                  : 'bg-yellow-200 text-yellow-600'
            }`}
          >
            {journal.status.charAt(0).toUpperCase() + journal.status.slice(1)}
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

        <div className="flex space-x-4">
          <button
            type="submit"
            className="mt-4 inline-flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-white"
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? 'Updating...' : 'Update & Publish'}
          </button>

          <button
            type="button"
            onClick={handleArchive}
            className="mt-4 inline-flex justify-center rounded-md bg-red-600 px-4 py-2 text-white"
            disabled={archiveMutation.isPending}
          >
            {archiveMutation.isPending ? 'Archiving...' : 'Archive'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default JournalUpdatePage
