import React from 'react'
import ArtItem from '../ArtItem'
import { useArtStore } from '../../stores/artStore'
import styles from './index.module.css'

export default function Arts() {
	const { snap: { arts } } = useArtStore()

	return <section className={styles.artsContainer}>
		{arts.map(({ id, disabled }) => {
			return !disabled ? <div className={styles.artItem} key={id}>
				<ArtItem id={id} />
			</div> : null
		})}
	</section>
}

