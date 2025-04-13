import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import {RecoilRoot } from 'recoil'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './Context/AuthContext.jsx'
import { ThemeProvider } from './Context/theme-provider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RecoilRoot>
    <AuthContextProvider>
      <ThemeProvider defaultTheme='dark'  storageKey="vite-ui-theme"> 
     
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </ThemeProvider>
    </AuthContextProvider>
    </RecoilRoot>
  </StrictMode>
)
