import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Searchbar = ({ handleSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    setQuery(value);
  };

  const onSubmit = event => {
    event.preventDefault();
    if (query.trim() === '') {
      toast('Input search query!');
      return;
    }
    handleSearch(query);
    setQuery('');
  };

  return (
    <div>
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={onSubmit}>
          <button type="submit" className="SearchForm-button">
            Search
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            name="query"
            value={query}
            onChange={handleChange}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    </div>
  );
};

export default Searchbar;
