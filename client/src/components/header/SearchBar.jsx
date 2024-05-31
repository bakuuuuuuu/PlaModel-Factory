import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../header/searchBar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = () => {
    const [input, setInput] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
    };

    const handleSearch = () => {

    };

    return (
        <div className="SearchBar-container">
            <input type="text" className="SearchBar-input" placeholder='검색어를 입력해주세요' onChange={handleChange}></input>
            <button className="SearchBar-btn" onClick={handleSearch}>
                <FontAwesomeIcon icon={faSearch} className="Search-icon" />
            </button>
        </div>
    );
};

export default SearchBar;