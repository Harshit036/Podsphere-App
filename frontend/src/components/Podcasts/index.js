import React, { useState } from "react";
import "./index.css";
import PodcastList from "./CompletePodList.js";
import { tracks } from "../data/tracks";
import Header from "../Headers/Header.js";
import PodcastCard from "./PodcastCard";
import HomePodcasts from "./HomePodcasts";
const Podcasts = () => {
  const [wordEntered, setWordEntererd] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  return (
    <div className="podcastWrapper">
      <div className="podcastHeader">
        <Header
          options={tracks}
          wordEntered={wordEntered}
          setWordEntered={setWordEntererd}
          filteredData={filteredData}
          setFilteredData={setFilteredData}
        ></Header>
      </div>
      <div className="allPodcastWrapper">
        {wordEntered ? (
          filteredData.map((podcast, id) => {
            return (
              <div className="podcastWrapper">
                <PodcastCard
                  podcastName={podcast.title}
                  podcastArtist={podcast.author}
                  podcastImg={podcast.thumbnail}
                  podcastYear={podcast.year}
                  podcastGenre={podcast.genre}
                ></PodcastCard>
                ;
              </div>
            );
          })
        ) : (
          <HomePodcasts></HomePodcasts>
        )}
      </div>
    </div>
  );
};

export default Podcasts;
