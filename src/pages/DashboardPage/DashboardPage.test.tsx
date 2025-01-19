import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import DashboardPage from 'pages/DashboardPage/DashboardPage'
import { TestWrapper } from 'utils/tests/wrapper.test'

jest.mock('context/AuthContext', () => ({
  ...jest.requireActual('context/AuthContext'),
  useAuth: jest.fn()
}))

jest.mock('api/queries/journals', () => ({
  fetchRecentJournals: jest.fn(() =>
    Promise.resolve([
      {
        id: '1',
        title: 'Test Journal 1',
        content: 'This is a test journal.',
        status: 'published',
        updated_at: new Date()
      }
    ])
  )
}))

const mockUseAuth = jest.requireMock('context/AuthContext').useAuth

describe('DashboardPage', () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      authToken: 'mock-auth-token',
      setAuthToken: jest.fn(),
      user: { id: 1, name: 'Test User', email: 'test@example.com' },
      setUser: jest.fn()
    })
  })

  it('renders the user greeting and recent journals', async () => {
    render(
      <TestWrapper>
        <DashboardPage />
      </TestWrapper>
    )

    await waitFor(() =>
      expect(
        screen.getByText(/Hi, Test User! How are you doing\?/i)
      ).toBeInTheDocument()
    )

    await waitFor(() =>
      expect(screen.getByText(/Test Journal 1/i)).toBeInTheDocument()
    )
  })
})
