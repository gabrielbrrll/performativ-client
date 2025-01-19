import React from 'react'
import { RouterProvider } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from 'context/AuthContext' // Import AuthContext for mocking
import { router } from '../../App'
import DashboardPage from 'pages/DashboardPage/DashboardPage'
import { render, screen } from '@testing-library/react'

const queryClient = new QueryClient()

jest.mock('context/AuthContext', () => ({
  ...jest.requireActual('context/AuthContext'),
  useAuth: jest.fn()
}))

const mockUseAuth = jest.requireMock('context/AuthContext').useAuth

export const TestWrapper: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider
          router={router}
          context={{
            authentication: {
              authToken: 'mock-token',
              setAuthToken: jest.fn(),
              setUser: jest.fn(),
              user: {
                email: 'test@email.com',
                id: 1,
                name: 'Test User'
              }
            }
          }}
          defaultComponent={() => <div>{children}</div>}
        />
      </QueryClientProvider>
    </AuthProvider>
  )
}

describe('DashboardPage', () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      authToken: 'mock-auth-token',
      setAuthToken: jest.fn(),
      user: { id: 1, name: 'Test User', email: 'test@example.com' },
      setUser: jest.fn()
    })
  })

  it('renders the app without crashing', () => {
    render(
      <TestWrapper>
        <DashboardPage />
      </TestWrapper>
    )

    expect(screen.getByText(/Hi, Test User!/i)).toBeInTheDocument()
  })
})
