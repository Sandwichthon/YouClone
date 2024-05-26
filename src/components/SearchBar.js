import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa'; // Importer l'icône de recherche depuis react-icons
import './SearchBar.css'; // Importer le fichier CSS pour le style

// Composant de la barre de recherche
const SearchBar = ({ onFormSubmit }) => {
  const [term, setTerm] = useState('');

  // Fonction pour gérer le changement d'entrée
  const onInputChange = (event) => {
    setTerm(event.target.value);
  };

  // Fonction pour gérer la soumission du formulaire
  const onSubmit = (event) => {
    event.preventDefault();
    onFormSubmit(term);
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Search"
            value={term}
            onChange={onInputChange}
            className="search-input"
          />
          <FaSearch className="search-icon" />
        </div>
        <button type="submit" className="search-button" onClick={onSubmit}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
