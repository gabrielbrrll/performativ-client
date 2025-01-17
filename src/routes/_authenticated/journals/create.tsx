import { createFileRoute } from '@tanstack/react-router'
import JournalEntryPage from 'pages/JournalEntryPage/JournalEntryPage'

export const Route = createFileRoute('/_authenticated/journals/create')({
  validateSearch: (
    search: Record<string, unknown>
  ): { title?: string; id?: number; content?: string } => {
    return {
      title: typeof search?.title === 'string' ? search.title : undefined,
      id: typeof search?.id === 'number' ? search.id : undefined,
      content: typeof search?.content === 'string' ? search.content : undefined
    }
  },
  component: JournalEntryPage
})
