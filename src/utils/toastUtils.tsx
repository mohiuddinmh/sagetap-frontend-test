import { Theme, toast, ToastPosition, TypeOptions } from 'react-toastify'
import { MutableRefObject } from 'react'

interface SetToastType {
  autoClose?: number
  content?: string
  onClose?: () => void
  position?: ToastPosition
  ref?: MutableRefObject<number | string | undefined>
  theme?: Theme
  type?: TypeOptions
  isLoading?: boolean
}

const AUTO_CLOSE_MS = 4000

export const setToast = ({
	autoClose = AUTO_CLOSE_MS,
	content,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	onClose = (() => {
	}),
	position = TOAST_POSITION.TOP_CENTER,
	ref = { current: undefined },
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

export const TOAST_THEME: Record<string, Theme> = {
	LIGHT: 'light',
	DARK: 'dark',
	COLORED: 'colored',
	DEFAULT: 'light'
}

export const TOAST_TYPE: Record<string, TypeOptions> = {
	DEFAULT: 'default',
	ERROR: 'error',
	INFO: 'info',
	SUCCESS: 'success',
	WARNING: 'warning'
}

export const TOAST_POSITION: Record<string, ToastPosition> = {
	TOP_RIGHT: 'top-right',
	TOP_CENTER: 'top-center',
	TOP_LEFT: 'top-left',
	BOTTOM_RIGHT: 'bottom-right',
	BOTTOM_CENTER: 'bottom-center',
	BOTTOM_LEFT: 'bottom-left'
}
