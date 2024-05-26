import axios from 'axios';

// Clé API YouTube (remplacez par votre propre clé API)
const KEY = 'AIzaSyDdEchtJECD0Xnc6p_oLl-e8O978hlbijs'; 

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    part: 'snippet,statistics', // Parties des données à récupérer
    maxResults: 5, // Nombre maximum de résultats
    key: KEY // Clé API
  }
});
