import { createFileRoute, useParams } from '@tanstack/react-router'

export const Route = createFileRoute('/journal/$id')({
  loader: async ({ params }) => {
    console.log(params.id)
    return 'sample'
  },
  component: RouteComponent
})

function RouteComponent() {
  const test = useParams({ strict: false })
  console.log(test, 'label TEST')
  return <div>Hello post id! {test.id}</div>
}
