import { useState, useRef, useEffect } from "react";
import { useToast, Button, Box } from "@chakra-ui/react";
import { supabase } from "@/lib/supabaseClient";


export default function RecordCamera({
  isRecordingAvailable,
  setSavedVideoUrl,
}) {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [stream, setStream] = useState(null);
  const toast = useToast();

  // Turn on the camera only once when the component mounts
  useEffect(() => {
    let active = true; // Track if the component is still mounted
    const initializeCamera = async () => {
      try {
        const newStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: {
            echoCancellation: false,
            noiseSuppression: false,
            autoGainControl: false,
          },
        });

        if (active) {
          videoRef.current.srcObject = newStream;
          videoRef.current.muted = true;
          setStream(newStream);
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
        toast({
          title: "Camera Error",
          description: "Unable to access the camera. Please check permissions.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    initializeCamera();

    return () => {
      active = false;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []); // Empty dependency array ensures this runs only once

  const startRecording = () => {
    const stream = videoRef.current.srcObject;  // Assuming you have a videoRef for the webcam stream

    // Initialize media recorder with the video stream
    mediaRecorderRef.current = new MediaRecorder(stream);
    
    const chunks = [];

    // Add ondataavailable event listener to capture video data in chunks
    mediaRecorderRef.current.ondataavailable = (event) => {
      chunks.push(event.data);
    };

    // Set up the onstop event handler to process the final video blob
    mediaRecorderRef.current.onstop = async () => {
      const videoBlob = new Blob(chunks, { type: "video/webm" });

      if (!videoBlob || videoBlob.size === 0) {
        console.error("No video data found");
        return;
      }

      // Log the video blob size for debugging
      console.log("Video Blob size:", videoBlob.size);

      // Call the function to save the video to Supabase
      await saveRecordingToSupabase(videoBlob);
    };

    // Start recording
    mediaRecorderRef.current.start();
    setIsRecording(true);  // Set the recording state to true
  };

  const stopRecording = async () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);  // Set the recording state to false
      toast({
        title: "Recording Stopped",
        description: "Your recording has been saved successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setStream(null);
    }
  };

  const saveRecordingToSupabase = async (videoBlob) => {
    try {
      // Check if videoBlob exists and is not empty
      if (!videoBlob || videoBlob.size === 0) {
        console.error("No recording data found");
        return;
      }

      const formData = new FormData();
      formData.append("file", videoBlob, "video.webm");

      const { data, error } = await supabase.storage
        .from("onward-video")  // Check your bucket name
        .upload(`videos/${Date.now()}.webm`, formData);

      if (error) {
        console.error("Error uploading video to Supabase:", error);
        return;
      }

      const publicURL = supabase.storage.from("videos").getPublicUrl(data.path).publicURL;
      setSavedVideoUrl(publicURL);
      console.log("Video uploaded successfully:", publicURL);
    } catch (error) {
      console.error("Error saving video to Supabase:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "2em", width: "100%", maxWidth: "100%", backgroundColor: "white" }}>
      <div
        style={{
          position: "relative",
          width: "80%",
          maxWidth: "1000px",
          height: "calc(100vw * 9 / 16)",
          maxHeight: "400px",
          margin: "auto",
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
            borderRadius: "10px",
            transform: "scaleX(-1)",
            
          }}
        />
      </div>

      {isRecordingAvailable && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt={4}
        >
          {/* <Button
            onClick={isRecording ? stopRecording : startRecording}
            colorScheme={isRecording ? "red" : "green"}
            size="lg"
          >
            {isRecording ? "Stop" : "Start"}
          </Button> */}
          <Button
            onClick={isRecording ? stopRecording : startRecording}
            padding="0" 
            border="none" 
            background="transparent" 
            _focus={{
              outline: "none", 
            }}
            style={{
              width: "auto", // Let the SVG size dictate the button size
              height: "auto", // Same for height
            }}
            _hover={{ // Default box-shadow
              transform: "scale(1.05)", // Default scale effect
              border: "none", // Remove default border  
              outline: "none"
            }}
            _active={{
              background: "transparent", // Remove active background
              transform: "none", // Prevent transformation on active state
            }}
            // colorScheme={isRecording ? "red" : "green"}
            // size="lg"
          >
            {isRecording ? (
              <img
              src="/images/stop.svg"
              style={{ width: "2em", height: "2em" }}
              />
            ) : (
              <img
              src="/images/start2.svg"
              style={{ width: "2em", height: "2em" }}
              />
            )}
          </Button>
        </Box>
      )}
    </div>
  );
}
