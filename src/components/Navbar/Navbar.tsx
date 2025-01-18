import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Link } from '@tanstack/react-router'

const Navbar: React.FC = () => {
  const { user, setAuthToken, authToken, setUser } = useAuth()

  const handleLogout = () => {
    setAuthToken('')
    setUser(null)
    localStorage.removeItem('authToken')
    window.location.href = '/login'
  }

  return (
    <header className="flex items-center justify-between bg-white p-4 shadow-md">
      <Link to="/dashboard">
        <h1 className="text-2xl font-bold">Syrupy</h1>
      </Link>
      {authToken ? (
        <div className="flex items-center">
          <span className="mr-4">Hi, {user ? user.name : 'Guest'}!</span>
          <Link to="/journals">
            <button>Journals</button>
          </Link>
          <button
            className="rounded px-4 py-2 text-red-500 hover:bg-gray-200"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : null}
    </header>
  )
}

export default Navbar
