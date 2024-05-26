// src/youtube.js
import axios from 'axios';

const KEY = 'AIzaSyDdEchtJECD0Xnc6p_oLl-e8O978hlbijs'; // Remplacez par votre clé API

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    part: 'snippet',
    maxResults: 5,
    key: KEY
  }
});
