import { createFileRoute } from '@tanstack/react-router'
import JournalsPage from 'pages/JournalsPage/JournalsPage'

export const Route = createFileRoute('/_authenticated/journals/')({
  component: JournalsPage
})
