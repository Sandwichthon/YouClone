import React from 'react';
import VideoItem from './VideoItem';
import './Styles.css'; // Ensure this line is present to import the styles

const VideoList = ({ videos, onVideoSelect, onLoadMore }) => {
  const renderedList = videos.map((video) => {
    return <VideoItem key={video.id.videoId} video={video} onVideoSelect={onVideoSelect} />;
  });

  return (
    <div>
      <div className="ui relaxed divided list">{renderedList}</div>
    </div>
  );
};

export default VideoList;
