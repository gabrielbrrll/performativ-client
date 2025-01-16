import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/journals/')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello, this is journals!</div>
}
