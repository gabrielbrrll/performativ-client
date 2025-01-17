import { createFileRoute } from '@tanstack/react-router'
import JournalUpdatePage from 'pages/JournalUpdatePage/JournalUpdatePage'

export const Route = createFileRoute('/_authenticated/journals/$id')({
  loader: async ({ params }) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/journals/${params.id}`,
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
        throw new Error(errorData.message || 'Failed to fetch journal entry')
      }

      const journal = await response.json()
      console.log(journal, 'journal')
      return journal
    } catch (err) {
      console.error(err)
      throw new Error('Error loading journal entry')
    }
  },
  component: JournalUpdatePage
})
