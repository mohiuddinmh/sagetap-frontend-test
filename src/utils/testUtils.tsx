import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import React, { ReactNode } from 'react'

interface QueryClientWrapperProps {
  children: ReactNode
}

const QueryClientWrapper = ({ children }: QueryClientWrapperProps) => (
	<QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
		{children}
	</QueryClientProvider>
)

export const renderWithQueryProvider = (ui: ReactNode) => render(
	<QueryClientWrapper>{ui}</QueryClientWrapper>
)
