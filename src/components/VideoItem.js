import React from 'react';
import './VideoItem.css'; // Importation du fichier CSS pour le style

const VideoItem = ({ video, onVideoSelect }) => {
  // Gestion de la sélection d'une vidéo
  return (
    <div onClick={() => onVideoSelect(video)} className="video-item">
      <img
        alt={video.snippet.title}
        className="ui image"
        src={video.snippet.thumbnails.medium.url}
      />
      <div className="content">
        <div className="header">{video.snippet.title}</div>
      </div>
    </div>
  );
};

export default VideoItem;
