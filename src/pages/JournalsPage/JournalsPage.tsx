import { Link } from '@tanstack/react-router'
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchJournals } from 'api/queries/journals'
import { useAuth } from 'context/AuthContext'
import { TJournal } from 'pages/DashboardPage/DashboardPage'

const JournalsPage: React.FC = () => {
  const { authToken } = useAuth()
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('updated_at')
  const [sortDirection, setSortDirection] = useState<string>('desc')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const {
    data: journals,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['journals', { searchQuery, sortBy, sortDirection, selectedTag }],
    queryFn: () =>
      fetchJournals(authToken, {
        searchQuery,
        sortBy,
        sortDirection,
        selectedTag
      })
  })

  const handleSortByChange = (value: string) => {
    if (value === 'tags') {
      setSortBy('tags')
      setSortDirection('')
      setSelectedTag(null) // Clear selected tag
    } else {
      setSortBy(value)
      setSortDirection('desc') // Default sort direction for created_at or updated_at
      setSelectedTag(null) // Clear tag sort if switching
    }
    refetch()
  }

  const handleTagSort = (tag: string) => {
    setSelectedTag(tag)
    setSortBy('tags') // Indicate sorting by tags
    setSortDirection('') // Clear sort direction
    refetch()
  }

  console.log(journals, 'journals')

  return (
    <div className="p-8">
      <div className="flex">
        <h1 className="mb-4 text-2xl font-bold">Journals List</h1>
        <Link to="/journals/create">
          <button>Create Journal</button>
        </Link>
      </div>

      <div className="mb-4 flex flex-wrap items-center space-x-4">
        {/* Search Input */}
        <input
          type="text"
          className="rounded border px-4 py-2"
          placeholder="Search journals..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Sort By Dropdown */}
        <select
          className="rounded border px-4 py-2"
          value={sortBy}
          onChange={(e) => handleSortByChange(e.target.value)}
        >
          <option value="updated_at">Updated At</option>
          <option value="created_at">Created At</option>
          <option value="tags">Tags</option>
        </select>

        {/* Sort Direction Dropdown */}
        {sortBy !== 'tags' && (
          <select
            className="rounded border px-4 py-2"
            value={sortDirection}
            onChange={(e) => setSortDirection(e.target.value)}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        )}

        {/* Tag Filter Dropdown */}
        {sortBy === 'tags' && (
          <select
            className="rounded border px-4 py-2"
            value={selectedTag || ''}
            onChange={(e) => handleTagSort(e.target.value)}
          >
            <option value="">Select Tag</option>
            {[
              'anger',
              'disgust',
              'fear',
              'joy',
              'neutral',
              'sadness',
              'surprise'
            ].map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Loading State */}
      {isLoading && <p>Loading journals...</p>}

      {/* Error State */}
      {isError && <p className="text-red-500">{String(error)}</p>}

      {/* Journals List */}
      {!isLoading && !isError && journals && journals.length === 0 && (
        <p>No journals found. Try adjusting your search or filters!</p>
      )}

      {!isLoading && !isError && journals && journals.length > 0 && (
        <ul className="space-y-4">
          {journals.map((journal: TJournal) => (
            <li
              key={journal.id}
              className="rounded-lg border border-gray-300 p-4 shadow-sm"
            >
              <Link to="/journals/$id" params={{ id: `${journal.id}` }}>
                <h2 className="text-lg font-bold">{journal.title}</h2>
                {/* Status Pill */}
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                    journal.status === 'draft'
                      ? 'bg-gray-200 text-gray-600'
                      : journal.status === 'published'
                        ? 'bg-green-200 text-green-600'
                        : 'bg-yellow-200 text-yellow-600'
                  }`}
                >
                  {journal.status.charAt(0).toUpperCase() +
                    journal.status.slice(1)}
                </span>
                <p className="mt-2 text-gray-700">
                  {journal.content.length > 100
                    ? `${journal.content.slice(0, 100)}...`
                    : journal.content}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default JournalsPage
