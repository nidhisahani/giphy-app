'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';

function SearchBar() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [gifs, setGifs] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const fetchGifs = async (page = 0) => {
    try {
      const login = sessionStorage.getItem('login');
      if (login) {
        const offset = page * 3;
        const response = await axios.get(
          `https://api.giphy.com/v1/gifs/search?api_key=GlVGYHkr3WSBnllca54iNt0yFbjz7L65&q=${searchTerm}`
        );
        setGifs(response.data.data);
        setCurrentPage(page);
        setHasMore(response.data.pagination.total_count > offset + response.data.pagination.count);
      } else {
        console.log('Please log in');
        router.push('/sign-in');
      }
    } catch (error) {
      console.error('Error fetching GIFs:', error);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      fetchGifs(0);
    } else {
      setGifs([]);
    }
  }, [searchTerm, router]);

  const totalPages = Math.ceil(gifs.length / 3);

  const startIndex = currentPage * 3;

  const currentItems = gifs.slice(startIndex, startIndex + 3);

  const handleSearch = () => {
    fetchGifs(0);
  };

  const handleNextPage = () => {
    fetchGifs(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      fetchGifs(currentPage - 1);
    }
  };



  return (
    <div className="flex flex-col items-center m-5 bg-white">
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for GIFs"
          className="px-4 py-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 font-bold text-white bg-black rounded-md hover:bg-indigo-700"
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-3 sm:grid-cols-3 lg:grid-cols-3">
        {currentItems.map((gif) => (
          <div key={gif.id} className="m-2">
            <img
              src={gif.images.fixed_height.url}
              alt={gif.title}
              className="rounded-md object-fill h-48 w-96"
            />
            <div className="m-2">
              <h4>{gif.title.slice(0, 10)}</h4>
              <p className="m-10px font-thin">@{gif.username}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="py-4">
        {gifs.length > 0 ? (
          <div className='m-2'>
            <button
              onClick={handlePreviousPage}
              className="px-2 py-2 bg-gray-500 text-white rounded-md"
              disabled={currentPage === 0 || !searchTerm}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageClick(index)}
                className={`px-3 py-1 rounded ${index === currentPage ? 'bg-pink-200' : 'bg-white border border-gray-300 hover:bg-gray-100'}`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={handleNextPage}
              className="px-4 py-2 bg-green-500 text-white rounded-md"
              disabled={!hasMore || !searchTerm}
            >
              Next
            </button>
          </div>) : ('')}
      </div>
    </div>
  );
}

export default SearchBar;
