import { useArtStore } from '../../stores/artStore'
import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'
import styles from './index.module.css'
import { setToast } from '../../utils/toastUtils'

export default function AddArtItem() {
	const [artId, setArtId] = useState<number | undefined>()
	const { actions } = useArtStore()

	const handleAddClick = () => {
		if (actions.hasArt(artId)) {
			setToast({ content: 'The following art is already on display' })
			return
		}
		artId !== undefined && actions.addArt(artId)
	}

	const handleArtIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setArtId(+event.target.value)
	}

	return <div className={styles.addArtItem}>
		<TextField type="number" label="Please enter Art ID" variant='standard' onChange={handleArtIdChange} />

		<Button onClick={handleAddClick} variant='text'>Add</Button>
	</div>
}
