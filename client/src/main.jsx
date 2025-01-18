import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import {RecoilRoot } from 'recoil'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './Context/AuthContext.jsx'
import { ThemeProvider } from './Context/theme-provider.jsx'
import {QueryClientProvider,QueryClient} from "react-query"
const client=new QueryClient();
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RecoilRoot>
    <AuthContextProvider>
      <ThemeProvider defaultTheme='dark'  storageKey="vite-ui-theme"> 
        <QueryClientProvider client={client}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false}  client={client}/>
    </QueryClientProvider >
    </ThemeProvider>
    </AuthContextProvider>
    </RecoilRoot>
  </StrictMode>
)
