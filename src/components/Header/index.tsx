import AddArtItem from '../AddArtItem'
import React from 'react'
import styles from './index.module.css'

const Header = () => <header className={styles.header}>
	<h2>Art Rater</h2>
	<AddArtItem />
</header>

export default Header