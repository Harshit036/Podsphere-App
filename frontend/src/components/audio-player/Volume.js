import React from "react";
import { useState, useEffect, useRef, useCallback } from "react";

import {
  IoPlayBackSharp,
  IoPlayForwardSharp,
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoPlaySharp,
  IoPauseSharp,
} from "react-icons/io5";

import { IoMdVolumeHigh, IoMdVolumeOff, IoMdVolumeLow } from "react-icons/io";

const Volume = ({
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
}) => {
  const [volume, setVolume] = useState(60);
  const [muteVolume, setMuteVolume] = useState(false);

  useEffect(() => {
    if (audioRef) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = muteVolume;
    }
  }, [volume, audioRef, muteVolume]);

  return (
    <div className="volumeWrapper">
      <button onClick={() => setMuteVolume((prev) => !prev)}>
        {muteVolume || volume < 5 ? (
          <IoMdVolumeOff />
        ) : volume < 40 ? (
          <IoMdVolumeLow />
        ) : (
          <IoMdVolumeHigh />
        )}
      </button>
      <input
        type="range"
        min={0}
        max={100}
        value={volume}
        onChange={(e) => setVolume(e.target.value)}
        style={{
          background: `linear-gradient(to right, #f50 ${volume}%, #ccc ${volume}%)`,
        }}
      />
    </div>
  );
};

export default Volume;
