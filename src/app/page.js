"use client";
import Image from "next/image";
import NOMI from "../../assets/NOMI.png";
import shape from "../../assets/shape.png";
import hand from "../../assets/hand.png";
import "./home.css";
import { poppins } from "./layout";
import { RemoveAll } from "./api/handlers";
import { useEffect, useRef } from "react";

export default function Home() {
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
  return (
    <main className="main relative h-[100vh] w-[100vw] bg-[#141A1E] flex row items-center justify-between overflow-hidden">
      <div className="left__menu">
        <Image src={NOMI} className="NOMI__logo" />
        <div className="new__tele__div">
          <button
            className="plus__div"
            onClick={() => (window.location.href = "/editor")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
            >
              <path
                d="M27.5 32.5H12.5V27.5H27.5V12.5H32.5V27.5H47.5V32.5H32.5V47.5H27.5V32.5Z"
                fill="white"
              />
            </svg>
          </button>
          <button
            onClick={() => (window.location.href = "/editor")}
            className={`new__span ${poppins.className}`}
          >
            Teleprompt a <br />
            new video
          </button>
        </div>
        <div className="flex flex-col justify-center items-center gap-4 m-[260px]">
          <button
            className="sing__up__div"
            onClick={() => (window.location.href = "/signup")}
          >
            Sign up
          </button>
          <button
            className="login__div"
            onClick={() => (window.location.href = "/login")}
          >
            Login
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center main__div mt-36 gap-16">
        <h1 className="main__h1">
          <span className="main__div__free">Free</span>{" "}
          <span className="main__div__video">video</span>{" "}
          <span className="main__div__tele">teleprompter</span> creator,
          <br /> powered by <span className="main__div__IA">IA</span>
        </h1>
        <div className="flex flex-row justify-center items-center gap-44 mr-12">
          <button
            className={`set__up__button ${poppins.className} flex gap-2 justify-center items-center`}
            onClick={() => (window.location.href = "/signup")}
          >
            Sign up
            <svg
              width="32"
              height="24"
              viewBox="0 0 32 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.3636 14.5455C16.48 14.5455 8.72727 16.48 8.72727 20.3636V23.2727H32V20.3636C32 16.48 24.2473 14.5455 20.3636 14.5455ZM7.27273 8.72727V4.36364H4.36364V8.72727H0V11.6364H4.36364V16H7.27273V11.6364H11.6364V8.72727M20.3636 11.6364C21.9067 11.6364 23.3866 11.0234 24.4777 9.93226C25.5688 8.84113 26.1818 7.36126 26.1818 5.81818C26.1818 4.2751 25.5688 2.79523 24.4777 1.70411C23.3866 0.612985 21.9067 0 20.3636 0C18.8206 0 17.3407 0.612985 16.2496 1.70411C15.1584 2.79523 14.5455 4.2751 14.5455 5.81818C14.5455 7.36126 15.1584 8.84113 16.2496 9.93226C17.3407 11.0234 18.8206 11.6364 20.3636 11.6364Z"
                fill="#282424"
                fill-opacity="0.85"
              />
            </svg>
          </button>
          <button
            onClick={() => (window.location.href = "/editor")}
            className="plus__div"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
            >
              <path
                d="M27.5 32.5H12.5V27.5H27.5V12.5H32.5V27.5H47.5V32.5H32.5V47.5H27.5V32.5Z"
                fill="white"
              />
            </svg>
          </button>
          <button
            className={`login__button ${poppins.className}`}
            onClick={() => (window.location.href = "/login")}
          >
            Login
            <svg
              className="opacity-80 "
              width="32"
              height="33"
              viewBox="0 0 32 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_29_2)" filter="url(#filter0_d_29_2)">
                <path
                  d="M16.3334 28V25.6667H24.5V9.33333H16.3334V7H24.5C25.1417 7 25.6912 7.22867 26.1485 7.686C26.6059 8.14333 26.8342 8.69244 26.8334 9.33333V25.6667C26.8334 26.3083 26.6047 26.8578 26.1474 27.3152C25.69 27.7725 25.1409 28.0008 24.5 28H16.3334ZM14 23.3333L12.3959 21.6417L15.3709 18.6667H5.83337V16.3333H15.3709L12.3959 13.3583L14 11.6667L19.8334 17.5L14 23.3333Z"
                  fill="#090909"
                  fill-opacity="0.85"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_29_2"
                  x="-5"
                  y="-5"
                  width="38"
                  height="38"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset />
                  <feGaussianBlur stdDeviation="2.5" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.205556 0 0 0 0 0.185857 0 0 0 0 0.185857 0 0 0 1 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_29_2"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_29_2"
                    result="shape"
                  />
                </filter>
                <clipPath id="clip0_29_2">
                  <rect width="28" height="28" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      </div>
      <Image src={shape} className="shape" />
      <Image src={hand} className="hand" />
      <div className="orange__ball" />
      <div className="blue__ball" />
    </main>
  );
}
