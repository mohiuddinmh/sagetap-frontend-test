import { useArtStore } from '../../stores/artStore'
import React from 'react'
import { Tooltip } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

interface RemoveArtItemProps {
  id: number
}

export default function RemoveArtItem({ id }: RemoveArtItemProps) {
	const { actions } = useArtStore()

	const handleRemoveClick = () => {
		actions.removeArt(id)
	}

	return <Tooltip
		onClick={handleRemoveClick}
		style={{ float: 'right', alignSelf: 'end' }}
		title="Remove Art Item">
		<CloseIcon />
	</Tooltip>
}