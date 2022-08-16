import React, { useState } from "react";
import styles from "../styles/AudioPlayer.module.css";
import { BsArrowLeftShort } from "react-icons/bs";
import { BsArrowRightShort } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={styles.audioPlayer}>
      <audio
        src="https://media.blubrry.com/muslim_central_quran/podcasts.qurancentral.com/saud-al-shuraim/saud-al-shuraim-002.mp3"
        preload="metadata"
      ></audio>
      <button className={styles.forwardBackward}>
        <BsArrowLeftShort /> 30
      </button>
      <button onClick={togglePlayPause} className={styles.playPause}>
        {isPlaying ? <FaPause /> : <FaPlay className={styles.play} />}
      </button>
      <button className={styles.forwardBackward}>
        <BsArrowRightShort />
        30
      </button>
      {/* Current time */}
      <div className={styles.currentTime}>0:00</div>
      {/* Progress bar */}
      <input type="range" className={styles.progressBar} />
      {/* Duration time */}
      <div className={styles.duration}>2:49</div>
    </div>
  );
};

export { AudioPlayer };
