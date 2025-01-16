import { createFileRoute } from '@tanstack/react-router'
import JournalEntryPage from 'pages/JournalEntryPage/JournalEntryPage'

export const Route = createFileRoute('/_authenticated/journals/create')({
  validateSearch: (search: Record<string, unknown>): { title: string } => {
    return {
      title: typeof search?.title === 'string' ? search.title : ''
    }
  },
  component: JournalEntryPage
})
