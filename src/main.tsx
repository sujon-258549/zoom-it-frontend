import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router/index.tsx'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/fetures/store.ts'
import { PersistGate } from 'redux-persist/integration/react'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster />
      <PersistGate loading={null} persistor={persistor}></PersistGate>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>,
)
