import { Theme, toast, TypeOptions } from 'react-toastify'
import React from 'react'

interface SetToastType {
  autoClose?: number
  content?: any
  onClose?: () => void
  position?: any
  ref?: any
  theme?: any
  type?: any
  isLoading?: boolean
}

const AUTO_CLOSE_MS = 5000

export const setToast = ({
	autoClose = AUTO_CLOSE_MS,
	content,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	onClose = (() => {
	}),
	position = TOAST_POSITION.TOP_CENTER,
	ref = {},
	theme = TOAST_THEME.DEFAULT,
	type = TOAST_TYPE.DEFAULT,
	isLoading = false
}: SetToastType) => {
	ref.current = isLoading ?
		toast.loading('Submitting orders...', { theme }) :
		toast(content, {
			autoClose, onClose, type, theme, position,
		})
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const updateToastOnError = (toastId, { render, theme = TOAST_THEME.DEFAULT as Theme }) => {
	toast.update(toastId, {
		render,
		type: TOAST_TYPE.ERROR as TypeOptions,
		theme,
		isLoading: false,
		autoClose: AUTO_CLOSE_MS,
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		onClose: () => {
		},
		closeButton: true,
	})
}

export const updateToastOnSuccess = (toastId: any, { render }: any) => {
	toast.update(toastId, {
		render,
		type: TOAST_TYPE.SUCCESS as TypeOptions,
		theme: TOAST_THEME.DEFAULT as Theme,
		isLoading: false,
		autoClose: AUTO_CLOSE_MS,
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		onClose: () => {
		},
		closeButton: true,
	})
}

export const ErrorToast = ({ heading, reason }: { heading: string, reason: string }) => (
	<>
		<div>{heading}</div>
		{reason && <div>{reason}</div>}
	</>
)

export const TOAST_THEME = {
	LIGHT: 'light',
	DARK: 'dark',
	COLORED: 'colored',
	DEFAULT: 'light'
}

export const TOAST_TYPE = {
	DEFAULT: 'default',
	ERROR: 'error',
	INFO: 'info',
	SUCCESS: 'success',
	WARNING: 'warning'
}

export const TOAST_POSITION = {
	TOP_RIGHT: 'top-right',
	TOP_CENTER: 'top-center',
	TOP_LEFT: 'top-left',
	BOTTOM_RIGHT: 'bottom-right',
	BOTTOM_CENTER: 'bottom-center',
	BOTTOM_LEFT: 'bottom-left'
}
