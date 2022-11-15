import { RatingRequest } from '../types'

export const api = {
	artwork: {
		get: async (id: number) => fetch(`https://api.artic.edu/api/v1/artworks/${id}`).then(handleResponse)
	},
	rating: {
		post: async (request: RatingRequest) => fetch('https://20e2q.mocklab.io/rating', {
			method: 'POST',
			body: JSON.stringify(request)
		}).then(handleResponse)
	}
}

const handleResponse = (res: Response) => {
	if (res.ok) {
		return res.json()
	} else {
		throw new Error(`${res.status} ${res.statusText}`)
	}
}
