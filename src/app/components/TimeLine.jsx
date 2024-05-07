import { useEffect, useRef, useState } from "react";
import "../editor/[project_id]/page";
import { getVideo } from "../api/handlers";

const n_of_tele = 2;
const n_of_tele_arr = new Array(n_of_tele).fill(null);


const Timeline = ({project_name}) => {
  const [Video, setVideo] = useState(null)
  const canvasRef = useRef(null)
  useEffect(() => {
    async function doSync() {
      const { video } = await getVideo(project_name);
      const video_url = "http://127.0.0.1:8000" + video;
      setVideo(video_url);
    }
    doSync()
  }, [])

  useEffect(() => {
    if (Video) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      video.addEventListener("play", () => {
        // Actualiza la línea de tiempo mientras el video se reproduce
        const updateTimeline = () => {
          const currentTime = video.currentTime;
          const duration = video.duration;
          const timelineWidth = canvas.width;

          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Dibuja la línea de tiempo
          ctx.fillStyle = "red"; // Color de la línea de tiempo
          ctx.fillRect(0, 0, (currentTime / duration) * timelineWidth, 10); // Ancho de la línea de tiempo
          requestAnimationFrame(updateTimeline);
        };

        requestAnimationFrame(updateTimeline);
      });
    }
  }, [Video]);

  const handleTimelineClick = (event) => {
    if (Video) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const timelineWidth = canvas.width;
      const clickX = event.nativeEvent.offsetX;
      const duration = video.duration;
      video.currentTime = (clickX / timelineWidth) * duration;
    }
  };

  return (
    <div>
      <div className="timeline-tools">
        <div className="timeline-tools-right">
          <button
            className="lv-btn lv-btn-text lv-btn-size-default lv-btn-shape-square right-icon "
            type="button"
          >
            <svg
              width="1.2em"
              height="1.2em"
              viewBox="0 0 24 24"
              preserveAspectRatio="xMidYMid meet"
              fill="none"
              role="presentation"
              xmlns="http://www.w3.org/2000/svg"
              className="iconpark-icon"
            >
              <g>
                <path
                  data-follow-fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm8-10C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm4 9H8v2h8v-2Z"
                  fill="currentColor"
                ></path>
              </g>
            </svg>
          </button>
          <div className="lv-slider control">
            <div className="lv-slider-wrapper">
              <div className="lv-slider-road">
                <div
                  className="lv-slider-bar"
                  style={{ left: "0%", right: "84.0831%" }}
                ></div>
                <div
                  className="lv-slider-button"
                  role="slider"
                  aria-valuemax="1000000"
                  aria-valuemin="0"
                  aria-valuenow="159169"
                  aria-disabled="false"
                  tabindex="0"
                  aria-valuetext="159169"
                  style={{ left: "15.9169%" }}
                ></div>
              </div>
            </div>
          </div>
          <button
            className="lv-btn lv-btn-text lv-btn-size-default lv-btn-shape-square right-icon "
            type="button"
          >
            <svg
              width="1.2em"
              height="1.2em"
              viewBox="0 0 24 24"
              preserveAspectRatio="xMidYMid meet"
              fill="none"
              role="presentation"
              xmlns="http://www.w3.org/2000/svg"
              className="iconpark-icon"
            >
              <g>
                <path
                  data-follow-fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm8-10C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm-1 14v-3H8v-2h3V8h2v3h3v2h-3v3h-2Z"
                  fill="currentColor"
                ></path>
              </g>
            </svg>
          </button>
        </div>
      </div>
      <div className="timeline-collapse-container">
        <div className="timeline-collapse-playground">
          <div
            className="timeline-collapse-play-bar"
            style={{ width: "25.89%" }}
          >
            <div
              className="timeline-collapse-play-bar-arrow"
              style={{ visibility: "visible" }}
            >
              <svg
                className="cursor-hd-icon"
                width="12"
                height="18"
                viewBox="0 0 12 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask id="path-1-inside-1_1578_341598" fill="white">
                  <path d="M0 3C0 1.34314 1.34315 0 3 0H9C10.6569 0 12 1.34315 12 3V11.8287C12 12.7494 11.5772 13.6191 10.8531 14.1879L6 18L1.14686 14.1879C0.422795 13.6191 0 12.7494 0 11.8287V3Z"></path>
                </mask>
                <path
                  className="icon-bg"
                  d="M0 3C0 1.34314 1.34315 0 3 0H9C10.6569 0 12 1.34315 12 3V11.8287C12 12.7494 11.5772 13.6191 10.8531 14.1879L6 18L1.14686 14.1879C0.422795 13.6191 0 12.7494 0 11.8287V3Z"
                ></path>
                <path
                  className="icon-border"
                  d="M6 18L4.76457 19.5728L6 20.5432L7.23543 19.5728L6 18ZM1.14686 14.1879L-0.0885728 15.7607L1.14686 14.1879ZM10.8531 14.1879L12.0886 15.7607L10.8531 14.1879ZM3 2H9V-2H3V2ZM10 3V11.8287H14V3H10ZM2 11.8287V3H-2V11.8287H2ZM9.61771 12.6151L4.76457 16.4272L7.23543 19.5728L12.0886 15.7607L9.61771 12.6151ZM7.23543 16.4272L2.38228 12.6151L-0.0885728 15.7607L4.76457 19.5728L7.23543 16.4272ZM-2 11.8287C-2 13.3632 -1.29534 14.8128 -0.0885728 15.7607L2.38228 12.6151C2.14093 12.4255 2 12.1356 2 11.8287H-2ZM10 11.8287C10 12.1356 9.85907 12.4255 9.61771 12.6151L12.0886 15.7607C13.2953 14.8128 14 13.3632 14 11.8287H10ZM9 2C9.55228 2 10 2.44772 10 3H14C14 0.238577 11.7614 -2 9 -2V2ZM3 -2C0.238579 -2 -2 0.23857 -2 3H2C2 2.44771 2.44771 2 3 2V-2Z"
                  fill="#090C14"
                  mask="url(#path-1-inside-1_1578_341598)"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="timeline">
        <div className="video__div">
          <svg
            className="ml-[40px]"
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 26 26"
            fill="none"
          >
            <g clip-path="url(#clip0_7_50)">
              <path
                d="M26 6.49999V4.93869C26.0002 4.80224 25.9734 4.6671 25.9213 4.541C25.8691 4.4149 25.7926 4.30033 25.6962 4.20384C25.5997 4.10735 25.4851 4.03085 25.359 3.97871C25.2329 3.92657 25.0978 3.89982 24.9613 3.89999H1.0413C0.904726 3.89982 0.769455 3.92656 0.643211 3.97866C0.516967 4.03077 0.402222 4.10723 0.305529 4.20368C0.208835 4.30014 0.132086 4.41469 0.0796634 4.5408C0.0272408 4.66692 0.000171425 4.80212 8.13592e-07 4.93869V6.49999H2.6V9.09999H8.13592e-07V11.7H2.6V14.3H8.13592e-07V16.9H2.6V19.5H8.13592e-07V21.0587C-0.000170285 21.1955 0.026647 21.331 0.0789166 21.4574C0.131186 21.5838 0.207881 21.6987 0.304609 21.7954C0.401337 21.8921 0.516197 21.9688 0.64261 22.0211C0.769024 22.0733 0.904507 22.1002 1.0413 22.1H24.9613C25.0979 22.0998 25.2331 22.0728 25.3592 22.0203C25.4853 21.9679 25.5999 21.8912 25.6963 21.7945C25.7928 21.6978 25.8692 21.583 25.9213 21.4568C25.9734 21.3305 26.0002 21.1953 26 21.0587V19.5H23.4V16.9H26V14.3H23.4V11.7H26V9.09999H23.4V6.49999H26ZM10.4 16.9V9.09999L16.9 13L10.4 16.9Z"
                fill="white"
                fill-opacity="0.85"
              />
            </g>
            <defs>
              <clipPath id="clip0_7_50">
                <rect width="26" height="26" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <div className="video__schedule">
          <canvas
                width="100%" // Ancho del canvas
                height="30" // Altura del canvas
                onClick={handleTimelineClick}
                ref={canvasRef}
              ></canvas>
          </div>
        </div>
        <div className="tele__div">
          <svg
            className="ml-[40px]"
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 26 26"
            fill="none"
          >
            <path
              d="M5.41675 17.3333C5.41675 17.046 5.53088 16.7705 5.73405 16.5673C5.93721 16.3641 6.21276 16.25 6.50008 16.25H15.1667C15.4541 16.25 15.7296 16.3641 15.9328 16.5673C16.1359 16.7705 16.2501 17.046 16.2501 17.3333C16.2501 17.6206 16.1359 17.8962 15.9328 18.0994C15.7296 18.3025 15.4541 18.4167 15.1667 18.4167H6.50008C6.21276 18.4167 5.93721 18.3025 5.73405 18.0994C5.53088 17.8962 5.41675 17.6206 5.41675 17.3333ZM19.5001 11.9167C19.7874 11.9167 20.0629 12.0308 20.2661 12.234C20.4693 12.4371 20.5834 12.7127 20.5834 13C20.5834 13.2873 20.4693 13.5629 20.2661 13.766C20.0629 13.9692 19.7874 14.0833 19.5001 14.0833H10.8334C10.5461 14.0833 10.2705 13.9692 10.0674 13.766C9.86422 13.5629 9.75008 13.2873 9.75008 13C9.75008 12.7127 9.86422 12.4371 10.0674 12.234C10.2705 12.0308 10.5461 11.9167 10.8334 11.9167H19.5001ZM17.3334 17.3333C17.3334 17.046 17.4475 16.7705 17.6507 16.5673C17.8539 16.3641 18.1294 16.25 18.4167 16.25H19.5001C19.7874 16.25 20.0629 16.3641 20.2661 16.5673C20.4693 16.7705 20.5834 17.046 20.5834 17.3333C20.5834 17.6206 20.4693 17.8962 20.2661 18.0994C20.0629 18.3025 19.7874 18.4167 19.5001 18.4167H18.4167C18.1294 18.4167 17.8539 18.3025 17.6507 18.0994C17.4475 17.8962 17.3334 17.6206 17.3334 17.3333ZM7.58341 11.9167C7.87073 11.9167 8.14628 12.0308 8.34945 12.234C8.55261 12.4371 8.66675 12.7127 8.66675 13C8.66675 13.2873 8.55261 13.5629 8.34945 13.766C8.14628 13.9692 7.87073 14.0833 7.58341 14.0833H6.50008C6.21276 14.0833 5.93721 13.9692 5.73405 13.766C5.53088 13.5629 5.41675 13.2873 5.41675 13C5.41675 12.7127 5.53088 12.4371 5.73405 12.234C5.93721 12.0308 6.21276 11.9167 6.50008 11.9167H7.58341Z"
              fill="white"
              fill-opacity="0.85"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4.33337 3.25C3.47142 3.25 2.64477 3.59241 2.03528 4.2019C1.42578 4.8114 1.08337 5.63805 1.08337 6.5V19.5C1.08337 20.362 1.42578 21.1886 2.03528 21.7981C2.64477 22.4076 3.47142 22.75 4.33337 22.75H21.6667C22.5287 22.75 23.3553 22.4076 23.9648 21.7981C24.5743 21.1886 24.9167 20.362 24.9167 19.5V6.5C24.9167 5.63805 24.5743 4.8114 23.9648 4.2019C23.3553 3.59241 22.5287 3.25 21.6667 3.25H4.33337ZM21.6667 5.41667H4.33337C4.04606 5.41667 3.77051 5.5308 3.56734 5.73397C3.36418 5.93713 3.25004 6.21268 3.25004 6.5V19.5C3.25004 19.7873 3.36418 20.0629 3.56734 20.266C3.77051 20.4692 4.04606 20.5833 4.33337 20.5833H21.6667C21.954 20.5833 22.2296 20.4692 22.4327 20.266C22.6359 20.0629 22.75 19.7873 22.75 19.5V6.5C22.75 6.21268 22.6359 5.93713 22.4327 5.73397C22.2296 5.5308 21.954 5.41667 21.6667 5.41667Z"
              fill="white"
              fill-opacity="0.85"
            />
          </svg>
          <div className="w-[100%]">
            {n_of_tele_arr.map((item, index) => (
              <div
                className={`tele__schedule ${
                  index % 2 === 0 ? "bg-[#3E404F]" : "bg-[#292B32]"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
