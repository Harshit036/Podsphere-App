import { useRef, useState, useEffect } from "react";
import { tracks } from "../data/tracks";

// import components
import DisplayTrack from "./DisplayTrack";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";
import Volume from "./Volume";
import "./AudioPlayer.css";
import { useSelector } from "react-redux";
// for reducers
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../State/index.js";

const AudioPlayer = () => {
  // states
  const dispatch = useDispatch();
  const { updateTrackIndex, updateIsPlaying } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const trackIndex = useSelector((state) => state.trackIndex);
  const isPlaying = useSelector((state) => state.isPlaying);
  const [currentTrack, setCurrentTrack] = useState(tracks[trackIndex]);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  // const [isPlaying, setIsPlaying] = useState(false);

  // reference
  const audioRef = useRef();
  const progressBarRef = useRef();

  const handleNext = () => {
    console.log("trackIndex in Audio player is ", trackIndex);
    if (trackIndex >= tracks.length - 1) {
      // setTrackIndex(0);
      updateTrackIndex(0);
      setCurrentTrack(tracks[0]);
    } else {
      // setTrackIndex((prev) => prev + 1);
      const prev = trackIndex;
      updateTrackIndex(prev + 1);
      setCurrentTrack(tracks[trackIndex + 1]);
    }
  };

  useEffect(() => {
    setCurrentTrack(tracks[trackIndex]);
  }, [trackIndex]);

  return (
    <div className="audio-player">
      <DisplayTrack
        {...{
          currentTrack,
          audioRef,
          setDuration,
          progressBarRef,
          handleNext,
        }}
      />
      <Controls
        {...{
          audioRef,
          progressBarRef,
          duration,
          timeProgress,
          setTimeProgress,
          tracks,
          trackIndex,
          // setTrackIndex,
          updateTrackIndex,
          setCurrentTrack,
          isPlaying,
          updateIsPlaying,
          handleNext,
        }}
      />
      <Volume
        {...{
          audioRef,
          progressBarRef,
          duration,
          timeProgress,
          setTimeProgress,
          tracks,
          trackIndex,
          updateTrackIndex,
          setCurrentTrack,
          handleNext,
        }}
      ></Volume>
    </div>
  );
};
export default AudioPlayer;
