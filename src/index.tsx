import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import QueryProvider from './queryProvider'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ToastContainer } from 'react-toastify'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
	<QueryProvider>
		<App />
		<ReactQueryDevtools />
		<ToastContainer />
	</QueryProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
