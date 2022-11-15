import { proxy, useSnapshot } from 'valtio'
import { Art } from '../types'

interface ArtState {
  arts: Art[]
}

const initialState = {
	arts: [
		{ id: 27992, disabled: false },
		{ id: 27998, disabled: false },
		{ id: 27999, disabled: false },
		{ id: 27997, disabled: true },
		{ id: 27993, disabled: true },
	]
}

const state = proxy<ArtState>(initialState)

const actions = {
	hasArt: (id: number) => state.arts.some(a => a.id === id),
	addArt: (id: number) => {
		state.arts.unshift({ id, disabled: false })
	},
	removeArt: (id: number) => {
		const foundAt = state.arts.findIndex(a => a.id === id)
		foundAt >= 0 && state.arts.splice(foundAt, 1)
	},
}

export const useArtStore = () => {
	const snap = useSnapshot(state)
	return { snap, actions }
}