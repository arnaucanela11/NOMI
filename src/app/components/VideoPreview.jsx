import { useEffect, useRef, useState } from "react";
import { getVideo } from "../api/handlers";
import "../editor/[project_id]/project.css";

// TODO: 1. CREATE THE DIMENSION BUTTON TO CHANGE THE ASPECT RATIO OF THE VIDEO 2. Create the time line of the video 

const VideoPreview = ({ project_name }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [Video, setVideo] = useState(null);

  useEffect(() => {
    async function getFunction() {
      const { video } = await getVideo(project_name);
      const video_url = "http://127.0.0.1:8000" + video;
      setVideo(video_url);
    }
    getFunction();
  }, []);

  const handlePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleFullScreen = () => {
    const video = videoRef.current;

    if (video) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
      }
    }
  };

  return (
    <div className="preview__main__div">
      <video ref={videoRef} width="600" src={Video}>
        <source src={Video} type="video/mp4" />
        Tu navegador no soporta la reproducción de videos.
      </video>
      <div className="flex flex-row justify-center items-center mt-5 gap-4">
        <button onClick={handlePlayPause} className="pause__div">
          {isPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
            >
              <path
                d="M15.3333 20.5833V6H19.5V20.5833H15.3333ZM7 20.5833V6H11.1667V20.5833H7Z"
                fill="white"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              viewBox="0 0 23 23"
              fill="none"
            >
              <path
                d="M7.1875 20.125C6.99688 20.125 6.81406 20.0493 6.67927 19.9145C6.54448 19.7797 6.46875 19.5969 6.46875 19.4062V3.59375C6.46881 3.46754 6.5021 3.34357 6.56527 3.23431C6.62844 3.12505 6.71927 3.03435 6.82862 2.97133C6.93798 2.90831 7.06199 2.8752 7.1882 2.87532C7.31441 2.87545 7.43837 2.9088 7.54759 2.97203L21.2038 10.8783C21.3128 10.9415 21.4032 11.0322 21.466 11.1413C21.5289 11.2504 21.5619 11.3741 21.5619 11.5C21.5619 11.6259 21.5289 11.7496 21.466 11.8587C21.4032 11.9678 21.3128 12.0585 21.2038 12.1217L7.54759 20.028C7.43822 20.0915 7.31399 20.125 7.1875 20.125ZM2.875 2.875H4.3125V20.125H2.875V2.875Z"
                fill="white"
              />
            </svg>
          )}
        </button>
        <button onClick={toggleFullScreen} className="pause__div">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="23"
            viewBox="0 0 23 23"
            fill="none"
          >
            <path
              d="M6.13327 22.2333H16.8666M0.766602 3.83334V16.1C0.766602 16.5067 0.928149 16.8967 1.2157 17.1842C1.50326 17.4718 1.89327 17.6333 2.29993 17.6333H20.6999C21.1066 17.6333 21.4966 17.4718 21.7842 17.1842C22.0717 16.8967 22.2333 16.5067 22.2333 16.1V3.83334C22.2333 3.42667 22.0717 3.03666 21.7842 2.74911C21.4966 2.46155 21.1066 2.3 20.6999 2.3H2.29993C1.89327 2.3 1.50326 2.46155 1.2157 2.74911C0.928149 3.03666 0.766602 3.42667 0.766602 3.83334Z"
              stroke="white"
              stroke-width="1.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default VideoPreview;
