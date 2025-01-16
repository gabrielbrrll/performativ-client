/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { fetchRecentJournals } from '../../api/journals' // import the function
import { useAuth } from '../../context/AuthContext'

const LandingPage: React.FC = () => {
  const { authToken, setAuthToken, user, setUser } = useAuth()
  const navigate = useNavigate()

  const [journalTitle, setJournalTitle] = useState('')

  const {
    data: recentJournals,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['journals', 'recent'],
    queryFn: () => fetchRecentJournals(authToken)
  })

  const handleLogout = () => {
    setAuthToken('')
    setUser(null)
    localStorage.removeItem('authToken')
    navigate({ to: '/login' })
  }

  const handleStartJournaling = () => {
    if (journalTitle.trim()) {
      navigate({
        to: '/journals/create',
        search: { title: journalTitle }
      })
    } else {
      navigate({ to: '/journals/create' })
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="flex items-center justify-between bg-white p-4 shadow-md">
        <h1 className="text-2xl font-bold">Syrupy</h1>
        <div className="flex items-center">
          <span className="mr-4">Hi, {user ? user.name : 'Guest'}!</span>
          <button
            className="rounded px-4 py-2 text-red-500 hover:bg-gray-200"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>

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
          <button
            className="rounded bg-blue-500 px-6 py-3 text-white shadow hover:bg-blue-600"
            onClick={handleStartJournaling}
          >
            Start Journaling Now
          </button>
        </div>

        <section className="mt-8">
          <h3 className="mb-4 text-xl font-semibold">Your Recent Journals</h3>

          {isLoading && <div>Loading...</div>}
          {isError && (
            <div className="text-red-500">Error: {String(error)}</div>
          )}

          {!isLoading && !isError && recentJournals && (
            <ul className="space-y-4">
              {recentJournals.map((journal: any) => (
                <li
                  key={journal.id}
                  className="cursor-pointer rounded bg-white p-4 shadow hover:bg-gray-50"
                >
                  <h4 className="text-lg font-bold">{journal.title}</h4>
                  <p className="text-sm text-gray-600">
                    {journal.content.slice(0, 50)}...
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  )
}

export default LandingPage
