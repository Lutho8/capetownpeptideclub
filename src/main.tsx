import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import { TRPCProvider } from "@/providers/trpc"
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <HelmetProvider>
      <TRPCProvider>
        <App />
      </TRPCProvider>
    </HelmetProvider>
  </HashRouter>,
)
