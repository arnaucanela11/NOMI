'use client'
import { useEffect, useRef } from "react";
import { RemoveAll } from "../api/handlers";
import SignupForm from "../components/SignupForm";
import { poppins } from "../layout";
import "./signup.css";

function signup() {
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
    <main className="main h-[100vh] w-[100vw] bg-[#141A1E] overflow-hidden">
      <div className="absolute right-20 flex row justify-center items-center gap-4 top-8">
        <button
          className="back__div flex row gap-2 justify-center items-center px-3 py-1"
          onClick={() => (window.history.back())}
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
        {localStorage.getItem("token") ? (
          <svg
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
          </svg>
        ) : (
          ""
        )}
      </div>
      <SignupForm />
    </main>
  );
}

export default signup;
