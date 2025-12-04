import { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';


const AudioPlayer = ({ src, title, onEnded }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      if (onEnded) onEnded();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [onEnded]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeChange = (e) => {
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (isMuted) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <audio ref={audioRef} src={src} />
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {title}
        </h3>
        <div className="flex items-center space-x-4">
          <button
            onClick={togglePlay}
            className="text-blue-500 hover:text-blue-600 transition-colors duration-300"
          >
            {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
          </button>
          <button
            onClick={toggleMute}
            className="text-gray-600 hover:text-gray-800 transition-colors duration-300"
          >
            {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600 w-12">
          {formatTime(currentTime)}
        </span>
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleTimeChange}
          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <span className="text-sm text-gray-600 w-12">
          {formatTime(duration)}
        </span>
      </div>

      <div className="mt-2">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
};


export default AudioPlayer; 
