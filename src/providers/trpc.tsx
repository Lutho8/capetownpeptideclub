import type { ReactNode } from 'react'

/**
 * Passthrough provider. The committed frontend makes no tRPC calls, so this
 * simply renders children. When the backend (api/, contracts/) is wired up,
 * replace this with the real tRPC + QueryClient provider.
 */
export function TRPCProvider({ children }: { children: ReactNode }) {
  return <>{children}</>
}
