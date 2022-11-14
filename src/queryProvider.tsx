import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

interface QueryProviderProps {
  children: React.ReactNode
}

export default function QueryProvider({ children }: QueryProviderProps) {
	const queryClient = new QueryClient()

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

