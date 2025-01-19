// jest.setup.ts
import '@testing-library/jest-dom'

jest.mock('quill', () => {
  return {
    default: jest.fn(() => ({
      // Mock any necessary methods here
    }))
  }
})
