'use client'
function SearchBar() {
  return (
    <div className="flex flex-col items-center m-5 bg-white">
      <div className="">
        <input
          type="text"
          //value={searchTerm}
          //onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for GIFs"
          className="px-4 py-2 border border-gray-300 rounded-md"
        />
        <button
          // onClick={fetchGifs}
          className="px-4 py-2  font-bold text-white bg-black rounded-md hover:bg-indigo-700">
          Search
        </button>
      </div>
      <div></div>
      <div></div>
    </div>
  )
}

export default SearchBar
