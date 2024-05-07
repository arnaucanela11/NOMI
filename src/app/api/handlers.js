import axios from "axios";
import { string } from "yup";

export const SignupPost = async (values) => {
  try {
    const res = await axios.post("http://127.0.0.1:8000/users/signup", values, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Recommendation: handle errors
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const LoginPost = async (values) => {
  try {
    const res = await axios.post("http://127.0.0.1:8000/users/login", values, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Recommendation: handle errors
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const checkVideo = async (file) => {
  try {
    const formData = new FormData();
    formData.append("video", file);
    // formData.append('audio', audio_path)
    const res = await axios.post(
      "http://127.0.0.1:8000/projects/checkVideo",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Recommendation: handle errors
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const checkAudio = async (file) => {
  try {
    const formData = new FormData();
    formData.append("audio", file);
    // formData.append('audio', audio_path)
    const res = await axios.post(
      "http://127.0.0.1:8000/projects/checkAudio",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Recommendation: handle errors
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const createProject = async (file, audio) => {
  try {
    const formData = new FormData();
    formData.append("video", file);
    formData.append("audio", audio)
    // formData.append('audio', audio_path)
    const res = await axios.post(
      "http://127.0.0.1:8000/projects/create",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Recommendation: handle errors
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const convertToMP3 = async (file) => {
  try {
    const formData = new FormData();
    formData.append("video", file);
    const res = await axios.post(
      "http://127.0.0.1:8000/projects/convertToMP3",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Recommendation: handle errors
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};


export const getVideo = async (project_name) => {
  try {
    const res = await axios.get("http://127.0.0.1:8000/projects/get", {
      headers: {
        token: localStorage.getItem("token"),
        pname: project_name,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};


export const createTele = async (project_name, video_url, audio_url ,file) => {
  try {
    // const formData = new FormData();
    // formData.append("video", file);
    // console.log('test', file, formData)
    // console.log(formData.get("video"));

    const res = await axios.post(
      "http://127.0.0.1:8000/projects/tele",
      { video_url: video_url, audio_url: audio_url},
      {
        headers: {
          "Content-Type": "application/json",
          "Pname": project_name
        },
      }
    );

    // Recommendation: handle errors
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const EditSubtitlesText = async (subtitles, text_style, video_url, audio_url, project_name, oldMax, word_subtitles) => {
  console.log(video_url, audio_url)
  try {
    // const formData = new FormData();
    // formData.append("video", file);
    // console.log('test', file, formData)
    // console.log(formData.get("video"));

    const res = await axios.post(
      "http://127.0.0.1:8000/projects/editText",
      { subtitles: subtitles, text_style: text_style, video_url: video_url, audio_url: audio_url, old_max: oldMax, word_subtitles: word_subtitles},
      {
        headers: {
          "Content-Type": "application/json",
          "Pname": project_name
        },
      }
    );

    // Recommendation: handle errors
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const RemoveAll = async (project_name, main_url_v) => {
  try {
    // const formData = new FormData();
    // formData.append("video", file);
    // console.log('test', file, formData)
    // console.log(formData.get("video"));
    console.log('HELLO')
    const res = await axios.get(
      "http://127.0.0.1:8000/projects/removeAll",
      {
        headers: {
          "Content-Type": "application/json",
          "Pname": project_name,
          "MainUrlV": main_url_v,
        },
      }
    );

    // Recommendation: handle errors
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
