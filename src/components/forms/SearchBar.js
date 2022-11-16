import React from 'react'

function SearchBar({keyword, setKeyword}) {
  return (
    <div className="mt-2">
    <input type="search" className="form-control" placeholder="Search" value={keyword} onChange={(e) => setKeyword(e.target.value)}/>
  </div>
  )
}

export default SearchBar