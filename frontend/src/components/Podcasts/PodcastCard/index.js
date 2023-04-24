import React, { useState, useRef } from "react";
import "./index.css";
import { useNavigate, Link } from "react-router-dom";

const PodcastCard = ({
  podcastName,
  podcastArtist,
  podcastImg,
  podcastYear,
  podcastGenre,
  podcastId,
}) => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const podcastClick = (e) => {
    // console.log("clicked object is ", ref.current.children[1].innerText);
    console.log("clicked object is ", ref.current);
    const data = {
      id: podcastId,
    };
    navigate("playPodcast", { state: data });
  };
  return (
    <div className="podcastCardWrapper" onClick={podcastClick} ref={ref}>
      <div
        className="podcastImgWrapper"
        style={{ backgroundImage: `url(${podcastImg})` }}
      >
        {/* <img src={podcastImg} alt="/" className="podcastImg" /> */}
      </div>
      <div className="podcastName">{podcastName}</div>
      <div className="podcastArtist">{podcastArtist}</div>
      <div className="podcastInfo">
        <div className="podcastYear">{podcastYear}</div>
        <div className="podcastGenre">{podcastGenre}</div>
      </div>
    </div>
  );
};

export default PodcastCard;
