import { create } from "zustand"
import { Movie, Store } from "../app/types"

export const useStore = create<Store>((set, get) => {
  const storedSearchResults = localStorage.getItem("searchResults")
  const storedInputValue = localStorage.getItem("inputValue")
  const storedPreviousInputValue = localStorage.getItem("previousInputValue")

  return {
    searchResults: storedSearchResults ? JSON.parse(storedSearchResults) : [],
    setSearchResults: (newResults: Movie[]) => {
      set(state => {
        const updatedSearchResults = Array.isArray(newResults)
          ? [...state.searchResults, ...newResults]
          : []
        localStorage.setItem(
          "searchResults",
          JSON.stringify(updatedSearchResults)
        )
        return { searchResults: updatedSearchResults }
      })
    },
    inputValue: storedInputValue || "",
    setInputValue: (value: string) => {
      set(state => {
        localStorage.setItem("inputValue", value)
        return {
          inputValue: value,
        }
      })
    },
    previousInputValue: storedPreviousInputValue || "",
    setPreviousInputValue: (value: string) => {
      set(state => {
        localStorage.setItem("previousInputValue", value)
        return {
          previousInputValue: value,
        }
      })
    },
  }
})
