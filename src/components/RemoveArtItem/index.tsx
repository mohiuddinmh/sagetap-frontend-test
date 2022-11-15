import React from 'react'
import { Tooltip } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { artRemover, useArtsAtom } from '../../atoms/art'

interface RemoveArtItemProps {
  id: number
}

export default function RemoveArtItem({ id }: RemoveArtItemProps) {

	const [, setArts] = useArtsAtom()

	const handleRemoveClick = () => {
		setArts(artRemover(id))
	}

	return <Tooltip
		onClick={handleRemoveClick}
		style={{ float: 'right', alignSelf: 'end' }}
		title="Remove Art Item">
		<CloseIcon />
	</Tooltip>
}