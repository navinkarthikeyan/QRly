import { Toaster } from 'sonner'
import { Home } from './pages/Home'

function App() {
  return (
    <>
      <Home />
      <Toaster
        position="top-right"
        theme="dark"
        toastOptions={{
          style: {
            background: '#0f172a',
            border: '1px solid rgba(139, 92, 246, 0.25)',
            color: '#f1f5f9',
            borderRadius: '0.75rem',
          },
        }}
      />
    </>
  )
}

export default App
