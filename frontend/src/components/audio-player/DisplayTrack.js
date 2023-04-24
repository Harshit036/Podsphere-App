import { BsMusicNoteBeamed } from "react-icons/bs";
import "./AudioPlayer.css";

const DisplayTrack = ({
  currentTrack,
  audioRef,
  setDuration,
  progressBarRef,
  handleNext,
}) => {
  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };

  return (
    <div className="podcastInfo">
      <audio
        src={currentTrack.src}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={handleNext}
      />
      <div className="audio-info">
        <div className="audio-image-wrapper">
          {currentTrack.thumbnail ? (
            <img
              className="audio-image"
              src={currentTrack.thumbnail}
              alt="audio avatar"
            />
          ) : (
            <div className="icon-wrapper">
              <span className="audio-icon">
                <BsMusicNoteBeamed />
              </span>
            </div>
          )}
        </div>
        <div className="audio-text">
          <div className="audio-title">{currentTrack.title}</div>
          <div className="audio-author">{currentTrack.author}</div>
        </div>
      </div>
    </div>
  );
};
export default DisplayTrack;
