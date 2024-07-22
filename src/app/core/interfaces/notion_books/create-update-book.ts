export interface NewBook {
  icon: string
  cover: string
  parent: string
  name: string
  author: string[]
  pages: number
  status: string
  isbn_13: string
  year: string[]
  start_end: string
  score: string
  genre: string[]
}

export interface UpdateBook extends Partial<NewBook> { }