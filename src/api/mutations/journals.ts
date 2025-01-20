import { TJournal } from 'pages/DashboardPage/DashboardPage'

const API_URL =
  import.meta.env?.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1'

/**
 * we should update the func to receive token instead
 */

export async function createJournalEntry(data: {
  title: string
  content: string
  status: 'draft' | 'published'
}) {
  const response = await fetch(`${API_URL}/journals`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('authToken')}`
    },
    body: JSON.stringify({
      ...data,
      status: 'published'
    })
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to save journal entry')
  }

  return response.json()
}

export async function updateJournal(journalId: number, data: TJournal) {
  const response = await fetch(`${API_URL}/journals/${journalId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('authToken')}`
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to update journal entry')
  }

  return response.json()
}

export async function archiveJournal(journalId: number) {
  const response = await fetch(`${API_URL}/journals/${journalId}/archive`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('authToken')}`
    }
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to archive journal entry')
  }

  return response.json()
}
