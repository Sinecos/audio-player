import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/AudioPlayer.module.css";
import { BsArrowLeftShort } from "react-icons/bs";
import { BsArrowRightShort } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";

const AudioPlayer = () => {
  //State
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playspeedTime, setPlaySpeed] = useState(1);

  //references
  const audioPlayer = useRef(); // reference our audio component
  const progressBar = useRef(); // reference our progress bar
  const animationRef = useRef(); // reference the animation
  const playbackSpeedBar = useRef(); // reference our playbackSpeed progress bar

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds; // max of the progressBar
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  };

  const changePlayspeedRange = () => {
    setPlaySpeed(playbackSpeedBar.current.value / 50);
    audioPlayer.current.playbackRate = Number(
      playbackSpeedBar.current.value / 50
    );
  };

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(progressBar.current.value / duration) * 100}%`
    );
    setCurrentTime(progressBar.current.value);
  };

  const backFive = () => {
    progressBar.current.value = Number(audioPlayer.current.currentTime - 5);
    changeRange();
  };

  const forwardFive = () => {
    progressBar.current.value = Number(audioPlayer.current.currentTime + 5);
    changeRange();
  };

  return (
    <div>
      <div className={styles.audioPlayer}>
        <audio
          ref={audioPlayer}
          src="https://server7.mp3quran.net/shur/002.mp3"
          preload="metadata"
        ></audio>
        <button className={styles.forwardBackward} onClick={backFive}>
          <BsArrowLeftShort /> 5
        </button>
        <button onClick={togglePlayPause} className={styles.playPause}>
          {isPlaying ? <FaPause /> : <FaPlay className={styles.play} />}
        </button>
        <button className={styles.forwardBackward} onClick={forwardFive}>
          <BsArrowRightShort />5
        </button>
        {/* Current time */}
        <div className={styles.currentTime}>{calculateTime(currentTime)}</div>
        {/* Progress bar */}
        <input
          type="range"
          className={styles.progressBar}
          defaultValue="0"
          ref={progressBar}
          onChange={changeRange}
        />
        {/* Duration time */}
        <div className={styles.duration}>
          {duration && !isNaN(duration) && calculateTime(duration)}
        </div>
      </div>
      <div>
        <input
          type="range"
          step="0.01"
          className={styles.playbackSpeedBar}
          defaultValue="50"
          ref={playbackSpeedBar}
          onChange={changePlayspeedRange}
        />
        {Math.round(playspeedTime * 100) / 100}x
      </div>
      <div className={styles.playbackSpeedText}>playback speed</div>
    </div>
  );
};

export { AudioPlayer };
