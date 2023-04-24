import React from "react";

const Podcasts = ({ podcast }) => {
  return (
    <div>
      <img src={podcast.img} alt="podcast_img" />
      <div>
        <p>{podcast.name}</p>
        <p>{podcast.artist}</p>
      </div>
      <audio src={podcast.podcast} controls />
    </div>
  );
};

export default Podcasts;
