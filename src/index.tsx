import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/tailwind.css'
import { AuthProvider } from 'context/AuthContext'

const rootElement = document.querySelector('#root') as Element
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <React.Suspense fallback="loading">
        <AuthProvider>
          <App />
        </AuthProvider>
      </React.Suspense>
    </React.StrictMode>
  )
}
