export async function fetchRecentJournals(token: string | null) {
  const response = await fetch(
    'http://127.0.0.1:8000/api/v1/journals?sort_by=updated_at&sort_direction=desc&per_page=5',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
      }
    }
  )

  if (!response.ok) {
    throw new Error('Failed to fetch recent journals')
  }

  const result = await response.json()

  return result.data ?? result
}

export async function fetchJournals(
  token: string | null,
  {
    searchQuery,
    sortBy,
    sortDirection,
    selectedTag
  }: {
    searchQuery: string
    sortBy: string
    sortDirection: string
    selectedTag: string | null
  }
) {
  const params = new URLSearchParams({
    search: searchQuery,
    ...(selectedTag
      ? { filter_tag: selectedTag }
      : { sort_by: sortBy, sort_direction: sortDirection })
  })

  const response = await fetch(
    `http://127.0.0.1:8000/api/v1/journals?${params.toString()}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
      }
    }
  )

  if (!response.ok) {
    throw new Error('Failed to fetch journals')
  }

  const result = await response.json()

  return result.data ?? result
}
