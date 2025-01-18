import React from 'react'
import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from '@tanstack/react-router'
import { useAuth } from 'context/AuthContext'
import { registerUser } from 'api/mutations/user'
import { useForm } from 'react-hook-form'
import { SignUpFormData, signUpSchema } from 'utils/validations/users'
import { zodResolver } from '@hookform/resolvers/zod'

const SignUpPage: React.FC = () => {
  const navigate = useNavigate()
  const { setAuthToken, setUser } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema)
  })

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setAuthToken(data.token)
      setUser(data.user)
      setTimeout(() => {
        navigate({ to: '/dashboard' })
      }, 500)
    },
    onError: (err) => {
      alert(err.message || 'Something went wrong')
    }
  })

  const onSubmit = (data: SignUpFormData) => {
    mutation.mutate(data)
  }

  return (
    <div className="mx-auto max-w-md p-8">
      <h1 className="mb-4 text-2xl font-bold">Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label>Name</label>
          <input
            type="text"
            {...register('name')}
            className={`w-full rounded border p-2 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>
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
          {mutation.isPending ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
      <Link to="/login" className="text-blue-500 hover:underline">
        or login
      </Link>
    </div>
  )
}

export default SignUpPage
