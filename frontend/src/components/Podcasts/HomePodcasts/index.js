import React from "react";
import "./index.css";
import PodcastRow from "./PodcastRow";
import { tracks } from "../../data/tracks.js";

const HomePods = () => {
  return (
    <div className="homePodsWrapper">
      <div className="podcastRow">
        <PodcastRow
          heading="Top 100 Podcasts"
          podcastList={tracks}
        ></PodcastRow>
      </div>
      <div className="podcastRow">
        <PodcastRow
          heading="Top 100 Podcasts"
          podcastList={tracks}
        ></PodcastRow>
      </div>
    </div>
  );
};

export default HomePods;
