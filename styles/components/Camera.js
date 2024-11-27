import { useState, useRef, useEffect } from "react";
import { useToast, Button, Box } from "@chakra-ui/react";
import { supabase } from "@/lib/supabaseClient";
import { StopCircle, PlayCircle } from "@phosphor-icons/react";

export default function RecordCamera({
  isRecordingAvailable,
  isRecordingEnabled = true,
  isSaveEnabled = true, // New prop
  setSavedVideoUrl,
}) {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [stream, setStream] = useState(null);
  const [audioContext, setAudioContext] = useState(null);
  const [gainNode, setGainNode] = useState(null);
  const toast = useToast();

  useEffect(() => {
    setIsCameraOn(true);
    startRecording();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      if (audioContext) {
        audioContext.close();
      }
    };
  }, []);

  useEffect(() => {
    if (isCameraOn && !stream) {
      startCamera();
    } else if (!isCameraOn && stream) {
      stopCamera();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isCameraOn, stream]);

  const startCamera = async () => {
    try {
      const constraints = {
        video: true,
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      };

      const newStream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = newStream;
      videoRef.current.muted = true;
      setStream(newStream);

      const newAudioContext = new (window.AudioContext || window.webkitAudioContext)();
      const audioTracks = newStream.getAudioTracks();
      if (audioTracks.length > 0) {
        const audioSource = newAudioContext.createMediaStreamSource(newStream);
        const newGainNode = newAudioContext.createGain();
        newGainNode.gain.setValueAtTime(1, newAudioContext.currentTime);
        audioSource.connect(newGainNode);
        newGainNode.connect(newAudioContext.destination);
        setAudioContext(newAudioContext);
        setGainNode(newGainNode);
      }
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraOn(false);
      setStream(null);
      if (audioContext) {
        audioContext.close();
      }
    }
  };

  const startRecording = () => {
    if (!isCameraOn) {
      return;
    }

    if (stream) {
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks((prev) => [...prev, event.data]);
        }
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);

      toast({
        title: "Recording Started",
        description: "Start the recording to view feedback.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      toast({
        title: "Recording Stopped",
        description: "Remember to save the video or you won't see it for feedback.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const saveRecordingToSupabase = async () => {
    const blob = new Blob(recordedChunks, { type: "video/webm" });
    const file = new File([blob], "recorded-video.webm", { type: "video/webm" });

    const { data, error } = await supabase.storage
      .from("onward-video")
      .upload(`videos/${Date.now()}-recorded-video.webm`, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Error uploading video:", error.message);
    } else {
      const { data: urlData, error: urlError } = await supabase
        .storage
        .from("onward-video")
        .getPublicUrl(data.path);

      if (urlError) {
        console.error("Error fetching public URL:", urlError.message);
      } else {
        setSavedVideoUrl(urlData.publicUrl);

        toast({
          title: "Recording Saved",
          description: "Your recording has been successfully saved.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
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

    <Box 
    display="flex"
    flexDirection="row"
    gap={3}
    justifyContent="center"
    alignItems="center"
    >
      {isRecordingAvailable && (
        <div style={{ marginTop: "1rem", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          {isRecording ? (
            <Box
              backgroundColor="#EA4A4D"
              borderRadius="full"
            >
              <Button
                onClick={stopRecording}
                variant="unstyled"
                color="white"
                aria-label="Stop Recording"
                width="100%"
                height="100%"
              >
                Stop
              </Button>
            </Box>
          ) : (
            <Box
              backgroundColor="#4CAF50"
              borderRadius="full"
            >
              <Button
                onClick={startRecording}
                variant="unstyled"
                color="white"
                aria-label="Start Recording"
                width="100%"
                height="100%"
                fontSize="xs"
              >
                Start
              </Button>
            </Box>
          )}
        </div>
      )}

      {isSaveEnabled && (
        <div style={{ marginTop: "1rem" }}>
          <Button
            onClick={saveRecordingToSupabase}
            bg="brand.pureWhite"
            size="xxs"
            p={2}
            border="2px"
            borderColor="green.500"
            fontSize="10pt"
            fontWeight="normal"
          >
            Save to get Feedback
          </Button>
        </div>
      )}
      </Box>
    </div>

  );
}
