"use client"
import React, { useCallback, useRef, useState } from "react"
import Form from "../components/Form"
import Empty from "@/components/Empty"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useStore } from "../store"
import { Movie } from "./types"

const Home: React.FC = () => {
  const [page, setPage] = useState(1)
  const divRef = useRef<HTMLDivElement>(null)
  const setSearchResults = useStore(
    (state: { setSearchResults: any }) => state.setSearchResults
  )
  const setInputValue = useStore(
    (state: { setInputValue: any }) => state.setInputValue
  )
  const setPreviousInputValue = useStore(
    (state: { setPreviousInputValue: any }) => state.setPreviousInputValue
  )
  const searchResults = useStore(
    (state: { searchResults: any }) => state.searchResults
  )
  const inputValue = useStore((state: { inputValue: any }) => state.inputValue)
  const previousInputValue = useStore(
    (state: { previousInputValue: any }) => state.previousInputValue
  )

  const fetchMovies = useCallback(
    async ({ pageParam = 1 }) => {
      if (inputValue !== previousInputValue) {
        // Reset searchResults if inputValue has changed
        setSearchResults([]) // Reset searchResults to an empty array
        setPreviousInputValue(inputValue)
      }

      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${inputValue}&api_key=304078c39efbaebae966f07c3c1127fc&page=${page}`
      )
      const data = await response.json()
      const newResults = data.results
      setSearchResults(newResults)
      return {
        ...data,
        results: newResults, // Only return the new results
      }
    },
    [inputValue, page]
  )

  const { fetchNextPage } = useInfiniteQuery(["movies", page], fetchMovies, {
    getNextPageParam: lastPage =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
  })

  const handleSearch = async ({ search }: { search: string }) => {
    setInputValue(search)
    setPage(1) // Reset page to 1 when performing a new search
    setSearchResults((previousResults: any = []) => {
      // Reset previous results before adding new results
      return previousResults
    })

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=304078c39efbaebae966f07c3c1127fc&page=${page}`
    )
    const data = await response.json()
    const newResults = data.results
    setSearchResults(newResults)
  }

  const handleScroll = async () => {
    if (divRef.current) {
      const { scrollTop, scrollHeight, offsetHeight } = divRef.current
      // Check if we have reached the bottom of the scroll
      if (scrollTop + offsetHeight > scrollHeight - 1) {
        // Do something when reaching the end of scroll
        await fetchNextPage()
        //Go to the next page
        setPage(prevValue => prevValue + 1)
      }
    }
  }

  return (
    <main className="sm:h-full h-full overflow-hidden w-screen mx-auto bg-main_color">
      <div className="sm:px-9 h-full md:px-20 pt-5 px-[8.75rem] min-h-screen pb-8 flex items-center justify-center">
        <div
          ref={divRef}
          onScroll={handleScroll}
          className="font-interV-font flex flex-col items-center overflow-y-auto space-y-4 bg-gray-100 p-4 rounded-md shadow-md max-w-[50%] w-[400px] h-[400px]"
        >
          <Form onSubmit={handleSearch} />
          {Array.isArray(searchResults) && searchResults.length > 0 ? (
            searchResults.map((movie: Movie, index: number) => (
              <div key={index}>{movie.title}</div>
            ))
          ) : (
            <Empty />
          )}
        </div>
      </div>
    </main>
  )
}

export default Home
