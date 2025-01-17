import { Link } from '@tanstack/react-router'
import React, { useCallback, useEffect, useState } from 'react'

interface Journal {
  id: number
  title: string
  content: string
  status: 'draft' | 'published'
}

const JournalsPage: React.FC = () => {
  const [journals, setJournals] = useState<Journal[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('updated_at')
  const [sortDirection, setSortDirection] = useState<string>('desc')
  const [selectedTag, setSelectedTag] = useState<string | null>(null) // For tag sorting

  const fetchJournals = useCallback(async () => {
    setLoading(true)
    setError(null)

    const params = new URLSearchParams({
      search: searchQuery
    })

    if (selectedTag) {
      params.append('filter_tag', selectedTag) // Add tag to the query
    } else {
      params.append('sort_by', sortBy)
      params.append('sort_direction', sortDirection)
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/journals?${params.toString()}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to fetch journals')
      }

      const data = await response.json()
      setJournals(data.data || data) // Adjust based on API structure
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [searchQuery, sortBy, sortDirection, selectedTag])

  useEffect(() => {
    fetchJournals()
  }, [fetchJournals])

  const handleSortByChange = (value: string) => {
    if (value === 'tags') {
      setSortBy('tags')
      setSortDirection('') // Clear sort direction for tags
      setSelectedTag(null) // Clear selected tag
    } else {
      setSortBy(value)
      setSortDirection('desc') // Default sort direction for created_at or updated_at
      setSelectedTag(null) // Clear tag sort if switching
    }
  }

  const handleTagSort = (tag: string) => {
    setSelectedTag(tag)
    setSortBy('tags') // Indicate sorting by tags
    setSortDirection('') // Clear sort direction
  }

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
      {loading && <p>Loading journals...</p>}

      {/* Error State */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Journals List */}
      {!loading && !error && journals.length === 0 && (
        <p>No journals found. Try adjusting your search or filters!</p>
      )}

      {!loading && !error && journals.length > 0 && (
        <ul className="space-y-4">
          {journals.map((journal) => (
            <li
              key={journal.id}
              className="rounded-lg border border-gray-300 p-4 shadow-sm"
            >
              <Link to="/journals/$id" params={{ id: `${journal.id}` }}>
                <h2 className="text-lg font-bold">{journal.title}</h2>
                <p className="text-sm text-gray-600">
                  {journal.status === 'published' ? 'Published' : 'Draft'}
                </p>
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
