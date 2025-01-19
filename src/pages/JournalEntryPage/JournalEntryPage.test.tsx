import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TestWrapper } from 'utils/tests/wrapper.test'
import JournalEntryPage from 'pages/JournalEntryPage/JournalEntryPage'

jest.mock('components/Editor/Editor', () => ({
  __esModule: true,
  default: ({
    value,
    onChange
  }: {
    value: string
    onChange: (value: string) => void
  }) => (
    <textarea
      data-testid="mock-editor"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}))

jest.mock('@tanstack/react-router', () => {
  const navigate = jest.fn()
  return {
    ...jest.requireActual('@tanstack/react-router'),
    useNavigate: jest.fn(() => navigate),
    useSearch: jest.fn(() => ({ title: '' }))
  }
})

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useMutation: jest.fn()
}))

const mockNavigate = jest.requireMock('@tanstack/react-router').useNavigate()
const mockUseMutation = jest.requireMock('@tanstack/react-query').useMutation

describe('JournalEntryPage', () => {
  it('renders the form and publishes successfully', async () => {
    const mockMutationFn = jest.fn()
    const mockResponse = { journal: { id: 1 } }

    type MutationFn = (data: {
      title: string
      content: string
      status: 'draft' | 'published'
    }) => void

    mockUseMutation.mockImplementation(
      ({ onSuccess }: { onSuccess: (data: typeof mockResponse) => void }) => ({
        mutate: (data: Parameters<MutationFn>[0]) => {
          mockMutationFn(data)
          onSuccess(mockResponse)
        },
        isPending: false
      })
    )

    render(
      <TestWrapper>
        <JournalEntryPage />
      </TestWrapper>
    )

    const user = userEvent.setup()

    await waitFor(() => {
      expect(screen.getByLabelText(/Title/i)).toBeInTheDocument()
    })

    await user.type(screen.getByLabelText(/Title/i), 'Test Journal Title')
    await user.type(screen.getByTestId('mock-editor'), 'Test Journal Content')

    await user.click(screen.getByRole('button', { name: /Save & Publish/i }))

    await waitFor(() =>
      expect(mockMutationFn).toHaveBeenCalledWith({
        title: 'Test Journal Title',
        content: 'Test Journal Content',
        status: 'draft'
      })
    )

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledTimes(1)
    })

    await waitFor(() =>
      expect(mockNavigate).toHaveBeenCalledWith({
        to: '/journals/$id',
        params: { id: '1' }
      })
    )
  })
})
