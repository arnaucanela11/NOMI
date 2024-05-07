"use client";
import { useEffect, useRef, useState } from "react";
import { poppins } from "../layout";
import "./editor.css";
import { useDropzone } from "react-dropzone";
import {
  RemoveAll,
  checkAudio,
  checkVideo,
  convertToMP3,
  createProject,
} from "../api/handlers";

function page() {
  // const videoFile = useSelector((state) => state.videoFile);
  const fileInputRef = useRef(null);
  const [error, setError] = useState(false);
  const [video, setVideo] = useState(null);
  const [audio, setAudio] = useState(null);
  const [videoError, setVideoError] = useState(false);
  const [audioError, setAudioError] = useState(false);

  const calledOnce = useRef(false);
  useEffect(() => {
    if (calledOnce.current) {
      return;
    }
    async function deleteAll() {
      let project_id = sessionStorage.getItem("project_id");
      console.log(project_id)
      sessionStorage.removeItem("url_v");
      sessionStorage.removeItem("url_a");
      sessionStorage.removeItem("subtitles");
      sessionStorage.removeItem("teleSet");
      await RemoveAll(project_id, sessionStorage.getItem("main_url_v"));
      sessionStorage.removeItem("main_url_v");
      localStorage.removeItem("aspect_ratio");
      sessionStorage.removeItem('project_id')
    }
    deleteAll();
    calledOnce.current = true;
  }, []);

  const handleFolder = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Abre el explorador de archivos al hacer clic en el botón
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    // const { Ok, audio_path } = await convertToMP3(file);

    const { ok, title } = await createProject(file);
    if (!ok) {
      setError(true);
    } else {
      localStorage.setItem("aspect_ratio", aspect_ratio);
      sessionStorage.setItem("project_id", title);
      window.location.href = `editor/${title}`;
    }
    // Aquí puedes realizar las operaciones que desees con el archivo seleccionado.
    // Por ejemplo, puedes mostrar información sobre el archivo o cargarlo en tu aplicación.
  };

  const handleFileChangeDrop = async (file) => {
    console.log(file[0]);
    console.log(file);
    // const { Ok, audio_path } = await convertToMP3(file[0]);
    const { Ok } = await checkVideo(file[0]);
    if (Ok) {
      setVideo(file[0]);
      if (audio) {
        const { ok, title, aspect_ratio } = await createProject(file[0], audio);
        console.log(aspect_ratio);
        if (!ok) {
          setError(true);
        } else {
          localStorage.setItem("aspect_ratio", aspect_ratio);
          sessionStorage.setItem("project_id", title);
          window.location.href = `editor/${title}`;
        }
      } else {
        return;
      }
    } else {
      setVideoError(true);
      return;
    }
  };

  const handleFileChangeDropAudio = async (file) => {
    console.log(file[0]);
    // const { Ok, audio_path } = await convertToMP3(file[0]);
    const { Ok } = await checkAudio(file[0]);
    if (Ok) {
      setAudio(file[0]);
      if (video) {
        const { ok, title, aspect_ratio } = await createProject(video, file[0]);
        if (!ok) {
          setError(true);
        } else {
          localStorage.setItem("aspect_ratio", aspect_ratio);
          sessionStorage.setItem("project_id", title);
          window.location.href = `editor/${title}`;
        }
      } else {
        return;
      }
    } else {
      setAudioError(true);
      return;
    }
  };

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop: handleFileChangeDrop, // Llama a tu función handleFileChange cuando se suelta
    });

  const {
    acceptedFiles: audioFiles,
    getRootProps: audioRootProps,
    getInputProps: audioInputProps,
    isDragActive: isAudioDragActive,
  } = useDropzone({
    onDrop: handleFileChangeDropAudio, // Usar la función específica para audio
  });

  return (
    <main className="relative h-[100vh] w-[100vw] bg-[#141A1E] flex items-center justify-center gap-10">
      <div className="absolute right-20 flex row justify-center items-center gap-4 top-8">
        <button
          className="back__div flex row gap-2 justify-center items-center px-3 py-1"
          onClick={() => window.history.back()}
        >
          <span className={`back__text ${poppins.className}`}>Back</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_4_66)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.07599 5.617C3.15174 5.43431 3.27995 5.27819 3.44442 5.16837C3.60889 5.05854 3.80223 4.99995 3.99999 5H14C14.9192 5 15.8295 5.18106 16.6788 5.53284C17.5281 5.88463 18.2997 6.40024 18.9497 7.05025C19.5998 7.70026 20.1154 8.47194 20.4672 9.32122C20.8189 10.1705 21 11.0807 21 12C21 12.9193 20.8189 13.8295 20.4672 14.6788C20.1154 15.5281 19.5998 16.2997 18.9497 16.9497C18.2997 17.5998 17.5281 18.1154 16.6788 18.4672C15.8295 18.8189 14.9192 19 14 19H4.99999C4.73478 19 4.48042 18.8946 4.29289 18.7071C4.10535 18.5196 3.99999 18.2652 3.99999 18C3.99999 17.7348 4.10535 17.4804 4.29289 17.2929C4.48042 17.1054 4.73478 17 4.99999 17H14C15.3261 17 16.5978 16.4732 17.5355 15.5355C18.4732 14.5979 19 13.3261 19 12C19 10.6739 18.4732 9.40215 17.5355 8.46447C16.5978 7.52678 15.3261 7 14 7H6.41399L8.20699 8.793C8.38915 8.9816 8.48995 9.2342 8.48767 9.4964C8.48539 9.7586 8.38022 10.0094 8.19481 10.1948C8.0094 10.3802 7.75859 10.4854 7.4964 10.4877C7.2342 10.49 6.9816 10.3892 6.79299 10.207L3.29299 6.707C3.15306 6.56716 3.05775 6.38895 3.01913 6.19492C2.9805 6.0009 3.00029 5.79977 3.07599 5.617Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_4_66">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 50 50"
            fill="none"
          >
            <circle cx="25" cy="25" r="25" fill="url(#paint0_linear_4_62)" />
            <defs>
              <linearGradient
                id="paint0_linear_4_62"
                x1="-14.5"
                y1="-25"
                x2="70.5"
                y2="75.5"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#27481C" />
                <stop offset="1" stop-color="#ABE796" />
              </linearGradient>
            </defs>
          </svg> */}
      </div>
      <div
        className={
          video
            ? "main__div__filled"
            : videoError
            ? "main__div__error"
            : "main__div"
        }
        {...getRootProps()}
      >
        {video ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="114"
            height="114"
            viewBox="0 0 114 114"
            fill="none"
          >
            <path
              d="M49.1625 80.75L76 53.9125L69.1125 47.025L49.0675 67.1175L39.0925 57.1425L32.3 63.8875M30.875 95C23.655 95 17.4958 92.5142 12.3975 87.5425C7.29916 82.5392 4.75 76.4433 4.75 69.255C4.75 63.08 6.6025 57.57 10.3075 52.725C14.0442 47.88 18.9208 44.7925 24.9375 43.4625C26.9325 36.1792 30.8908 30.2892 36.8125 25.7925C42.7658 21.2642 49.495 19 57 19C66.2783 19 74.1316 22.23 80.56 28.69C87.02 35.1183 90.25 42.9717 90.25 52.25C95.7283 52.8833 100.257 55.2583 103.835 59.375C107.445 63.4283 109.25 68.1783 109.25 73.625C109.25 79.5783 107.176 84.6292 103.027 88.7775C98.8791 92.9259 93.8283 95 87.875 95H30.875Z"
              fill="#8DFF9C"
            />
          </svg>
        ) : (
          <>
            <svg
              style={{
                marginBottom: "14px",
              }}
              xmlns="http://www.w3.org/2000/svg"
              width="152"
              height="147"
              viewBox="0 0 152 147"
              fill="none"
            >
              <path
                d="M137.75 119.438C137.75 120.656 137.25 121.824 136.359 122.686C135.468 123.547 134.26 124.031 133 124.031H19C17.7402 124.031 16.532 123.547 15.6412 122.686C14.7504 121.824 14.25 120.656 14.25 119.438C14.25 118.219 14.7504 117.051 15.6412 116.189C16.532 115.328 17.7402 114.844 19 114.844H133C134.26 114.844 135.468 115.328 136.359 116.189C137.25 117.051 137.75 118.219 137.75 119.438ZM137.75 32.1562V96.4688C137.75 98.9054 136.749 101.242 134.968 102.965C133.186 104.688 130.77 105.656 128.25 105.656H23.75C21.2304 105.656 18.8141 104.688 17.0325 102.965C15.2509 101.242 14.25 98.9054 14.25 96.4688V32.1562C14.25 29.7196 15.2509 27.3827 17.0325 25.6597C18.8141 23.9367 21.2304 22.9688 23.75 22.9688H128.25C130.77 22.9688 133.186 23.9367 134.968 25.6597C136.749 27.3827 137.75 29.7196 137.75 32.1562ZM97.375 64.3125C97.3748 63.5394 97.1727 62.7788 96.7877 62.1012C96.4026 61.4237 95.847 60.8511 95.1722 60.4365L69.0472 44.3584C68.3291 43.9172 67.5017 43.6706 66.6514 43.6444C65.801 43.6182 64.959 43.8133 64.2134 44.2094C63.4677 44.6054 62.8457 45.1879 62.4123 45.896C61.979 46.604 61.7503 47.4116 61.75 48.2344V80.3906C61.7503 81.2134 61.979 82.021 62.4123 82.729C62.8457 83.4371 63.4677 84.0196 64.2134 84.4156C64.959 84.8117 65.801 85.0068 66.6514 84.9806C67.5017 84.9544 68.3291 84.7078 69.0472 84.2666L95.1722 68.1885C95.847 67.7739 96.4026 67.2013 96.7877 66.5238C97.1727 65.8462 97.3748 65.0856 97.375 64.3125Z"
                fill="white"
                fill-opacity="0.95"
              />
            </svg>
            <span className={`drop__media__span ${poppins.className}`}>
              Drop the{" "}
              <span
                style={{
                  textDecoration: "underline",
                }}
              >
                video
              </span>{" "}
              here
            </span>
            <span className={`drop__media__span__or ${poppins.className}`}>
              or
            </span>
            <div className="flex row gap-4 justify-center items-center">
              <span className={`select__media__span ${poppins.className}`}>
                select it
              </span>
              <button
                className="folder__button relative"
                onClick={handleFolder}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  className="m-auto"
                >
                  <path
                    d="M5 25C4.3125 25 3.72375 24.755 3.23375 24.265C2.74375 23.775 2.49916 23.1867 2.5 22.5V7.5C2.5 6.8125 2.745 6.22375 3.235 5.73375C3.725 5.24375 4.31333 4.99917 5 5H12.5L15 7.5H25C25.6875 7.5 26.2762 7.745 26.7662 8.235C27.2562 8.725 27.5008 9.31333 27.5 10V22.5C27.5 23.1875 27.255 23.7762 26.765 24.2662C26.275 24.7562 25.6867 25.0008 25 25H5Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
            <span
              style={{
                color: `${videoError ? "#ff0000" : "#F0F0F0"}`,
                opacity: "0.60",
                scale: `${videoError ? "0.9" : "0.7"}`,
                position: "absolute",
                bottom: "15px",
                fontWeight: `${videoError ? "bold" : "semi-bold"}`,
              }}
            >
              (Allowed formats: mp4, avi, mkv, mov, wmv)
            </span>
          </>
        )}
      </div>
      <div
        className={
          audio
            ? "main__div__filled"
            : audioError
            ? "main__div__error"
            : "main__div"
        }
        {...audioRootProps()}
      >
        {audio ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="114"
            height="114"
            viewBox="0 0 114 114"
            fill="none"
          >
            <path
              d="M49.1625 80.75L76 53.9125L69.1125 47.025L49.0675 67.1175L39.0925 57.1425L32.3 63.8875M30.875 95C23.655 95 17.4958 92.5142 12.3975 87.5425C7.29916 82.5392 4.75 76.4433 4.75 69.255C4.75 63.08 6.6025 57.57 10.3075 52.725C14.0442 47.88 18.9208 44.7925 24.9375 43.4625C26.9325 36.1792 30.8908 30.2892 36.8125 25.7925C42.7658 21.2642 49.495 19 57 19C66.2783 19 74.1316 22.23 80.56 28.69C87.02 35.1183 90.25 42.9717 90.25 52.25C95.7283 52.8833 100.257 55.2583 103.835 59.375C107.445 63.4283 109.25 68.1783 109.25 73.625C109.25 79.5783 107.176 84.6292 103.027 88.7775C98.8791 92.9259 93.8283 95 87.875 95H30.875Z"
              fill="#8DFF9C"
            />
          </svg>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="120"
              height="120"
              viewBox="0 0 120 120"
              fill="none"
              style={{
                marginBottom: "20px",
              }}
            >
              <path
                d="M60 73.125C71.0039 73.125 79.9219 64.3125 79.9219 53.4375V27.1875C79.9219 16.3125 71.0039 7.5 60 7.5C48.9961 7.5 40.0781 16.3125 40.0781 27.1875V53.4375C40.0781 64.3125 48.9961 73.125 60 73.125ZM98.6719 53.2031C98.6719 52.6875 98.25 52.2656 97.7344 52.2656H90.7031C90.1875 52.2656 89.7656 52.6875 89.7656 53.2031C89.7656 69.6445 76.4414 82.9688 60 82.9688C43.5586 82.9688 30.2344 69.6445 30.2344 53.2031C30.2344 52.6875 29.8125 52.2656 29.2969 52.2656H22.2656C21.75 52.2656 21.3281 52.6875 21.3281 53.2031C21.3281 72.9727 36.1641 89.2852 55.3125 91.5937V103.594H38.2852C36.6797 103.594 35.3906 105.27 35.3906 107.344V111.562C35.3906 112.078 35.7188 112.5 36.1172 112.5H83.8828C84.2812 112.5 84.6094 112.078 84.6094 111.562V107.344C84.6094 105.27 83.3203 103.594 81.7148 103.594H64.2188V91.6523C83.5898 89.543 98.6719 73.1367 98.6719 53.2031Z"
                fill="white"
              />
            </svg>
            <span className={`drop__media__span ${poppins.className}`}>
              Drop the{" "}
              <span
                style={{
                  textDecoration: "underline",
                }}
              >
                audio
              </span>{" "}
              here
            </span>
            <span className={`drop__media__span__or ${poppins.className}`}>
              or
            </span>
            <div className="flex row gap-4 justify-center items-center">
              <span className={`select__media__span ${poppins.className}`}>
                select it
              </span>
              <button
                className="folder__button relative"
                onClick={handleFolder}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  className="m-auto"
                >
                  <path
                    d="M5 25C4.3125 25 3.72375 24.755 3.23375 24.265C2.74375 23.775 2.49916 23.1867 2.5 22.5V7.5C2.5 6.8125 2.745 6.22375 3.235 5.73375C3.725 5.24375 4.31333 4.99917 5 5H12.5L15 7.5H25C25.6875 7.5 26.2762 7.745 26.7662 8.235C27.2562 8.725 27.5008 9.31333 27.5 10V22.5C27.5 23.1875 27.255 23.7762 26.765 24.2662C26.275 24.7562 25.6867 25.0008 25 25H5Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
            <span
              style={{
                color: `${audioError ? "#ff0000" : "#F0F0F0"}`,
                opacity: "0.60",
                scale: `${audioError ? "0.9" : "0.7"}`,
                position: "absolute",
                bottom: "15px",
                fontWeight: `${audioError ? "bold" : "semi-bold"}`,
              }}
            >
              (Allowed formats: mp3, mpeg, wav)
            </span>
          </>
        )}
      </div>
    </main>
  );
}

export default page;
