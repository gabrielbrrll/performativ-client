import { Link, useNavigate } from '@tanstack/react-router'
import React, { useState } from 'react'
import { useAuth } from 'context/AuthContext'
import { useMutation } from '@tanstack/react-query'
import { registerUser } from 'api/mutations/user'

const SignUpPage: React.FC = () => {
  const navigate = useNavigate()
  const { setAuthToken, setUser } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const mutation = useMutation<
    {
      token: string
      user: { id: number; name: string; email: string; password: string }
    },
    Error,
    { name: string; email: string; password: string }
  >({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setAuthToken(data.token)
      setUser(data.user)
      setSuccess(true)

      setTimeout(() => {
        navigate({ to: '/dashboard' })
      }, 500)
    },
    onError: (err: unknown) => {
      if (err instanceof Error) {
        setError(err.message || 'Something went wrong')
      } else {
        setError('An unexpected error occurred')
      }
    }
  })

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    mutation.mutate({ name, email, password })
  }

  return (
    <div className="mx-auto max-w-md p-8">
      <div className="flex items-center">
        <h1 className="mb-4 text-2xl font-bold">Sign Up</h1>
        <Link to="/login">
          <h4>or login</h4>
        </Link>
      </div>
      <form onSubmit={handleSignUp}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded border p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border p-2"
            required
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        {success && (
          <p className="text-sm text-green-500">Registration successful!</p>
        )}
        <button className="mt-4 w-full rounded bg-blue-500 py-2 text-white">
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default SignUpPage
