import React from "react"
// import CSVReader from "../components/CSVReader"
import SearchBar from "../components/SearchBar"
// import { Toaster } from 'react-hot-toast'
import CSVCardContainer from "../components/CSVCardContainer"
import Empty from "../components/Empty"

interface CSVCardProps {
  data: {
    name: string
    city: string
    country: string
    favorite_sport: string
  }[]
}

const Home: React.FC = () => {
  const [data, setData] = React.useState<CSVCardProps["data"]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [isError, setIsError] = React.useState(false)
  const handleSearch = (results: any) => {
    setData(results)
  }

  return (
    <div className="sm:h-full h-full overflow-hidden w-screen mx-auto bg-main_color">
      {/* <Toaster position="top-center" reverseOrder={false} /> */}
      <main className="sm:px-9 h-full md:px-20 pt-5 px-[8.75rem] min-h-screen pb-8 flex items-center justify-center">
        <div className="flex flex-col items-center  space-y-4 bg-gray-100 p-4 rounded-md shadow-md max-w-[50%]">
          {/* <CSVReader /> */}
          <SearchBar
            onSearch={handleSearch}
            setIsLoading={setIsLoading}
            setIsError={setIsError}
          />
          {data.length === 0 || (isLoading && data) || isError ? (
            <Empty />
          ) : (
            <CSVCardContainer data={data} />
          )}
        </div>
      </main>
    </div>
  )
}

export default Home
