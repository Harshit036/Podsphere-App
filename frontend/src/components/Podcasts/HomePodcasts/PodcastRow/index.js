import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PodcastCard from "../../PodcastCard";
import "./index.css";

const PodcastRow = ({ heading, podcastList }) => {
  console.log("podcastList is ", podcastList);
  const settings = {
    dots: "true",
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 6,
    speed: 500,
    slidesToScroll: 1,
  };
  return (
    <div className="podcastRowWrapper">
      <div className="podcastRowHeading">{heading}</div>
      <div className="podcastSlider">
        <Slider {...settings}>
          {podcastList.map((podcast) => (
            <div style={{ margin: "auto 3rem" }}>
              <PodcastCard
                podcastName={podcast.title}
                podcastArtist={podcast.author}
                podcastImg={podcast.thumbnail}
                podcastYear={podcast.year}
                podcastGenre={podcast.genre}
                podcastId={podcast.id}
              ></PodcastCard>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default PodcastRow;
