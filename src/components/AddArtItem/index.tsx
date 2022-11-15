import { useArtStore } from '../../stores/artStore'
import React, { useRef, useState } from 'react'
import { Button, TextField } from '@mui/material'
import styles from './index.module.css'
import { setToast } from '../../utils/toastUtils'

export default function AddArtItem() {
	const [artId, setArtId] = useState<number | undefined>()
	const { actions } = useArtStore()
	const inputRef = useRef<any>('')

	const handleAddClick = () => {
		if (!artId) return
		if (actions.hasArt(artId)) {
			setToast({ content: 'The following art is already on display' })
			return
		}
		actions.addArt(artId)
		setArtId(undefined)
		inputRef.current.value = ''
	}

	const handleArtIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setArtId(+event.target.value)
	}

	return <div className={styles.addArtItem}>
		<TextField
			type="number"
			label="Please enter Art ID"
			variant='standard'
			inputRef={inputRef}
			onChange={handleArtIdChange} />

		<Button onClick={handleAddClick} disabled={!artId} variant='text'>Add</Button>
	</div>
}
