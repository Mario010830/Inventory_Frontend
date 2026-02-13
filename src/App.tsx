import { GoogleOAuthProvider } from '@react-oauth/google'
import { RouterProvider } from 'react-router-dom'
import { config } from '@/config'
import { NotificationContainer } from '@/components'
import { router } from '@/routes'
import { ThemeSync } from '@/routes/ThemeSync'

const content = <RouterProvider router={router} />

function App() {
  return (
    <>
      <ThemeSync />
      <NotificationContainer />
      {config.googleClientId ? (
        <GoogleOAuthProvider clientId={config.googleClientId}>
          {content}
        </GoogleOAuthProvider>
      ) : (
        content
      )}
    </>
  )
}

export default App
