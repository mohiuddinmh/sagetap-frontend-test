export interface Art {
  id: number
  disabled: boolean
}

export interface Artwork {
  data: {
    id: number
    title: string
    artist_title: string
    image_id: string
    thumbnail: { alt_text: string }
  }
}

export interface RatingRequest {
  id: number
  rating: number | null
}