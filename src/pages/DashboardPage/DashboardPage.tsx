import React, { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { fetchRecentJournals } from 'api/queries/journals'
import { useAuth } from 'context/AuthContext'

export type TJournal = {
  id: string
  content: string
  title: string
  status: 'published' | 'draft' | 'archived'
}

const DashboardPage: React.FC = () => {
  const { authToken, user } = useAuth()

  const [journalTitle, setJournalTitle] = useState('')

  const {
    data: recentJournals = [],
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['journals', 'recent'],
    queryFn: () => fetchRecentJournals(authToken)
  })

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <main className="p-8">
        <h2 className="mb-4 text-3xl">
          Hi, {user ? user.name : 'Guest'}! How are you doing?
        </h2>

        <div className="mb-6">
          <input
            type="text"
            className="mr-4 rounded border px-4 py-2"
            placeholder="Enter journal title (optional)"
            value={journalTitle}
            onChange={(e) => setJournalTitle(e.target.value)}
          />
          <Link to="/journals/create" search={{ title: journalTitle }}>
            <button className="rounded bg-blue-500 px-6 py-3 text-white shadow hover:bg-blue-600">
              Start Journaling Now
            </button>
          </Link>
        </div>

        <section className="mt-8">
          <h3 className="mb-4 text-xl font-semibold">Your Recent Journals</h3>

          {isLoading && <div>Loading...</div>}
          {isError && (
            <div className="text-red-500">Error: {String(error)}</div>
          )}

          {!isLoading && !isError && recentJournals.length > 0 && (
            <ul className="space-y-4">
              {recentJournals.map((journal: TJournal) => (
                <li
                  key={journal.id}
                  className="cursor-pointer rounded bg-white p-4 shadow hover:bg-gray-50"
                >
                  <Link to="/journals/$id" params={{ id: journal.id }}>
                    <h4 className="text-lg font-bold">{journal.title}</h4>
                    <p className="text-sm text-gray-600">
                      {journal.content.slice(0, 50)}...
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {!isLoading && !isError && recentJournals.length === 0 && (
            <div className="text-gray-600">
              <p>You do not have any recent journals yet.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default DashboardPage
