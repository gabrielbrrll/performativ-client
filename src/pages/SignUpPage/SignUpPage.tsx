import { Link, redirect } from '@tanstack/react-router'
import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const { setAuthToken } = useAuth()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      })

      if (!response.ok) throw new Error('Failed to register')

      const data = await response.json()

      // Save auth token and redirect
      setAuthToken(data.token)
      setSuccess(true)
      redirect({ to: '/dashboard' })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    }
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
