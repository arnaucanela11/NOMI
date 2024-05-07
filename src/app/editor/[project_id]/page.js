"use client";
import Image from "next/image";
import NOMI from "../../../../assets/nomi.png";
import FadeIn from "../../../../assets/fadein.gif";
import { inter, poppins, source_code_pro } from "../../layout";
import "./project.css";
import VideoPreview from "@/app/components/VideoPreview";
import { useEffect, useRef, useState } from "react";
import {
  EditSubtitlesText,
  RemoveAll,
  createTele,
  getVideo,
} from "../../api/handlers";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Timeline from "@/app/components/TimeLine";
import { useSelector, useDispatch } from "react-redux";
import { VideoUseSelector } from "@/app/context/Store";
import {
  CircularProgress,
  Box,
  Typography,
  Dialog,
  DialogContent,
  Slider,
  TextField,
  InputAdornment,
  OutlinedInput,
  LinearProgress,
  Checkbox,
} from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ChromeExample from "@/app/class/ChromeExample";

const n_of_tele = 2;
const n_of_tele_arr = new Array(n_of_tele).fill(null);

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
    fontWeight: "semi-bold",
  },
}));

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
    backgroundColor: "#fff",
  },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    minWidth: 0,
    [theme.breakpoints.up("sm")]: {
      minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    color: "#fff",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Poppins",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      color: "rgba(141, 255, 255, 0.72)",
      opacity: 1,
    },
    "&.Mui-selected": {
      color: "rgba(141, 255, 255, 0.72)",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#d1eaff",
    },
  })
);

const menuProps = {
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "center",
  },
  getContentAnchorEl: null,
};

const strokeSizeMarks = [
  {
    value: 0,
  },
  {
    value: 2,
  },
  {
    value: 4,
  },
  {
    value: 6,
  },
  {
    value: 8,
  },
  {
    value: 10,
  },
];

const shadowBlurMarks = [
  {
    value: 0,
  },
  {
    value: 2,
  },
  {
    value: 4,
  },
  {
    value: 6,
  },
  {
    value: 8,
  },
  {
    value: 10,
  },
  {
    value: 12,
  },
  {
    value: 14,
  },
  {
    value: 16,
  },
  {
    value: 18,
  },
  {
    value: 20,
  },
];

const letterSpacingMarks = [
  {
    value: 0,
  },
  {
    value: 1,
  },
  {
    value: 2,
  },
  {
    value: 3,
  },
  {
    value: 4,
  },
  {
    value: 5,
  },
  {
    value: 6,
  },
  {
    value: 7,
  },
  {
    value: 8,
  },
  {
    value: 9,
  },
  {
    value: 10,
  },
  {
    value: 11,
  },
  {
    value: 12,
  },
  {
    value: 13,
  },
  {
    value: 14,
  },
  {
    value: 15,
  },
  {
    value: 16,
  },
  {
    value: 17,
  },
  {
    value: 18,
  },
  {
    value: 19,
  },
  {
    value: 20,
  },
];

function LinearProgressWithLabel(props) {
  return (
    <div className="flex flex-row gap-2 justify-center mb-5 items-center">
      <LinearProgress
        variant="determinate"
        value={Math.round(props.value)}
        className="w-[200px] h-[10px]"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.30)",
          "& .MuiLinearProgress-bar": {
            backgroundColor: "#D77AE6",
          },
        }}
      />
      <span className="text-white text-xs">{`${Math.round(
        props.value
      )}%`}</span>
    </div>
  );
}

function LinearProgressWithLabel1(props) {
  return (
    <div className="flex flex-row gap-2 justify-center items-center">
      <LinearProgress
        variant="determinate"
        value={Math.round(props.value)}
        className="w-[180px] h-[10px]"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.30)",
          "& .MuiLinearProgress-bar": {
            backgroundColor: "#ABE796",
          },
        }}
      />
      <span className="text-white text-xs">{`${Math.round(
        props.value
      )}%`}</span>
    </div>
  );
}

function page({ params }) {
  const videoRef = useRef(null);
  const [Video, setVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [zoomCount, setZoomCount] = useState(0);
  const [VideoUrl, setVideoUrl] = useState(null);
  const [AudioUrl, setAudioUrl] = useState(null);
  const [thumbnails, setThumbnails] = useState([]);
  const canvasRef1 = useRef(null);
  const canvasRef2 = useRef(null);
  const zoomSlider = useRef(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(null);
  const [thereIsTeleprompt, setThereIsTeleprompt] = useState(false);
  const [creatingTele, setCreatingTele] = useState(false);
  const [popper, setPopper] = useState(null);
  const [value, setValue] = useState(0);
  const [fontType, setFontType] = useState("NunitoSans");
  const [fontSize, setFontSize] = useState(14);
  const [fontBold, setFontBold] = useState(false);
  const [fontItalics, setFontItalics] = useState(false);
  const [wrap, setWrap] = useState(false);
  const [fontCase, setFontCase] = useState("Lower case");
  const [openCase, setOpenCase] = useState(false);
  const [alignText, setAlignText] = useState("center");
  const [openAlignText, setOpenAlignText] = useState(false);
  const [openSpace, setOpenSpace] = useState(false);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [lineHeight, setLineHeight] = useState(5);
  const [textColor, setTextColor] = useState({
    r: 0,
    g: 0,
    b: 0,
    a: 1,
  });
  const [bgColor, setBgColor] = useState({
    r: 0,
    g: 0,
    b: 0,
    a: 0,
  });
  const [strokeColor, setStrokeColor] = useState({
    r: 0,
    g: 0,
    b: 0,
    a: 0,
  });
  const [strokeSizePopper, setStrokeSizePopper] = useState(false);
  const [shadowColor, setShadowColor] = useState({
    r: 0,
    g: 0,
    b: 0,
    a: 0,
  });
  const [shadowOptionsPopper, setShadowOptionsPopper] = useState(false);
  const [shadowBlur, setShadowBlur] = useState(20); // MEANS 4px
  const [strokeSize, setStrokeSize] = useState(20); // MEANS 2px
  const [opacity, setOpacity] = useState(100); // MEANS 1
  const [xPosition, setXPosition] = useState("center");
  const [yPosition, setYPosition] = useState("center");
  const [progress, setProgress] = useState(0);
  const [stylesConfirm, setStylesConfirm] = useState(false);
  const [mainTeleProgress, setMainTeleProgress] = useState(false);
  const [Socket, setSocket] = useState(null);
  const [maxCharacters, setMaxCharacters] = useState(20);
  const [wordByWord, setWordByWord] = useState(false);
  const [oldMaxCharacters, setOldMaxCharacters] = useState(20);
  const [wordByWordSubtitles, setWordByWordSubtitles] = useState(null);
  const [animationEntry, setAnimationEntry] = useState(null);
  const [animationExit, setAnimationExit] = useState(null);
  const [animationDurationEntry, setAnimationDurationEntry] = useState(25);
  const [animationDurationExit, setAnimationDurationExit] = useState(25);
  // const videoFile = VideoUseSelector((state) => {
  //   console.log(state);
  //   return state.videoFile;
  // });

  // const handleAspectRatioChange = (event) => {
  //   const selectedAspectRatio = event.target.value;
  //   console.log(selectedAspectRatio)
  //   applyAspectRatio(selectedAspectRatio);
  //   toggleAspectRatioMenu();
  // };

  useEffect(() => {
    console.log(wordByWord);
    async function getFunction() {
      if (!sessionStorage.getItem("url_v")) {
        const { video, signed_url, audio_url } = await getVideo(
          params.project_id
        );
        setVideo(video);
        setVideoUrl(signed_url);
        setAudioUrl(audio_url);
        sessionStorage.setItem("url_v", signed_url);
        sessionStorage.setItem("url_a", audio_url);
      } else {
        setVideoUrl(sessionStorage.getItem("url_v"));
        setAudioUrl(sessionStorage.getItem("url_a"));
      }
      //GET THUMBNAILS:
    }
    getFunction();
    const aspect_ratio = localStorage.getItem("aspect_ratio");
    setAspectRatio(aspect_ratio);
  }, [wordByWord]);

  useEffect(() => {
    const handleBeforeUnload = async (event) => {
      if (Socket) {
        Socket.close();
      }
      const confirmationMessage =
        "¿Seguro que quieres recargar la página? Ten en cuenta que tus estilos no se guardaran.";
      (event || window.event).returnValue = confirmationMessage; // Para algunos navegadores antiguos
      return confirmationMessage; // Para navegadores modernos
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      // Limpia el evento cuando el componente se desmonta para evitar fugas de memoria
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/ws/progress/");
    setSocket(socket);
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setProgress(data.progress);
      if (data.progress == 1) {
        setMainTeleProgress(true);
      }
      if (progress == 98) {
        setProgress(0);
      }
      // Aquí puedes actualizar tu interfaz de usuario con el progreso recibido
    };

    return () => {
      socket.close();
    };
  }, []);

  // const pathname = window.location.pathname;

  // useEffect(() => {
  //         // Elimina la información del sessionStorage, AWS i DB:
  //         async function deleteAll () {
  //           if (pathname == `/editor/${params.project_id}`) {
  //             return
  //           }
  //           sessionStorage.removeItem("url_v");
  //           sessionStorage.removeItem("url_a");
  //           sessionStorage.removeItem("subtitles");
  //           sessionStorage.removeItem("teleSet");
  //           await RemoveAll(params.project_id, sessionStorage.getItem("main_url_v"));
  //           sessionStorage.removeItem("main_url_v");
  //         }
  //         console.log(pathname)
  //         deleteAll()
  //         console.log(pathname)
  // }, [pathname, params.project_id]);

  useEffect(() => {
    if (VideoUrl) {
      const video = videoRef.current;
      const canvas1 = canvasRef1.current;
      const canvas2 = canvasRef2.current;
      const ctx = canvas1.getContext("2d");
      const ctx2 = canvas2.getContext("2d");

      // ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
      // ctx2.fillStyle = "#3849E0"; // Azul marino
      // ctx2.fillRect(0, 0, canvas2.width, canvas2.height);

      let isDragging = false;
      ctx.strokeStyle = "white";
      video.addEventListener("play", () => {
        // Actualiza la línea de tiempo mientras el video se reproduce
        const updateTimeline = () => {
          const currentTime = video.currentTime;
          const duration = video.duration;
          const timelineWidth = canvas2.width;
          const timelineHeight = canvas2.height;
          const timelineWidth1 = canvas1.width;
          const timelineHeight1 = canvas1.height;

          ctx.clearRect(0, 0, canvas1.width, canvas1.height);

          //SECOND CANVAS

          // Calcula la posición X de la línea vertical
          const xPos = (currentTime / duration) * timelineWidth;

          // Dibuja la línea vertical en la posición X
          // Altura adicional de la línea fuera del canvas

          //SECOND CANVAS

          // Calcula la posición X de la línea vertical

          // Dibuja la línea vertical en la posición X
          const lineHeight = 120; // Altura adicional de la línea fuera del canvas
          ctx.beginPath();
          ctx.moveTo(xPos, -lineHeight);
          ctx.lineTo(xPos, timelineHeight + lineHeight);
          ctx.stroke();

          requestAnimationFrame(updateTimeline);
        };
        requestAnimationFrame(updateTimeline);
      });

      canvas1.addEventListener("mousedown", (e) => {
        isDragging = true;
      });

      canvas1.addEventListener("mouseup", () => {
        setIsMouseDown(false);
      });

      canvas1.addEventListener("mousemove", (e) => {
        if (isDragging) {
          const rect = canvas1.getBoundingClientRect();
          const xPos = e.clientX - rect.left;

          const timelineWidth = canvas2.width;
          const duration = video.duration;
          const timelineHeight = canvas2.height;
          const currentTime = (xPos / timelineWidth) * duration;

          video.currentTime = currentTime;
          // Limpia el canvas antes de dibujar la nueva línea
          ctx.clearRect(0, 0, canvas1.width, canvas1.height);

          // Calcula la nueva posición de la línea
          const lineHeight = 120;
          const newPos = (video.currentTime / duration) * timelineWidth;
          ctx.beginPath();
          ctx.moveTo(newPos, -lineHeight);
          ctx.lineTo(newPos, timelineHeight + lineHeight);
          ctx.stroke();

          //VIDEO CANVAS
          // ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
          // ctx2.fillStyle = "#3849E0"; // Azul marino
          // ctx2.fillRect(0, 0, canvas2.width, canvas2.height);
        }
      });

      document.addEventListener("mouseup", () => {
        isDragging = false;
      });
    }
  }, [VideoUrl, isMouseDown]);
  // const applyAspectRatio = (aspectRatio) => {
  //   const aspect_ratio = aspectRatio.replace(/:/g, '/');
  //   const video = videoRef.current;
  //   if (video) {
  //     video.style.aspectRatio = aspect_ratio;
  //   }
  // };

  useEffect(() => {
    const handleSpaceKey = (event) => {
      if (event.key === " ") {
        event.preventDefault(); // Evita que la página se desplace hacia abajo
        togglePlayPause(); // Llama a la función para pausar/reproducir el video
      }
    };

    document.addEventListener("keydown", handleSpaceKey);

    // Limpia el event listener cuando el componente se desmonta
    return () => {
      document.removeEventListener("keydown", handleSpaceKey);
    };
  }, []);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleZoomIn = () => {
    if (zoomCount <= 8) {
      const newWidth = canvasRef2.current.width * 1.4; // Aumenta el ancho en un 20%
      canvasRef2.current.width = newWidth;
      let prevZoom;
      setZoomCount((prev) => {
        prevZoom = prev + 1;
        return prev + 1;
      });
      if (prevZoom == 0) {
        zoomSlider.current.style.width = "12px";
      }

      if (prevZoom == 1) {
        zoomSlider.current.style.width = "16px";
      }

      if (prevZoom == 2) {
        zoomSlider.current.style.width = "20px";
      }

      if (prevZoom == 3) {
        zoomSlider.current.style.width = "24px";
      }

      if (prevZoom == 4) {
        zoomSlider.current.style.width = "28px";
      }

      if (prevZoom == 5) {
        zoomSlider.current.style.width = "33px";
      }

      if (prevZoom == 6) {
        zoomSlider.current.style.width = "38px";
      }

      if (prevZoom == 7) {
        zoomSlider.current.style.width = "42px";
      }

      if (prevZoom == 8) {
        zoomSlider.current.style.width = "48px";
      }
    }
  };

  const handleZoomOut = () => {
    if (zoomCount > 0) {
      const newWidth = canvasRef2.current.width / 1.4; // Reduce el ancho en un 20%
      canvasRef2.current.width = newWidth;
      let prevZoom;
      setZoomCount((prev) => {
        prevZoom = prev - 1;
        return prev - 1;
      });
      if (prevZoom == 0) {
        zoomSlider.current.style.width = "12px";
      }

      if (prevZoom == 1) {
        zoomSlider.current.style.width = "16px";
      }

      if (prevZoom == 2) {
        zoomSlider.current.style.width = "20px";
      }

      if (prevZoom == 3) {
        zoomSlider.current.style.width = "24px";
      }

      if (prevZoom == 4) {
        zoomSlider.current.style.width = "28px";
      }

      if (prevZoom == 5) {
        zoomSlider.current.style.width = "33px";
      }

      if (prevZoom == 6) {
        zoomSlider.current.style.width = "38px";
      }

      if (prevZoom == 7) {
        zoomSlider.current.style.width = "42px";
      }

      if (prevZoom == 8) {
        zoomSlider.current.style.width = "48px";
      }
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

  const handleTimelineClick = (event) => {
    if (VideoUrl) {
      const video = videoRef.current;
      const canvas = canvasRef2.current;
      const timelineWidth = canvas.width;
      const clickX = event.nativeEvent.offsetX;
      const duration = video.duration;
      video.currentTime = (clickX / timelineWidth) * duration;
    }
  };

  const handleTelePrompt = async () => {
    if (AudioUrl && VideoUrl) {
      setCreatingTele(true);
      setThereIsTeleprompt(true);
      const { ok, signed_url, subtitles_data, main_video_url } =
        await createTele(params.project_id, VideoUrl, AudioUrl, Video);
      if (ok) {
        setVideoUrl(signed_url);
        sessionStorage.setItem("url_v", signed_url);
        sessionStorage.setItem("subtitles", JSON.stringify(subtitles_data));
        sessionStorage.setItem("main_url_v", main_video_url);
        sessionStorage.setItem("teleSet", true);
        setThereIsTeleprompt(true);
      } else {
        setCreatingTele(false);
        return;
      }
    } else {
      alert("Video or audio not ready.");
    }
  };

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const confirmBasicText = async (e) => {
    setProgress(0);
    const subtitles = sessionStorage.getItem("subtitles");
    const subtitlesData = JSON.parse(subtitles);

    let textColorString = `rgba(${textColor.r}, ${textColor.g}, ${textColor.b}, ${textColor.a})`;
    let bgColorString = `rgba(${bgColor.r}, ${bgColor.g}, ${bgColor.b}, ${bgColor.a})`;
    let strokeColorString = `rgba(${strokeColor.r}, ${strokeColor.g}, ${strokeColor.b}, ${strokeColor.a})`;

    let letterSpacing_ = letterSpacing == 0 ? -1 : letterSpacing / 5;
    let lineHeight_ = lineHeight == 0 ? -1 : lineHeight / 5;

    let text_style = {
      color: textColorString,
      fontsize: fontSize,
      bg_color: bgColorString,
      stroke_color: strokeColorString,
      stroke_width: strokeSize / 10,
      fontType: fontType,
      bold: fontBold,
      italics: fontItalics,
      opacity: opacity,
      align: alignText,
      wrap: wrap,
      letter_spacing: letterSpacing_,
      interline: lineHeight_,
      font_case: fontCase,
      x: xPosition,
      y: yPosition,
      max: maxCharacters,
      word_by_word: wordByWord,
      animation_entry: animationEntry,
      animation_entry_duration: animationDurationEntry,
      animation_exit: animationExit,
      animation_exit_duration: animationDurationExit,
    };
    console.log(text_style);
    if (subtitlesData) {
      if (VideoUrl && AudioUrl) {
        setStylesConfirm(true);
        let word_subtitles_ = null;
        if (wordByWordSubtitles) {
          word_subtitles_ = wordByWordSubtitles;
        } else if (sessionStorage.getItem("word_subtitles")) {
          word_subtitles_ = JSON.parse(
            sessionStorage.getItem("word_subtitles")
          );
        }
        const { ok, signed_url, subtitles_data, new_max, word_subtitles } =
          await EditSubtitlesText(
            subtitlesData,
            text_style,
            sessionStorage.getItem("main_url_v"),
            AudioUrl,
            params.project_id,
            oldMaxCharacters,
            word_subtitles_
          );
        if (ok) {
          setStylesConfirm(false);
          sessionStorage.setItem("url_v", signed_url);
          setVideoUrl(signed_url);
          if (subtitles_data) {
            sessionStorage.setItem("subtitles", JSON.stringify(subtitles_data));
          }
          if (new_max) {
            setOldMaxCharacters(Number(new_max));
          }
          if (word_subtitles) {
            setWordByWordSubtitles(word_subtitles);
            sessionStorage.setItem(
              "word_subtitles",
              JSON.stringify(word_subtitles)
            );
          }
        }
      } else if (
        sessionStorage.getItem("main_url_v") &&
        sessionStorage.getItem("url_a")
      ) {
        setStylesConfirm(true);
        let word_subtitles_ = null;
        if (wordByWordSubtitles) {
          word_subtitles_ = wordByWordSubtitles;
        } else if (sessionStorage.getItem("word_subtitles")) {
          word_subtitles_ = JSON.parse(
            sessionStorage.getItem("word_subtitles")
          );
        }
        const { ok, signed_url, subtitles_data, new_max, word_subtitles } =
          await EditSubtitlesText(
            subtitlesData,
            text_style,
            sessionStorage.getItem("main_url_v"),
            sessionStorage.getItme("url_a"),
            params.project_id,
            oldMaxCharacters,
            word_subtitles_
          );
        if (ok) {
          setStylesConfirm(false);
          sessionStorage.setItem("url_v", signed_url);
          setVideoUrl(signed_url);
          if (subtitles_data) {
            sessionStorage.setItem("subtitles", JSON.stringify(subtitles_data));
          }
          if (new_max) {
            setOldMaxCharacters(Number(new_max));
          }
          if (word_subtitles) {
            setWordByWordSubtitles(word_subtitles);
            sessionStorage.setItem(
              "word_subtitles",
              JSON.stringify(word_subtitles)
            );
          }
        }
      }
    } else {
      alert("There was an error in the process");
    }
  };

  return (
    <main className="relative h-[100vh] w-[100vw] bg-[#141A1E] flex flex-row items-center justify-between -z-[-1]">
      <div className="left__menu">
        <Image
          onClick={() => (window.location.href = "/")}
          src={NOMI}
          className="NOMI__logo cursor-pointer"
        />
        <div className="new__tele__div">
          {thereIsTeleprompt || sessionStorage.getItem("teleSet") ? (
            <div className="tele__alredy__set__div">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="63"
                height="63"
                viewBox="0 0 63 63"
                fill="none"
              >
                <g filter="url(#filter0_d_156_215)">
                  <path
                    d="M55.125 18.375L23.625 49.875L9.1875 35.4375L12.8888 31.7363L23.625 42.4463L51.4238 14.6738L55.125 18.375Z"
                    fill="#A7E890"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_156_215"
                    x="-6"
                    y="-6"
                    width="75"
                    height="75"
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
                    <feGaussianBlur stdDeviation="3" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_156_215"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_156_215"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
              <span className={`${poppins.className} tele__alredy__set__span`}>
                Teleprompt <br /> alredy set
              </span>
            </div>
          ) : mainTeleProgress ? (
            <div className="tele__alredy__set__div">
              <LinearProgressWithLabel1 value={progress} />
              <span
                className={`${poppins.className} tele__being__created__span`}
              >
                Wait a moment, <br /> teleprompt is <br /> being created
              </span>
            </div>
          ) : creatingTele ? (
            <div className="tele__alredy__set__div">
              <CircularProgress size={60} />
              <span
                className={`${poppins.className} tele__being__created__span`}
              >
                Wait a moment, <br /> teleprompt is <br /> being created
              </span>
            </div>
          ) : (
            <>
              <button className="plus__div" onClick={handleTelePrompt}>
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
              <button className={`new__span ${poppins.className}`}>
                Add teleprompter
              </button>
            </>
          )}
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
      <div className="main__div">
        <div className="right__div__1">
          <div className="absolute right-8 flex row justify-center items-center gap-4 top-[25%]">
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
            {/* {localStorage.getItem("token") ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 50 50"
                fill="none"
              >
                <circle
                  cx="25"
                  cy="25"
                  r="25"
                  fill="url(#paint0_linear_4_62)"
                />
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
            )} */}
          </div>
        </div>
        <div className="right__div__2">
          <div className="preview__main__div">
            <video
              ref={videoRef}
              width={
                aspectRatio == 0.5625
                  ? "240"
                  : aspectRatio == 1.3333333333333333
                  ? "600"
                  : aspectRatio == 2.0
                  ? "850"
                  : aspectRatio == 1.0
                  ? "440"
                  : aspectRatio == 0.75
                  ? "340"
                  : "700"
              }
              src={VideoUrl}
            >
              <source src="" type="video/mp4" />
              Tu navegador no soporta la reproducción de videos.
            </video>
          </div>
          {thereIsTeleprompt || sessionStorage.getItem("teleSet") ? (
            <div className="tele__editor__main__div">
              <LightTooltip title="Edit teleprompt text" placement="left">
                <button
                  className={
                    popper == "Text"
                      ? "tele__editor__sub__div__1 border-gray-400 border-[1px]"
                      : "tele__editor__sub__div__1"
                  }
                  onClick={(e) => {
                    setPopper((prev) => {
                      if (prev == "Text") {
                        return null;
                      } else {
                        return "Text";
                      }
                    });
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="19"
                    viewBox="0 0 17 16"
                    fill="none"
                  >
                    <path
                      d="M16.4844 4.18139V0.703125H0.484375V4.18139H3.26698V2.09443H7.09307V14.2683H4.65829V15.6597H12.3105V14.2683H9.87568V2.09443H13.7018V4.18139H16.4844Z"
                      fill="white"
                    />
                  </svg>
                  <span
                    className={`tele__editor__text__span ${poppins.className}`}
                  >
                    Text
                  </span>
                </button>
              </LightTooltip>
              {popper == "Text" ? (
                <div className="popper__text__main__div">
                  <div className="flex flex-col justify-center items-center">
                    <StyledTabs
                      value={value}
                      onChange={(e, newValue) => {
                        setValue(newValue);
                      }}
                      aria-label="basic tabs example"
                      textColor="primary"
                      variant="fullWidth"
                    >
                      <AntTab label="Basic" {...a11yProps(0)} />
                      <AntTab label="Position" {...a11yProps(1)} />
                      <AntTab label="Settings" {...a11yProps(2)} />
                    </StyledTabs>
                    <CustomTabPanel value={value} index={0}>
                      <div className="basic__panel__div">
                        <div className="flex flex-col gap-[8px] justify-center items-center">
                          <div className="flex flex-row gap-[34px] justify-between items-center">
                            <FormControl fullWidth size="small">
                              <InputLabel id="demo-simple-select-label"></InputLabel>
                              <Select
                                style={{
                                  background: "#26272B",
                                  color: "#fff",
                                  borderRadius: "10px",
                                  fontSize: "12px",
                                  width: "130%",
                                }}
                                className="mui__select__font__type"
                                MenuProps={menuProps}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={fontType}
                                onChange={(e) => {
                                  setFontType(e.target.value);
                                }}
                              >
                                <MenuItem value="NunitoSans">
                                  Nunito Sans
                                </MenuItem>
                                <MenuItem value="Poppins">Poppins</MenuItem>
                                <MenuItem value="Lora">Lora</MenuItem>
                                <MenuItem value="ArchivoBlack">
                                  ArchivoBlack
                                </MenuItem>
                              </Select>
                            </FormControl>
                            <FormControl fullWidth size="small">
                              <TextField
                                size="small"
                                sx={{
                                  input: { color: "white", fontSize: "13px" },
                                }}
                                style={{
                                  fontFamily: `${poppins.style}`,
                                  background: "#26272B",
                                  borderRadius: "10px",
                                  width: "80%",
                                  fontSize: "10px",
                                }}
                                id="outlined-number"
                                type="number"
                                value={fontSize}
                                onChange={(e) => {
                                  setFontSize(Number(e.target.value));
                                }}
                              />
                              {/* <Select
                                style={{
                                  background: "#26272B",
                                  color: "#fff",
                                  borderRadius: "10px",
                                  fontSize: "12px",
                                  width: "90%",
                                }}
                                className="mui__select__font__type"
                                MenuProps={menuProps}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={fontSize}
                                onChange={(e) => {
                                  setFontSize(e.target.value);
                                }}
                              >
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                                <MenuItem value={8}>8</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={12}>12</MenuItem>
                                <MenuItem value={14}>14</MenuItem>
                                <MenuItem value={16}>16</MenuItem>
                                <MenuItem value={18}>18</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                              </Select> */}
                            </FormControl>
                          </div>
                          <div className="flex flex-row justify-center items-center gap-6">
                            <div className="flex flex-row gap-1">
                              <button
                                className={
                                  fontBold
                                    ? `${poppins.className} basic__bold__button bg-[#323337]`
                                    : `${poppins.className} basic__bold__button`
                                }
                                onClick={() => {
                                  setFontBold((prev) => !prev);
                                }}
                              >
                                B
                              </button>
                              <button
                                className={
                                  fontItalics
                                    ? `${source_code_pro.className} basic__italic__button bg-[#323337] italic`
                                    : ` ${source_code_pro.className} basic__italic__button italic`
                                }
                                onClick={() => {
                                  setFontItalics((prev) => !prev);
                                }}
                              >
                                I
                              </button>
                            </div>
                            <div className="flex flex-row justify-center gap-1">
                              <button
                                className={
                                  wrap
                                    ? `basic__underlined__button bg-[#323337]`
                                    : `basic__underlined__button`
                                }
                                onClick={() => {
                                  setWrap((prev) => !prev);
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    d="M21 5H3V7H21V5ZM3 19H10V17H3V19ZM3 13H18C19 13 20 13.43 20 15C20 16.57 19 17 18 17H16V15L12 18L16 21V19H18C20.95 19 22 17.73 22 15C22 12.28 21 11 18 11H3V13Z"
                                    fill="white"
                                  />
                                </svg>
                              </button>
                              <button
                                onClick={() => {
                                  setOpenCase(true);
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="22"
                                  height="22"
                                  viewBox="0 0 15 15"
                                  fill="none"
                                >
                                  <g clip-path="url(#clip0_176_2)">
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M3.68989 2.75C3.79095 2.74989 3.88967 2.78042 3.97304 2.83754C4.0564 2.89467 4.1205 2.97571 4.15689 3.07L7.36689 11.39C7.41463 11.5137 7.41126 11.6513 7.35753 11.7726C7.3038 11.8938 7.20411 11.9888 7.08039 12.0365C6.95666 12.0842 6.81904 12.0809 6.6978 12.0271C6.57656 11.9734 6.48163 11.8737 6.43389 11.75L5.38289 9.025H2.00989L0.966886 11.75C0.943379 11.8113 0.908023 11.8674 0.862837 11.9151C0.817651 11.9628 0.763519 12.001 0.703533 12.0278C0.643546 12.0545 0.578879 12.0692 0.513225 12.071C0.44757 12.0727 0.382213 12.0615 0.320886 12.038C0.259559 12.0145 0.203462 11.9791 0.155798 11.934C0.108135 11.8888 0.0698381 11.8346 0.0430949 11.7746C0.0163516 11.7147 0.00168544 11.65 -6.62229e-05 11.5843C-0.00181789 11.5187 0.00937924 11.4533 0.0328859 11.392L3.22289 3.072C3.25911 2.97753 3.32314 2.89627 3.40652 2.83895C3.4899 2.78164 3.58871 2.74997 3.68989 2.75ZM3.69189 4.644L5.05489 8.176H2.33689L3.69189 4.644ZM10.8989 5.208C9.25889 5.208 8.00889 6.687 8.00889 8.611C8.00889 10.635 9.35889 12.013 10.8989 12.013C11.3228 12.0132 11.7422 11.9253 12.1304 11.7549C12.5186 11.5844 12.8671 11.3352 13.1539 11.023V11.531C13.1539 11.6503 13.2013 11.7648 13.2857 11.8492C13.3701 11.9336 13.4845 11.981 13.6039 11.981C13.7232 11.981 13.8377 11.9336 13.9221 11.8492C14.0065 11.7648 14.0539 11.6503 14.0539 11.531V5.72C14.0539 5.60065 14.0065 5.48619 13.9221 5.4018C13.8377 5.31741 13.7232 5.27 13.6039 5.27C13.4845 5.27 13.3701 5.31741 13.2857 5.4018C13.2013 5.48619 13.1539 5.60065 13.1539 5.72V6.223C12.8715 5.90372 12.5246 5.64804 12.136 5.47289C11.7474 5.29774 11.3261 5.20711 10.8999 5.207M13.1549 9.798V7.302C12.7649 6.581 11.9419 6.058 11.0879 6.058C10.1099 6.058 9.03589 6.966 9.03589 8.61C9.03589 10.153 10.0099 11.162 11.0879 11.162C11.9709 11.162 12.7729 10.495 13.1549 9.798Z"
                                      fill="white"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_176_2">
                                      <rect
                                        width="15"
                                        height="15"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button>
                              <FormControl fullWidth size="small">
                                <InputLabel id="demo-simple-select-label"></InputLabel>
                                <Select
                                  open={openCase}
                                  onClose={() => {
                                    setOpenCase(false);
                                  }}
                                  onOpen={() => {
                                    setOpenCase(true);
                                  }}
                                  style={{
                                    background: "#26272B",
                                    color: "#fff",
                                    borderRadius: "10px",
                                    fontSize: "12px",
                                    width: "90%",
                                    opacity: 0,
                                    position: "absolute",
                                  }}
                                  className="mui__select__font__type"
                                  MenuProps={menuProps}
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={fontCase}
                                  onChange={(e) => {
                                    setFontCase(e.target.value);
                                  }}
                                >
                                  <MenuItem value="Lower case">
                                    Lower case
                                  </MenuItem>
                                  <MenuItem value="Capital letters">
                                    Capital letters
                                  </MenuItem>
                                  <MenuItem value="Sentence">Sentence</MenuItem>
                                  <MenuItem value="Title">Title</MenuItem>
                                </Select>
                              </FormControl>
                              <button
                                onClick={() => {
                                  setOpenAlignText(true);
                                }}
                                style={{
                                  zIndex: 10,
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                >
                                  <path
                                    d="M1.99992 10H8.66659C8.8434 10 9.01297 9.92977 9.13799 9.80475C9.26302 9.67973 9.33325 9.51016 9.33325 9.33335C9.33325 9.15653 9.26302 8.98697 9.13799 8.86194C9.01297 8.73692 8.8434 8.66668 8.66659 8.66668H1.99992C1.82311 8.66668 1.65354 8.73692 1.52851 8.86194C1.40349 8.98697 1.33325 9.15653 1.33325 9.33335C1.33325 9.51016 1.40349 9.67973 1.52851 9.80475C1.65354 9.92977 1.82311 10 1.99992 10ZM1.99992 7.33334H8.66659C8.8434 7.33334 9.01297 7.26311 9.13799 7.13808C9.26302 7.01306 9.33325 6.84349 9.33325 6.66668C9.33325 6.48987 9.26302 6.3203 9.13799 6.19527C9.01297 6.07025 8.8434 6.00001 8.66659 6.00001H1.99992C1.82311 6.00001 1.65354 6.07025 1.52851 6.19527C1.40349 6.3203 1.33325 6.48987 1.33325 6.66668C1.33325 6.84349 1.40349 7.01306 1.52851 7.13808C1.65354 7.26311 1.82311 7.33334 1.99992 7.33334ZM1.99992 4.66668H13.9999C14.1767 4.66668 14.3463 4.59644 14.4713 4.47141C14.5964 4.34639 14.6666 4.17682 14.6666 4.00001C14.6666 3.8232 14.5964 3.65363 14.4713 3.52861C14.3463 3.40358 14.1767 3.33334 13.9999 3.33334H1.99992C1.82311 3.33334 1.65354 3.40358 1.52851 3.52861C1.40349 3.65363 1.33325 3.8232 1.33325 4.00001C1.33325 4.17682 1.40349 4.34639 1.52851 4.47141C1.65354 4.59644 1.82311 4.66668 1.99992 4.66668ZM13.9999 11.3333H1.99992C1.82311 11.3333 1.65354 11.4036 1.52851 11.5286C1.40349 11.6536 1.33325 11.8232 1.33325 12C1.33325 12.1768 1.40349 12.3464 1.52851 12.4714C1.65354 12.5964 1.82311 12.6667 1.99992 12.6667H13.9999C14.1767 12.6667 14.3463 12.5964 14.4713 12.4714C14.5964 12.3464 14.6666 12.1768 14.6666 12C14.6666 11.8232 14.5964 11.6536 14.4713 11.5286C14.3463 11.4036 14.1767 11.3333 13.9999 11.3333ZM13.0933 6.38001C13.0274 6.31634 12.9492 6.26692 12.8634 6.23483C12.7776 6.20274 12.6861 6.18867 12.5947 6.1935C12.5032 6.19833 12.4137 6.22195 12.3318 6.26289C12.2499 6.30383 12.1772 6.36122 12.1185 6.43146C12.0597 6.50171 12.016 6.58331 11.9902 6.67118C11.9644 6.75905 11.9569 6.8513 11.9683 6.94218C11.9797 7.03306 12.0097 7.12061 12.0564 7.19938C12.1032 7.27815 12.1656 7.34645 12.2399 7.40001L12.9599 8.00001L12.2399 8.60001C12.1724 8.65598 12.1166 8.72471 12.0757 8.80228C12.0348 8.87984 12.0096 8.96471 12.0016 9.05203C11.9935 9.13935 12.0028 9.2274 12.0288 9.31113C12.0548 9.39487 12.0971 9.47265 12.1533 9.54001C12.2159 9.61527 12.2944 9.67579 12.3832 9.71727C12.4719 9.75875 12.5686 9.78017 12.6666 9.78001C12.8232 9.77845 12.9742 9.7218 13.0933 9.62001L14.4266 8.51335C14.5021 8.45079 14.5628 8.37235 14.6046 8.28362C14.6463 8.19489 14.6679 8.09806 14.6679 8.00001C14.6679 7.90197 14.6463 7.80513 14.6046 7.7164C14.5628 7.62767 14.5021 7.54923 14.4266 7.48668L13.0933 6.38001Z"
                                    fill="white"
                                  />
                                </svg>
                              </button>
                              <FormControl fullWidth size="small">
                                <InputLabel id="demo-simple-select-label"></InputLabel>
                                <Select
                                  open={openAlignText}
                                  onClose={() => {
                                    setOpenAlignText(false);
                                  }}
                                  onOpen={() => {
                                    setOpenAlignText(true);
                                  }}
                                  style={{
                                    background: "#26272B",
                                    color: "#fff",
                                    borderRadius: "10px",
                                    fontSize: "12px",
                                    width: "90%",
                                    opacity: 0,
                                    zIndex: -1,
                                    cursor: "move",
                                    position: "absolute",
                                  }}
                                  className="mui__select__font__type"
                                  MenuProps={menuProps}
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={alignText}
                                  onChange={(e) => {
                                    setAlignText(e.target.value);
                                  }}
                                >
                                  <MenuItem value="East">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                    >
                                      <path
                                        d="M3 7H21C21.6 7 22 6.6 22 6C22 5.4 21.6 5 21 5H3C2.4 5 2 5.4 2 6C2 6.6 2.4 7 3 7ZM21 9H7C6.4 9 6 9.4 6 10C6 10.6 6.4 11 7 11H21C21.6 11 22 10.6 22 10C22 9.4 21.6 9 21 9ZM21 13H3C2.4 13 2 13.4 2 14C2 14.6 2.4 15 3 15H21C21.6 15 22 14.6 22 14C22 13.4 21.6 13 21 13ZM21 17H7C6.4 17 6 17.4 6 18C6 18.6 6.4 19 7 19H21C21.6 19 22 18.6 22 18C22 17.4 21.6 17 21 17Z"
                                        fill="black"
                                      />
                                    </svg>
                                  </MenuItem>
                                  <MenuItem value="center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                    >
                                      <path
                                        d="M7 9C6.4 9 6 9.4 6 10C6 10.6 6.4 11 7 11H17C17.6 11 18 10.6 18 10C18 9.4 17.6 9 17 9H7ZM3 7H21C21.6 7 22 6.6 22 6C22 5.4 21.6 5 21 5H3C2.4 5 2 5.4 2 6C2 6.6 2.4 7 3 7ZM17 17H7C6.4 17 6 17.4 6 18C6 18.6 6.4 19 7 19H17C17.6 19 18 18.6 18 18C18 17.4 17.6 17 17 17ZM21 13H3C2.4 13 2 13.4 2 14C2 14.6 2.4 15 3 15H21C21.6 15 22 14.6 22 14C22 13.4 21.6 13 21 13Z"
                                        fill="black"
                                      />
                                    </svg>
                                  </MenuItem>
                                  <MenuItem value="West">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                    >
                                      <path
                                        d="M3 7H21C21.2652 7 21.5196 6.89464 21.7071 6.70711C21.8946 6.51957 22 6.26522 22 6C22 5.73478 21.8946 5.48043 21.7071 5.29289C21.5196 5.10536 21.2652 5 21 5H3C2.73478 5 2.48043 5.10536 2.29289 5.29289C2.10536 5.48043 2 5.73478 2 6C2 6.26522 2.10536 6.51957 2.29289 6.70711C2.48043 6.89464 2.73478 7 3 7ZM3 11H17C17.2652 11 17.5196 10.8946 17.7071 10.7071C17.8946 10.5196 18 10.2652 18 10C18 9.73478 17.8946 9.48043 17.7071 9.29289C17.5196 9.10536 17.2652 9 17 9H3C2.73478 9 2.48043 9.10536 2.29289 9.29289C2.10536 9.48043 2 9.73478 2 10C2 10.2652 2.10536 10.5196 2.29289 10.7071C2.48043 10.8946 2.73478 11 3 11ZM21 13H3C2.73478 13 2.48043 13.1054 2.29289 13.2929C2.10536 13.4804 2 13.7348 2 14C2 14.2652 2.10536 14.5196 2.29289 14.7071C2.48043 14.8946 2.73478 15 3 15H21C21.2652 15 21.5196 14.8946 21.7071 14.7071C21.8946 14.5196 22 14.2652 22 14C22 13.7348 21.8946 13.4804 21.7071 13.2929C21.5196 13.1054 21.2652 13 21 13ZM17 17H3C2.73478 17 2.48043 17.1054 2.29289 17.2929C2.10536 17.4804 2 17.7348 2 18C2 18.2652 2.10536 18.5196 2.29289 18.7071C2.48043 18.8946 2.73478 19 3 19H17C17.2652 19 17.5196 18.8946 17.7071 18.7071C17.8946 18.5196 18 18.2652 18 18C18 17.7348 17.8946 17.4804 17.7071 17.2929C17.5196 17.1054 17.2652 17 17 17Z"
                                        fill="black"
                                      />
                                    </svg>
                                  </MenuItem>
                                </Select>
                              </FormControl>
                              <button
                                onClick={() => {
                                  setOpenSpace((prev) => !prev);
                                }}
                                style={{
                                  zIndex: 10,
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                >
                                  <path
                                    d="M3.39804 4.66467H4.78271L2.78271 2.66467L0.782705 4.66467H2.06471V11.3353H0.772705L2.77271 13.3353L4.77271 11.3353H3.39804V4.66467ZM15.2274 4.66667H5.89404V3.33334H15.2274V4.66667ZM15.2274 7.33334H5.89404V6.00001H15.2274V7.33334ZM5.89404 10H15.2274V8.66667H5.89404V10ZM15.2274 12.6667H5.89404V11.3333H15.2274V12.6667Z"
                                    fill="white"
                                  />
                                </svg>
                              </button>
                              {openSpace ? (
                                <div className="space__popper__div">
                                  <span className="text-white text-xs">
                                    Letter spacing
                                  </span>
                                  <Slider
                                    size="small"
                                    value={letterSpacing}
                                    aria-label="Small"
                                    valueLabelDisplay="auto"
                                    className="w-fit"
                                    marks={letterSpacingMarks}
                                    valueLabelFormat={(value) =>
                                      `${letterSpacingMarks.findIndex(
                                        (mark) => mark.value == value / 5
                                      )}px`
                                    }
                                    onChange={(e, newValue) => {
                                      setLetterSpacing(newValue);
                                    }}
                                    step={5}
                                    sx={{
                                      color: "Scrollbar",
                                    }}
                                  />
                                  <span className="text-white text-xs letter__try">
                                    Line height
                                  </span>
                                  <Slider
                                    size="small"
                                    value={lineHeight}
                                    aria-label="Small"
                                    valueLabelDisplay="auto"
                                    className="w-fit"
                                    valueLabelFormat={(value) => `${value}px`}
                                    onChange={(e, newValue) => {
                                      setLineHeight(newValue);
                                    }}
                                    step={5}
                                    sx={{
                                      color: "Scrollbar",
                                    }}
                                  />
                                </div>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="basic__style__div">
                          <h4 className="basic__style__title">Styles</h4>
                          <div className="flex flex-row gap-5 w-[100%] mt-2 items-center">
                            <span className="style__color__span">Color</span>
                            <div className="dashed__line" />

                            <ChromeExample
                              initialColor={textColor}
                              onChange={(color) => {
                                setTextColor(color);
                              }}
                            ></ChromeExample>
                          </div>
                          <div className="flex flex-row gap-5 w-[100%] mt-2 items-center">
                            <span className="style__color__span">
                              Background
                            </span>
                            <div className="dashed__line" />
                            <ChromeExample
                              initialColor={bgColor}
                              onChange={(color) => {
                                setBgColor(color);
                              }}
                            ></ChromeExample>
                          </div>
                          <div className="flex flex-row gap-5 w-[100%] mt-2 items-center">
                            <span className="style__color__span">Stroke</span>
                            <div className="dashed__line" />
                            <ChromeExample
                              initialColor={strokeColor}
                              onChange={(color) => {
                                setStrokeColor(color);
                              }}
                            ></ChromeExample>
                            <button
                              onClick={() => {
                                setStrokeSizePopper((prev) => !prev);
                              }}
                              className="style__stroke__options__button"
                            />
                            {strokeSizePopper ? (
                              <div className="stroke__size__popper__div">
                                <span className="text-white text-xs">Size</span>
                                <Slider
                                  size="small"
                                  value={strokeSize}
                                  aria-label="Small"
                                  valueLabelDisplay="auto"
                                  className="w-fit"
                                  marks={strokeSizeMarks}
                                  valueLabelFormat={(value) =>
                                    `${
                                      strokeSizeMarks.findIndex(
                                        (mark) => mark.value == value / 10
                                      ) * 2
                                    }px`
                                  }
                                  onChange={(e, newValue) => {
                                    setStrokeSize(newValue);
                                  }}
                                  step={20}
                                  sx={{
                                    color: "Scrollbar",
                                  }}
                                />
                              </div>
                            ) : (
                              <></>
                            )}
                          </div>
                          <div className="flex flex-row gap-5 w-[100%] mt-2 items-center">
                            <span className="style__color__span">Shadow</span>
                            <div className="dashed__line" />
                            <ChromeExample
                              initialColor={shadowColor}
                              onChange={(color) => {
                                setShadowColor(color);
                              }}
                            ></ChromeExample>
                            <button
                              onClick={() => {
                                setShadowOptionsPopper((prev) => !prev);
                              }}
                              className="style__stroke__options__button"
                            />
                            {shadowOptionsPopper ? (
                              <div className="shadow__options__popper__div">
                                <span className="text-white text-xs">Blur</span>
                                <Slider
                                  size="small"
                                  value={shadowBlur}
                                  aria-label="Small"
                                  valueLabelDisplay="auto"
                                  className="w-fit"
                                  marks={shadowBlurMarks}
                                  valueLabelFormat={(value) =>
                                    `${
                                      shadowBlurMarks.findIndex(
                                        (mark) => mark.value == (value / 10) * 2
                                      ) * 2
                                    }px`
                                  }
                                  onChange={(e, newValue) => {
                                    setShadowBlur(newValue);
                                  }}
                                  step={10}
                                  sx={{
                                    color: "Scrollbar",
                                  }}
                                />
                              </div>
                            ) : (
                              <></>
                            )}
                          </div>
                          <div className="flex flex-row gap-5 w-[100%] mt-2 items-center">
                            <span className="style__color__span">Opacity</span>
                            <Slider
                              value={opacity}
                              size="small"
                              step={10}
                              onChange={(e, newValue) => {
                                setOpacity(newValue);
                              }}
                              aria-label="Small"
                              valueLabelDisplay="auto"
                              className="w-fit"
                              sx={{
                                color: "Scrollbar",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                      <div className="basic__panel__div">
                        <div className="flex flex-col gap-[8px] justify-center items-center">
                          <div className="flex flex-col gap-3 items-center">
                            <span className="text-xs text-white font-semibold">
                              Characters per subtitle
                            </span>
                            <div className="flex flex-row justify-center items-center gap-2">
                              <FormControl
                                style={{
                                  display: "flex",
                                  flexDirection: "col",
                                  alignItems: "center",
                                  gap: "4px",
                                  width: "fit",
                                }}
                              >
                                <OutlinedInput
                                  size="small"
                                  sx={{
                                    input: { color: "white", fontSize: "13px" },
                                  }}
                                  style={{
                                    fontFamily: `${poppins.style}`,
                                    background: "#26272B",
                                    borderRadius: "10px",
                                    fontSize: "10px",
                                    width: "50%",
                                  }}
                                  id="outlined-number"
                                  type="number"
                                  value={maxCharacters}
                                  onChange={(e) => {
                                    let value;
                                    if (Number(e.target.value) <= 1) {
                                      value = 1;
                                    } else {
                                      value = Number(e.target.value);
                                    }
                                    setMaxCharacters(value);
                                  }}
                                />
                                <span
                                  className={`${poppins.className} text-xs text-[#ffffffb7] mt-1`}
                                >
                                  (Max)
                                </span>
                              </FormControl>
                            </div>
                          </div>
                          <div className="flex w-[125%] gap-2 mt-3 flex-col items-start justify-center">
                            <h4 className="text-xs text-white font-semibold">
                              Other settings
                            </h4>
                            <div className="flex flex-row gap-5 w-[100%] mt-2 items-center">
                              <span className="style__color__span whitespace-nowrap text-center">
                                Word by word
                              </span>
                              <div className="dashed__line" />
                              <button
                                className="word__by__word__button"
                                value={wordByWord}
                                onClick={() => {
                                  setWordByWord((prev) => !prev);
                                }}
                              >
                                {wordByWord ? (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="13"
                                    height="13"
                                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                    viewBox="0 0 63 63"
                                    fill="none"
                                  >
                                    <g filter="url(#filter0_d_156_215)">
                                      <path
                                        d="M55.125 18.375L23.625 49.875L9.1875 35.4375L12.8888 31.7363L23.625 42.4463L51.4238 14.6738L55.125 18.375Z"
                                        fill="#A7E890"
                                      />
                                    </g>
                                    <defs>
                                      <filter
                                        id="filter0_d_156_215"
                                        x="-6"
                                        y="-6"
                                        width="75"
                                        height="75"
                                        filterUnits="userSpaceOnUse"
                                        color-interpolation-filters="sRGB"
                                      >
                                        <feFlood
                                          flood-opacity="0"
                                          result="BackgroundImageFix"
                                        />
                                        <feColorMatrix
                                          in="SourceAlpha"
                                          type="matrix"
                                          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                          result="hardAlpha"
                                        />
                                        <feOffset />
                                        <feGaussianBlur stdDeviation="3" />
                                        <feComposite
                                          in2="hardAlpha"
                                          operator="out"
                                        />
                                        <feColorMatrix
                                          type="matrix"
                                          values="0 0 0 0 0.670985 0 0 0 0 0.905512 0 0 0 0 0.588583 0 0 0 1 0"
                                        />
                                        <feBlend
                                          mode="normal"
                                          in2="BackgroundImageFix"
                                          result="effect1_dropShadow_156_215"
                                        />
                                        <feBlend
                                          mode="normal"
                                          in="SourceGraphic"
                                          in2="effect1_dropShadow_156_215"
                                          result="shape"
                                        />
                                      </filter>
                                    </defs>
                                  </svg>
                                ) : (
                                  <></>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CustomTabPanel>
                    <div className="flex flex-col justify-center items-center">
                      <CustomTabPanel value={value} index={1}>
                        <div className="basic__panel__div">
                          <div className="flex flex-col gap-[8px] justify-center items-center">
                            <div className="flex flex-row gap-2 justify-center items-center mt-2">
                              <FormControl>
                                <OutlinedInput
                                  size="small"
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <span
                                        style={{
                                          color: "#fff",
                                          fontSize: "14px",
                                        }}
                                      >
                                        X
                                      </span>
                                    </InputAdornment>
                                  }
                                  sx={{
                                    input: { color: "white", fontSize: "13px" },
                                  }}
                                  style={{
                                    fontFamily: `${poppins.style}`,
                                    background: "#26272B",
                                    borderRadius: "10px",
                                    fontSize: "10px",
                                  }}
                                  id="outlined-number"
                                  type="number"
                                  value={xPosition}
                                  onChange={(e) => {
                                    let value;
                                    if (Number(e.target.value) >= 100) {
                                      value = 100;
                                    } else if (Number(e.target.value) <= 0) {
                                      value = 0;
                                    } else {
                                      value = Number(e.target.value);
                                    }
                                    setXPosition(value);
                                  }}
                                />
                              </FormControl>
                              <FormControl>
                                <OutlinedInput
                                  size="small"
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <span
                                        style={{
                                          color: "#fff",
                                          fontSize: "14px",
                                        }}
                                      >
                                        Y
                                      </span>
                                    </InputAdornment>
                                  }
                                  sx={{
                                    input: { color: "white", fontSize: "13px" },
                                  }}
                                  style={{
                                    fontFamily: `${poppins.style}`,
                                    background: "#26272B",
                                    borderRadius: "10px",
                                    fontSize: "10px",
                                  }}
                                  id="outlined-number"
                                  type="number"
                                  value={yPosition}
                                  onChange={(e) => {
                                    let value;
                                    if (Number(e.target.value) >= 100) {
                                      value = 100;
                                    } else if (Number(e.target.value) <= 0) {
                                      value = 0;
                                    } else {
                                      value = Number(e.target.value);
                                    }
                                    setYPosition(value);
                                  }}
                                />
                              </FormControl>
                            </div>
                            <span className={`text-[#ffffffb1] text-xs`}>
                              (0-100 in %)
                            </span>
                            <div className="flex flex-col justify-end gap-3 mt-4">
                              <button
                                className={`${poppins.className} text-xs text-gray-50`}
                              >
                                Set by visual scheme
                              </button>
                              <div
                                className="position__canvas"
                                style={{
                                  width: `${
                                    aspectRatio == 0.5625
                                      ? "117px"
                                      : aspectRatio == 1.3333333333333333
                                      ? "160px"
                                      : aspectRatio == 2.0
                                      ? "200px"
                                      : aspectRatio == 1.0
                                      ? "200px"
                                      : aspectRatio == 0.75
                                      ? "120px"
                                      : "208px"
                                  }`,
                                  height: `${
                                    aspectRatio == 0.5625
                                      ? "208px"
                                      : aspectRatio == 1.3333333333333333
                                      ? "120px"
                                      : aspectRatio == 2.0
                                      ? "100px"
                                      : aspectRatio == 1.0
                                      ? "200px"
                                      : aspectRatio == 0.75
                                      ? "160px"
                                      : "117px"
                                  }`,
                                }}
                              >
                                <div
                                  className={`${
                                    xPosition == "left" && yPosition == "top"
                                      ? "bg-[#0adbd484]"
                                      : "bg-transparent"
                                  } section__div`}
                                  onClick={() => {
                                    setXPosition("left");
                                    setYPosition("top");
                                  }}
                                ></div>
                                <div
                                  className={`${
                                    xPosition == "center" && yPosition == "top"
                                      ? "bg-[#0adbd484]"
                                      : "bg-transparent"
                                  } section__div`}
                                  onClick={() => {
                                    setXPosition("center");
                                    setYPosition("top");
                                  }}
                                ></div>
                                <div
                                  className={`${
                                    xPosition == "right" && yPosition == "top"
                                      ? "bg-[#0adbd484]"
                                      : "bg-transparent"
                                  } section__div`}
                                  onClick={() => {
                                    setXPosition("right");
                                    setYPosition("top");
                                  }}
                                ></div>
                                <div
                                  className={`${
                                    xPosition == "left" && yPosition == "center"
                                      ? "bg-[#0adbd484]"
                                      : "bg-transparent"
                                  } section__div`}
                                  onClick={() => {
                                    setXPosition("left");
                                    setYPosition("center");
                                  }}
                                ></div>
                                <div
                                  className={`${
                                    xPosition == "center" &&
                                    yPosition == "center"
                                      ? "bg-[#0adbd484]"
                                      : "bg-transparent"
                                  } section__div`}
                                  onClick={() => {
                                    setXPosition("center");
                                    setYPosition("center");
                                  }}
                                ></div>
                                <div
                                  className={`${
                                    xPosition == "right" &&
                                    yPosition == "center"
                                      ? "bg-[#0adbd484]"
                                      : "bg-transparent"
                                  } section__div`}
                                  onClick={() => {
                                    setXPosition("right");
                                    setYPosition("center");
                                  }}
                                ></div>
                                <div
                                  className={`${
                                    xPosition == "left" && yPosition == "bottom"
                                      ? "bg-[#0adbd484]"
                                      : "bg-transparent"
                                  } section__div`}
                                  onClick={() => {
                                    setXPosition("left");
                                    setYPosition("bottom");
                                  }}
                                ></div>
                                <div
                                  className={`${
                                    xPosition == "center" &&
                                    yPosition == "bottom"
                                      ? "bg-[#0adbd484]"
                                      : "bg-transparent"
                                  } section__div`}
                                  onClick={() => {
                                    setXPosition("center");
                                    setYPosition("bottom");
                                  }}
                                ></div>
                                <div
                                  className={`${
                                    xPosition == "right" &&
                                    yPosition == "bottom"
                                      ? "bg-[#0adbd484]"
                                      : "bg-transparent"
                                  } section__div`}
                                  onClick={() => {
                                    setXPosition("right");
                                    setYPosition("bottom");
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CustomTabPanel>
                      {stylesConfirm ? (
                        <LinearProgressWithLabel value={progress} />
                      ) : (
                        <button
                          onClick={confirmBasicText}
                          className={`${poppins.className} text__basic__confirm mb-5`}
                        >
                          Confirm
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}

              <LightTooltip title="Edit teleprompt animations" placement="left">
                <button
                  onClick={(e) => {
                    setPopper((prev) => {
                      if (prev == "Animations") {
                        return null;
                      } else {
                        return "Animations";
                      }
                    });
                  }}
                  className={
                    popper == "Animations"
                      ? "tele__editor__sub__div border-gray-400 border-[1px]"
                      : "tele__editor__sub__div"
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="27"
                    viewBox="0 0 34 36"
                    fill="none"
                    className="tele__editor__sub__svg"
                  >
                    <path
                      d="M16.1643 0.0850067L21.4286 8.8315L31.3736 11.135L24.6813 18.8417L25.5639 29.0133L16.1643 25.0297L6.7661 29.0119L7.64868 18.8431L0.957764 11.135L10.9028 8.8315L16.1643 0.0864234V0.0850067ZM16.1643 5.58167L12.7104 11.3192L6.18385 12.8322L10.5755 17.8925L9.99468 24.5664L16.1643 21.9527L22.3339 24.5664L21.7544 17.8925L26.1461 12.8322L19.6195 11.3206L16.1643 5.58167ZM29.556 19.8489L33.0623 23.3552L31.0591 25.3583L27.5528 21.8535L29.556 19.8489ZM17.8034 28.5132L21.3082 32.0195L19.305 34.0227L15.7988 30.5164L17.8034 28.5132ZM27.1222 28.5132L30.627 32.0195L28.6238 34.0227L25.1176 30.5164L27.1222 28.5132Z"
                      fill="white"
                    />
                  </svg>
                  <span
                    className={`tele__editor__animations__span ${poppins.className}`}
                  >
                    Animations
                  </span>
                </button>
              </LightTooltip>
              {popper == "Animations" ? (
                <div className="popper__text__main__div">
                  <div className="flex flex-col justify-center items-center">
                    <StyledTabs
                      value={value}
                      onChange={(e, newValue) => {
                        setValue(newValue);
                      }}
                      aria-label="basic tabs example"
                      textColor="primary"
                      variant="fullWidth"
                    >
                      <AntTab label="Entry" {...a11yProps(0)} />
                      <AntTab label="Exit" {...a11yProps(1)} />
                    </StyledTabs>
                    <CustomTabPanel value={value} index={0}>
                      <div className="main__grid__animations">
                        <div
                          className="flex flex-col items-center gap-1"
                          onClick={() => {
                            setAnimationEntry(null);
                          }}
                        >
                          <div
                            className={`animation__item`}
                            style={{
                              border: `${
                                animationEntry == null
                                  ? "2px solid #D77AE6"
                                  : "1px solid #ffffffb9"
                              }`,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              background: "",
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M12 0C5.37188 0 0 5.37188 0 12C0 18.6281 5.37188 24 12 24C18.6281 24 24 18.6281 24 12C24 5.37188 18.6281 0 12 0ZM3 12C3 7.02656 7.03125 3 12 3C13.9734 3 15.7969 3.64219 17.2781 4.72031L4.72031 17.2781C3.64219 15.7969 3 13.9734 3 12ZM12 21C10.0266 21 8.20312 20.3578 6.72187 19.2797L19.2797 6.72187C20.3578 8.20781 21 10.0266 21 12C21 16.9734 16.9688 21 12 21Z"
                                fill="white"
                                fill-opacity="0.72549"
                              />
                            </svg>
                          </div>
                          <span
                            className={`text-[10px] text-white ${poppins.className}`}
                          >
                            None
                          </span>
                        </div>
                        <div
                          className="flex flex-col items-center gap-1"
                          onClick={() => {
                            setAnimationEntry("fadein");
                          }}
                        >
                          <div
                            className={`animation__item`}
                            style={{
                              border: `${
                                animationEntry == "fadein"
                                  ? "2px solid #D77AE6"
                                  : "1px solid #ffffffb9"
                              }`,
                            }}
                          ><Image
                          src={FadeIn} // Asegúrate de reemplazar esto con la ruta correcta a tu GIF
                          alt="Animación GIF"
                          style={{ width: '100%', height: '100%' }}
                        /></div>
                          <span
                            className={`text-[10px] text-white ${poppins.className}`}
                          >
                            Fade In
                          </span>
                        </div>
                        <div
                          className="flex flex-col items-center gap-1"
                          onClick={() => {
                            setAnimationEntry("slidedown");
                          }}
                        >
                          <div
                            className={`animation__item`}
                            style={{
                              border: `${
                                animationEntry == "slidedown"
                                  ? "2px solid #D77AE6"
                                  : "1px solid #ffffffb9"
                              }`,
                            }}
                          ></div>
                          <span
                            className={`text-[10px] text-white ${poppins.className}`}
                          >
                            Slide down
                          </span>
                        </div>
                        <div
                          className="flex flex-col items-center gap-1"
                          onClick={() => {
                            setAnimationEntry("slideup");
                          }}
                        >
                          <div
                            className={`animation__item`}
                            style={{
                              border: `${
                                animationEntry == "slideup"
                                  ? "2px solid #D77AE6"
                                  : "1px solid #ffffffb9"
                              }`,
                            }}
                          ></div>
                          <span
                            className={`text-[10px] text-white ${poppins.className}`}
                          >
                            Slide up
                          </span>
                        </div>
                        <div
                          className="flex flex-col items-center gap-1"
                          onClick={() => {
                            setAnimationEntry("slideleft");
                          }}
                        >
                          <div
                            className={`animation__item`}
                            style={{
                              border: `${
                                animationEntry == "slideleft"
                                  ? "2px solid #D77AE6"
                                  : "1px solid #ffffffb9"
                              }`,
                            }}
                          ></div>
                          <span
                            className={`text-[10px] text-white ${poppins.className}`}
                          >
                            Slide left
                          </span>
                        </div>
                        <div
                          className="flex flex-col items-center gap-1"
                          onClick={() => {
                            setAnimationEntry("slideright");
                          }}
                        >
                          <div
                            className={`animation__item`}
                            style={{
                              border: `${
                                animationEntry == "slideright"
                                  ? "2px solid #D77AE6"
                                  : "1px solid #ffffffb9"
                              }`,
                            }}
                          ></div>
                          <span
                            className={`text-[10px] text-white ${poppins.className}`}
                          >
                            Slide right
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-start justify-center gap-1 mt-4">
                        <span
                          className={`text-white text-[11px] ${poppins.className}`}
                        >
                          Duration
                        </span>
                        <Slider
                          value={animationDurationEntry}
                          size="small"
                          step={25}
                          valueLabelDisplay="auto"
                          valueLabelFormat={(value) => `${(value * 1) / 100}`}
                          onChange={(e, newValue) => {
                            setAnimationDurationEntry(newValue);
                          }}
                          aria-label="Small"
                          className="w-fit"
                          sx={{
                            color: "Scrollbar",
                          }}
                        />
                      </div>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                      <div className="main__grid__animations">
                        <div
                          className="flex flex-col items-center gap-1"
                          onClick={() => {
                            setAnimationExit(null);
                          }}
                        >
                          <div
                            className={`animation__item`}
                            style={{
                              border: `${
                                animationExit == null
                                  ? "2px solid #FFC27B"
                                  : "1px solid #ffffffb9"
                              }`,
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center'
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M12 0C5.37188 0 0 5.37188 0 12C0 18.6281 5.37188 24 12 24C18.6281 24 24 18.6281 24 12C24 5.37188 18.6281 0 12 0ZM3 12C3 7.02656 7.03125 3 12 3C13.9734 3 15.7969 3.64219 17.2781 4.72031L4.72031 17.2781C3.64219 15.7969 3 13.9734 3 12ZM12 21C10.0266 21 8.20312 20.3578 6.72187 19.2797L19.2797 6.72187C20.3578 8.20781 21 10.0266 21 12C21 16.9734 16.9688 21 12 21Z"
                                fill="white"
                                fill-opacity="0.72549"
                              />
                            </svg>
                          </div>
                          <span
                            className={`text-[10px] text-white ${poppins.className}`}
                          >
                            None
                          </span>
                        </div>
                        <div
                          className="flex flex-col items-center gap-1"
                          onClick={() => {
                            setAnimationExit("fadeout");
                          }}
                        >
                          <div
                            className={`animation__item`}
                            style={{
                              border: `${
                                animationExit == "fadeout"
                                  ? "2px solid #FFC27B"
                                  : "1px solid #ffffffb9"
                              }`,
                            }}
                          ></div>
                          <span
                            className={`text-[10px] text-white ${poppins.className}`}
                          >
                            Fade Out
                          </span>
                        </div>
                        <div
                          className="flex flex-col items-center gap-1"
                          onClick={() => {
                            setAnimationExit("slidedownout");
                          }}
                        >
                          <div
                            className={`animation__item`}
                            style={{
                              border: `${
                                animationExit == "slidedownout"
                                  ? "2px solid #FFC27B"
                                  : "1px solid #ffffffb9"
                              }`,
                            }}
                          ></div>
                          <span
                            className={`text-[10px] text-white ${poppins.className}`}
                          >
                            Slide down
                          </span>
                        </div>
                        <div
                          className="flex flex-col items-center gap-1"
                          onClick={() => {
                            setAnimationExit("slideupout");
                          }}
                        >
                          <div
                            className={`animation__item`}
                            style={{
                              border: `${
                                animationExit == "slideupout"
                                  ? "2px solid #FFC27B"
                                  : "1px solid #ffffffb9"
                              }`,
                            }}
                          ></div>
                          <span
                            className={`text-[10px] text-white ${poppins.className}`}
                          >
                            Slide up
                          </span>
                        </div>
                        <div
                          className="flex flex-col items-center gap-1"
                          onClick={() => {
                            setAnimationExit("slideleftout");
                          }}
                        >
                          <div
                            className={`animation__item`}
                            style={{
                              border: `${
                                animationExit == "slideleftout"
                                  ? "2px solid #FFC27B"
                                  : "1px solid #ffffffb9"
                              }`,
                            }}
                          ></div>
                          <span
                            className={`text-[10px] text-white ${poppins.className}`}
                          >
                            Slide left
                          </span>
                        </div>
                        <div
                          className="flex flex-col items-center gap-1"
                          onClick={() => {
                            setAnimationExit("sliderightout");
                          }}
                        >
                          <div
                            className={`animation__item`}
                            style={{
                              border: `${
                                animationExit == "sliderightout"
                                  ? "2px solid #FFC27B"
                                  : "1px solid #ffffffb9"
                              }`,
                            }}
                          ></div>
                          <span
                            className={`text-[10px] text-white ${poppins.className}`}
                          >
                            Slide right
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-start justify-center gap-1 mt-4">
                        <span
                          className={`text-white text-[11px] ${poppins.className}`}
                        >
                          Duration
                        </span>
                        <Slider
                          value={animationDurationExit}
                          size="small"
                          step={25}
                          valueLabelDisplay="auto"
                          valueLabelFormat={(value) => `${(value * 1) / 100}`}
                          onChange={(e, newValue) => {
                            setAnimationDurationExit(newValue);
                          }}
                          aria-label="Small"
                          className="w-fit"
                          sx={{
                            color: "Scrollbar",
                          }}
                        />
                      </div>
                    </CustomTabPanel>
                    {stylesConfirm ? (
                      <LinearProgressWithLabel value={progress} />
                    ) : (
                      <button
                        onClick={confirmBasicText}
                        className={`${poppins.className} text__basic__confirm mb-5`}
                      >
                        Confirm
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="right__div__3">
          <div>
            <div className="timeline-tools">
              <div className="flex flex-row justify-center items-center gap-2">
                <button onClick={handlePlayPause} className="pause__div">
                  {isPlaying ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
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
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <path
                        d="M16.875 9C16.8755 9.19099 16.8265 9.37885 16.7329 9.5453C16.6392 9.71176 16.5041 9.85115 16.3406 9.94992L6.21 16.1473C6.0392 16.2519 5.84358 16.309 5.64334 16.3127C5.44309 16.3164 5.24549 16.2666 5.07094 16.1684C4.89805 16.0717 4.75402 15.9307 4.65368 15.7599C4.55333 15.5892 4.50029 15.3947 4.5 15.1966V2.80336C4.50029 2.60528 4.55333 2.41085 4.65368 2.24007C4.75402 2.06928 4.89805 1.92831 5.07094 1.83164C5.24549 1.73345 5.44309 1.68363 5.64334 1.68734C5.84358 1.69105 6.0392 1.74815 6.21 1.85273L16.3406 8.05008C16.5041 8.14885 16.6392 8.28824 16.7329 8.4547C16.8265 8.62116 16.8755 8.80901 16.875 9Z"
                        fill="white"
                      />
                    </svg>
                  )}
                </button>
                <button onClick={toggleFullScreen} className="pause__div">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
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
              <div className="timeline-tools-right">
                <button
                  className="lv-btn lv-btn-text lv-btn-size-default lv-btn-shape-square right-icon "
                  type="button"
                  onClick={handleZoomOut}
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
                <div className="lv-slider-bar">
                  <div
                    ref={zoomSlider}
                    style={{
                      width: "8px",
                    }}
                    className="zoom__slider"
                  ></div>
                </div>
                <button
                  className="lv-btn lv-btn-text lv-btn-size-default lv-btn-shape-square right-icon "
                  type="button"
                  onClick={handleZoomIn}
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
              <div className="svgs__div">
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
              </div>
              <div className="canvas__div">
                <canvas // Ancho del canvas
                  width="1500%"
                  height="131%" // Altura del canvas
                  className="main__canvas"
                  onClick={handleTimelineClick}
                  ref={canvasRef1}
                ></canvas>
                <div
                  className="video__schedule"
                  style={{ position: "relative", cursor: "pointer" }}
                >
                  <canvas
                    width="150%"
                    height="66%"
                    style={{
                      position: "relative",
                      cursor: "pointer",
                      borderRadius: "8px",
                      background: "#163A7D",
                    }}
                    onClick={handleTimelineClick}
                    ref={canvasRef2}
                  ></canvas>
                </div>
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
        </div>
      </div>
    </main>
  );
}

export default page;
