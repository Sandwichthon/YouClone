import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VideoDetail.css';
import { FaUserCircle } from 'react-icons/fa'; // Importation de l'icône utilisateur depuis react-icons

const VideoDetail = ({ video, onLoadMore }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (video) {
      fetchComments(video.id.videoId);
    }
  }, [video]);

  const fetchComments = async (videoId) => {
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/commentThreads', {
        params: {
          part: 'snippet',
          videoId: videoId,
          key: 'AIzaSyDdEchtJECD0Xnc6p_oLl-e8O978hlbijs', // API key
          maxResults: 10, // Nombre de commentaires
        },
      });
      const formattedComments = response.data.items.map(item => ({
        author: item.snippet.topLevelComment.snippet.authorDisplayName,
        text: item.snippet.topLevelComment.snippet.textDisplay,
        timeAgo: new Date(item.snippet.topLevelComment.snippet.publishedAt).toLocaleDateString(), // Formater la date
      }));
      setComments(formattedComments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  if (!video) {
    return <div>Loading...</div>;
  }

  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
  const { title, description, publishedAt } = video.snippet; // Extracting the publishedAt property
  const formattedDate = new Date(publishedAt).toLocaleDateString(); // Formatting the date

  return (
    <div>
      <div className="ui embed">
        <iframe src={videoSrc} title="video player" />
      </div>
      <div className="ui segment video-description">
        <h4 className="ui header">{title}</h4>
        <p><strong>Uploaded on: </strong> {formattedDate}</p> {/* Moved the formatted date above the description */}
        <p>{description}</p>
        <button onClick={() => onLoadMore(video.id.videoId)} className="ui button small">
          Load More
        </button>
      </div>
      <div className="ui segment video-comments">
        <h4 className="ui header">Comments</h4>
        {comments.map((comment, index) => (
          <div key={index} className="comment">
            <FaUserCircle className="profile-image" /> {/* Icône d'utilisateur par défaut */}
            <div className="comment-text">
              <div>
                <span className="author">{comment.author}</span>
                <span className="metadata">{comment.timeAgo}</span>
              </div>
              <div className="text">{comment.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoDetail;
