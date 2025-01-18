import React from 'react'
import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from '@tanstack/react-router'
import { useAuth } from 'context/AuthContext'
import { loginUser } from 'api/mutations/user'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginFormData, loginSchema } from 'utils/validations/users'

const LoginPage: React.FC = () => {
  const { setAuthToken, setUser } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

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
      alert(err.message || 'An error occurred')
    }
  })

  const onSubmit = (data: LoginFormData) => {
    mutation.mutate(data)
  }

  return (
    <div className="mx-auto max-w-md p-8">
      <h1 className="mb-4 text-2xl font-bold">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label>Email</label>
          <input
            type="email"
            {...register('email')}
            className={`w-full rounded border p-2 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label>Password</label>
          <input
            type="password"
            {...register('password')}
            className={`w-full rounded border p-2 ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
        <button
          className="mt-4 w-full rounded bg-blue-500 py-2 text-white"
          disabled={isSubmitting || mutation.isPending}
        >
          {mutation.isPending ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <Link to="/signup" className="text-blue-500 hover:underline">
        or signup
      </Link>
    </div>
  )
}

export default LoginPage
