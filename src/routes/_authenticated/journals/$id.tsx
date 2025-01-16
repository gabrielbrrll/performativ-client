import { createFileRoute, useParams } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/journals/$id')({
  component: RouteComponent
})

function RouteComponent() {
  const test = useParams({ strict: false })
  console.log(test, 'label TEST')
  return <div>Hello post id! {test.id}</div>
}
