export type Movie = {
  id: number
  title: string
}

export type Store = {
  searchResults: Movie[]
  setSearchResults: (newResults: Movie[]) => void
  inputValue: string
  setInputValue: (value: string) => void
  previousInputValue: string
  setPreviousInputValue: (value: string) => void
}
