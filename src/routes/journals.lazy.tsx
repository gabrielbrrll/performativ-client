import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/journals')({
  component: RouteComponent
})

function RouteComponent() {
  return <div>Hello, this is journals!</div>
}
