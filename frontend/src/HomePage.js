import { useEffect, useState } from "react";
import axios from "axios";
import PodcastForm from "../PodcastForm/index";
import Podcast from "../Podcasts/index";

function HomePage() {
  const [podcasts, setPodcasts] = useState([]);

  const getAllPodcasts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/podcasts");
      setPodcasts(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPodcasts();
  }, []);
  return (
    <div className="container">
      <PodcastForm />
      <div className="podcasts_container">
        {podcasts.map((podcast) => (
          <Podcast podcast={podcast} key={podcast._id} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
