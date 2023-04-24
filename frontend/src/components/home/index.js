import React from "react";
import SideNav from "../usables/sidebar";
import "./index.css";
import Player from "../audio-player/AudioPlayer.js";
import Podcasts from "../Podcasts";

const Home = () => {
  return (
    <div className="homeWrapper">
      <div className="homeHeader">
        <div className="homeSidebar">
          <SideNav></SideNav>
        </div>
        <div className="homePodcasts">
          <Podcasts></Podcasts>
        </div>
      </div>
      <div className="homeFooter">
        <Player></Player>
      </div>
    </div>
  );
};

export default Home;
