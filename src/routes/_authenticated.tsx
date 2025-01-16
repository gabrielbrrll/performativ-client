import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ context }) => {
    const { authToken } = context.authentication
    if (!authToken) {
      throw redirect({ to: '/login' })
    }
  }
})
