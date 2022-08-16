import React from "react";
import styles from "../styles/AudioPlayer.module.css";

const AudioPlayer = () => {
  return (
    <div className={styles.audioPlayer}>
      <audio
        src="https://media.blubrry.com/muslim_central_quran/podcasts.qurancentral.com/saud-al-shuraim/saud-al-shuraim-002.mp3"
        preload="metadata"
      ></audio>
      <button>back 30</button>
      <button>play / pause </button>
      <button>forward 30</button>

      {/* Current time */}
      <div>0:00</div>

      {/* Progress bar */}
      <input type="range" />

      {/* Duration time */}
      <div>2:49</div>
    </div>
  );
};

export { AudioPlayer };
