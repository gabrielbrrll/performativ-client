import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/journals/create')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello journal creation!</div>
}
