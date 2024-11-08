import { useState, useRef } from "react";
import {
  Microphone,
  MicrophoneSlash,
  VideoCamera,
  VideoCameraSlash,
} from "@phosphor-icons/react";

export default function Record() {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [stream, setStream] = useState(null);

  const startCamera = async () => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: isMicOn,
      });

      // Set the new stream to videoRef
      videoRef.current.srcObject = newStream;
      setStream(newStream); // Save the stream for later use
      setIsCameraOn(true);
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      // Stop all tracks of the stream
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraOn(false);
      setStream(null);
    }
  };

  const startRecording = () => {
    if (stream) {
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks((prev) => [...prev, event.data]);
        }
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  const saveRecording = () => {
    const blob = new Blob(recordedChunks, { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "recorded-video.webm";
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    setRecordedChunks([]); // Clear the chunks for the next recording
  };

  const toggleMic = async () => {
    setIsMicOn((prev) => !prev);

    if (stream) {
      // Stop current audio track(s)
      stream.getTracks().forEach((track) => {
        if (track.kind === "audio") track.stop();
      });

      // Recreate the stream without the mic if it's off
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: isMicOn, // Will be false after toggling
      });

      // Update the video element with the new stream
      videoRef.current.srcObject = newStream;
      setStream(newStream); // Save the new stream for later use

      // Restart the media recorder with the new stream
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        setRecordedChunks([]);
        startRecording(); // Start recording with the updated stream
      }
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "2em", width: "100%", maxWidth: "600px" }}>
      {/* Container with fixed width, height, and padding */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "600px",
          height: "400px", // Fixed height to keep size consistent
          margin: "0 auto",
          backgroundColor: "#f0f0f0",
          overflow: "hidden",
        }}
      >
        {/* Video element */}
        <video
          ref={videoRef}
          autoPlay
          muted={!isMicOn}
          style={{
            width: "100%",
            height: "100%",
            transform: "scaleX(-1)",
            display: isCameraOn ? "block" : "none",
          }}
        />

        {/* Overlay when camera is off */}
        {!isCameraOn && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "grey",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "24px",
              fontWeight: "bold",
              zIndex: 1,
            }}
          >
            Camera Off
          </div>
        )}
      </div>

      {/* Controls */}
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px", zIndex: 100 }}>
        <button onClick={isCameraOn ? stopCamera : startCamera}>
          {isCameraOn ? <VideoCamera size={32} /> : <VideoCameraSlash size={32} />}
        </button>
        <button onClick={toggleMic}>
          {isMicOn ? <Microphone size={32} /> : <MicrophoneSlash size={32} />}
        </button>
        {isRecording ? (
          <button onClick={stopRecording}>Stop Recording</button>
        ) : (
          <button onClick={startRecording}>Start Recording</button>
        )}
      </div>

      {recordedChunks.length > 0 && (
        <button onClick={saveRecording} style={{ marginTop: "20px" }}>
          Save Recording
        </button>
      )}
    </div>
  );
}
