import React from "react";

// pass props from plant page 
function Search({searchTerm, handleSearch}) {


// update input to handleSearch and add value to searchterm
  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        type="text"
        id="search"
        placeholder="Type a name to search..."
        onChange={handleSearch}
        value={searchTerm}
      />
    </div>
  );
}


export default Search;
