export async function loginUser(credentials: {
  email: string
  password: string
}) {
  const response = await fetch('http://127.0.0.1:8000/api/v1/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to log in')
  }

  return response.json()
}

export async function registerUser(credentials: {
  name: string
  email: string
  password: string
}) {
  const response = await fetch('http://127.0.0.1:8000/api/v1/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(credentials)
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to register')
  }

  return response.json()
}
