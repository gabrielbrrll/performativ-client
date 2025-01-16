import { createFileRoute } from '@tanstack/react-router'
import JournalEntryPage from 'pages/JournalEntryPage/JournalEntryPage'

export const Route = createFileRoute('/_authenticated/journals/create')({
  component: JournalEntryPage
})
