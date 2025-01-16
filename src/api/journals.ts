// src/api/journals.ts
export async function fetchRecentJournals(token: string | null) {
  const response = await fetch(
    // Adjust your URL/path as needed.
    // The query params sort_by=updated_at & sort_direction=desc & per_page=5
    // tell Laravel to give us the 5 most recently updated journals.
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

  // Laravel’s paginate response typically returns an object with "data" array,
  // along with pagination meta. For example:
  // {
  //   "data": [ { "id": 1, ... }, { ... } ],
  //   "links": { ... },
  //   "meta": { ... }
  // }
  //
  // We'll just return the "data" array if that’s what you prefer:
  const result = await response.json()
  console.log(result, 'label: RESPONSE')

  return result.data ?? result // If your API structure is different, adjust here
}
