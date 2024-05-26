import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import VideoDetail from './components/VideoDetail';
import Footer from './components/Footer'; // Import the Footer component
import './components/Styles.css';

const KEY = 'AIzaSyDdEchtJECD0Xnc6p_oLl-e8O978hlbijs'; // Replace with your YouTube API key

const App = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [nextPageToken, setNextPageToken] = useState('');
  const [error, setError] = useState('');
  const [fullDescription, setFullDescription] = useState(false);
  const videoDetailRef = useRef(null);

  useEffect(() => {
    onTermSubmit('React tutorials');  // Recherche initiale
  }, []);

  const onTermSubmit = async (term) => {
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          q: term,
          part: 'snippet',
          maxResults: 5, // Nombre maximum de commentaires à récupérer
          key: KEY,
        }
      });
      setVideos(response.data.items);
      setSelectedVideo(response.data.items[0]);
      setNextPageToken(response.data.nextPageToken);
      setError(''); // Clear any previous errors
    } catch (err) {
      setError('Failed to fetch videos. Please check your API key and permissions.');
      console.error('Error fetching videos:', err.response ? err.response.data : err.message);
    }
  };

  const onLoadMoreVideos = async () => {
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          maxResults: 5,
          pageToken: nextPageToken,
          key: KEY,
        }
      });
      setVideos([...videos, ...response.data.items]);
      setNextPageToken(response.data.nextPageToken);
      setError(''); // Clear any previous errors
    } catch (err) {
      setError('Failed to load more videos. Please check your API key and permissions.');
      console.error('Error loading more videos:', err.response ? err.response.data : err.message);
    }
  };

  const onLoadMoreDescription = async () => {
    if (fullDescription) {
      setFullDescription(false);
      return;
    }
    
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
        params: {
          part: 'snippet',
          id: selectedVideo.id.videoId,
          key: KEY,
        }
      });
      const videoData = response.data.items[0];
      const updatedVideo = { ...selectedVideo, snippet: videoData.snippet };
      setSelectedVideo(updatedVideo);
      setFullDescription(true);
      setError(''); // Clear any previous errors
    } catch (err) {
      setError('Failed to load more description. Please check your API key and permissions.');
      console.error('Error loading more description:', err.response ? err.response.data : err.message);
    }
  };

  const onLoadMoreComments = async () => {
    // This function will be handled in the VideoDetail component
    console.log('Load more comments');
  };

  const onVideoSelect = (video) => {
    setSelectedVideo(video);
    setFullDescription(false);
    if (videoDetailRef.current) {
      videoDetailRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoClick = () => {
    window.location.reload();
  };
  

  return (
    <div className="ui container">
    <div className="logo-search-container">
      <img src="logo69.png" alt="Logo" className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }} />
      <SearchBar onFormSubmit={onTermSubmit} />
    </div>
    {error && <div className="ui red message">{error}</div>}
    <div className="ui grid">
      <div className="ui row">
        <div ref={videoDetailRef} className="eleven wide column">
          <VideoDetail
            video={selectedVideo}
            onLoadMore={onLoadMoreDescription}
            onLoadMoreComments={onLoadMoreComments}
            fullDescription={fullDescription}
          />
        </div>
        <div className="five wide column">
          <VideoList videos={videos} onVideoSelect={onVideoSelect} />
          {nextPageToken && (
            <div className="load-more" onClick={onLoadMoreVideos}>
              Load more
            </div>
          )}
        </div>
      </div>
    </div>
    <Footer /> {/* Include the Footer component */}
  </div>
  );
};

export default App;
