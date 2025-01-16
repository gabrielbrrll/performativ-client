// src/pages/LoginPage/LoginPage.tsx (or wherever your LoginPage is)
import { Link, redirect } from '@tanstack/react-router'
import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { setAuthToken, setUser } = useAuth() // <-- destructure setUser too!

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to log in')
      }

      const data = await response.json()

      setAuthToken(data.token)
      setUser(data.user)
      localStorage.setItem('authToken', data.token)

      redirect({ to: '/dashboard' })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    }
  }

  return (
    <div className="mx-auto max-w-md p-8">
      <div className="flex items-center">
        <h1 className="mb-4 text-2xl font-bold">Login</h1>
        <Link to="/signup">
          <h4>or sign up</h4>
        </Link>
      </div>
      <form onSubmit={handleLogin}>
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
        <button className="mt-4 w-full rounded bg-blue-500 py-2 text-white">
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginPage
