"use client";
import { useEffect, useRef } from "react";
import LoginForm from "../components/LoginForm";
import "./login.css";
import { RemoveAll } from "../api/handlers";

function page() {
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
      <LoginForm />
    </main>
  );
}

export default page;
