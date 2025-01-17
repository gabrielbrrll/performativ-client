import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from '@tanstack/react-router'
import { useAuth } from 'context/AuthContext'
import { loginUser } from 'api/mutations/user'

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { setAuthToken, setUser } = useAuth()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem('authToken', data.token)

      setAuthToken(data.token)
      setUser(data.user)

      setTimeout(() => {
        navigate({ to: '/dashboard' })
      }, 0)
    },
    onError: (err) => {
      setError(err.message || 'An error occurred')
    }
  })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate({ email, password })
  }

  return (
    <div className="mx-auto max-w-md p-8">
      <div className="flex">
        <h1 className="mb-4 text-2xl font-bold">Login</h1>
        <div>
          <Link to="/signup">
            <h4>or signup</h4>
          </Link>
        </div>
      </div>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border p-2"
          />
        </div>
        <div className="mb-4">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border p-2"
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          className="mt-4 w-full rounded bg-blue-500 py-2 text-white"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

export default LoginPage
