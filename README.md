# Syrupy Client

The **Syrupy Client** is a web-based journaling application designed to help users track their emotions and personal growth through journaling and mood analysis. This project is built using **React**, **TypeScript**, and **TailwindCSS**, with a focus on modern development practices and an intuitive user experience.

## Features

- **Rich Text Editor**: Create and format journal entries using a user-friendly interface.
- **Mood Tracking**: Tag journal entries with moods like hopeful, happy, or sad.
- **Journal Management**: 
  - View, edit, and delete journal entries.
  - Filter entries by tags or moods.

## Technology Stack

- **Frontend Framework**: React 18
- **Styling**: TailwindCSS 3
- **State Management**: React Query
- **Routing**: TanStack Router
- **Form Handling**: React Hook Form
- **Rich Text Editor**: Quill.js
- **Type Checking**: TypeScript
- **Build Tool**: Vite

## Installation

### Prerequisites

Ensure the following are installed:
- Node.js (16.x or higher)
- pnpm (Package Manager)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/syrupy-client.git
   cd syrupy-client
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

4. Open the app in your browser:
   ```bash
   http://localhost:5173
   ```

### Build for Production

To build the project for production:
```bash
pnpm build
```

Preview the production build:
```bash
pnpm serve
```

## Testing

Run the test suite:
```bash
pnpm test
```

Watch files and re-run tests on change:
```bash
pnpm test:watch
```

## Project Structure

```plaintext
src/
├── components/         # Reusable UI components
├── pages/              # Application pages
├── routes/             # Route configurations
├── utils/              # Utility functions
├── types/              # TypeScript types
├── styles/             # TailwindCSS configurations
├── App.tsx             # Main application entry point
├── index.tsx           # Application root
```

## Scripts

- `pnpm dev`: Start the development server.
- `pnpm build`: Build for production.
- `pnpm serve`: Preview the production build.
- `pnpm test`: Run all tests.
- `pnpm lint`: Lint the codebase.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Boilerplat Author

- **João Paulo Moraes**  
  Email: [joaopaulomoraes@outlook.com](mailto:joaopaulomoraes@outlook.com)  
  GitHub: [joaopaulomoraes](https://github.com/joaopaulomoraes)

## Author

- **Gabriel Ocampo**  
  Email: [gabrielocampo.dev@gmail.com](mailto:gabrielocampo.dev@gmail.com)  
  GitHub: [gabrielbrrll](https://github.com/gabrielbrrll)

