import React from 'react'
import { Tooltip } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useArtContext } from '../../contexts/arts'

interface RemoveArtItemProps {
  id: number
}

export default function RemoveArtItem({ id }: RemoveArtItemProps) {
	const { removeArt } = useArtContext()

	const handleRemoveClick = () => {
		removeArt(id)
	}

	return <Tooltip
		onClick={handleRemoveClick}
		style={{ float: 'right', alignSelf: 'end' }}
		title="Remove Art Item">
		<CloseIcon />
	</Tooltip>
}