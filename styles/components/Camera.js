import { useState, useRef, useEffect } from "react";
import { Microphone, MicrophoneSlash, VideoCamera, VideoCameraSlash } from "@phosphor-icons/react";
import { useToast } from "@chakra-ui/react"; // Import useToast from Chakra UI
import { supabase } from "@/lib/supabaseClient"; // Import Supabase client

export default function RecordCamera({ isRecordingEnabled = true, setSavedVideoUrl }) {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [stream, setStream] = useState(null);
  const [audioContext, setAudioContext] = useState(null);
  const [gainNode, setGainNode] = useState(null);
  const toast = useToast(); // Initialize toast

  useEffect(() => {
    // Start or stop the camera when the isCameraOn state changes
    if (isCameraOn && !stream) {
      startCamera();
    } else if (!isCameraOn && stream) {
      stopCamera();
    }

    // Cleanup function to stop the camera stream when the component is unmounted or camera is turned off
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isCameraOn, stream]);

  const startCamera = async () => {
    try {
      const constraints = {
        video: true,  // Enable video
        audio: {
          echoCancellation: true, // Prevent echo
          noiseSuppression: true,  // Reduce background noise
          autoGainControl: true,   // Control volume fluctuations
        },
      };

      const newStream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = newStream;
      setStream(newStream);

      // Create audio context and gain node to manage audio volume
      const newAudioContext = new (window.AudioContext || window.webkitAudioContext)();
      const audioTracks = newStream.getAudioTracks();
      if (audioTracks.length > 0) {
        const audioSource = newAudioContext.createMediaStreamSource(newStream);
        const newGainNode = newAudioContext.createGain();
        newGainNode.gain.setValueAtTime(0, newAudioContext.currentTime); // Mute the microphone initially
        audioSource.connect(newGainNode);
        newGainNode.connect(newAudioContext.destination);
        setAudioContext(newAudioContext);
        setGainNode(newGainNode);
      }

      // Log to check available tracks
      newStream.getTracks().forEach(track => {
        console.log(track.kind, track.label); // Log video and audio tracks
      });
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
        audioContext.close(); // Cleanup audio context
      }
    }
  };

  const startRecording = () => {
    if (!isCameraOn) {
      // Show toast when trying to start recording without the camera on
      toast({
        title: "Camera Off",
        description: "To record, turn the camera on.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return; // Prevent recording if camera is off
    }

    if (stream) {
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          console.log("Recording data available:", event.data);
          setRecordedChunks((prev) => [...prev, event.data]);
        }
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const saveRecordingLocally = () => {
    const blob = new Blob(recordedChunks, { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "recorded-video.webm"; // Save to the local machine
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
  };

  const saveRecordingToSupabase = async () => {
    const blob = new Blob(recordedChunks, { type: "video/webm" });
    const file = new File([blob], "recorded-video.webm", { type: "video/webm" });
  
    // Upload the file to Supabase
    const { data, error } = await supabase
      .storage
      .from("onward-video") // Ensure correct bucket name
      .upload(`videos/${Date.now()}-recorded-video.webm`, file, {
        cacheControl: "3600",
        upsert: false,
      });
  
    if (error) {
      console.error("Error uploading video:", error.message);
    } else {
      // Fetch the public URL of the uploaded video
      const { data: urlData, error: urlError } = await supabase
        .storage
        .from("onward-video")
        .getPublicUrl(data.path);
  
      if (urlError) {
        console.error("Error fetching public URL:", urlError.message);
      } else {
        // Fetch the latest transcription data from the 'transcriptions' table
        const { data: transcriptionData, error: transcriptionError } = await supabase
          .from('transcriptions')
          .select('id, text, video_id')
          .order('created_at', { ascending: false })
          .limit(1)  // Fetch the latest transcription
          .single();
  
        if (transcriptionError) {
          console.error("Error fetching transcription data:", transcriptionError.message);
        } else {
          // Update the transcription row with the video URL
          const { error: updateError } = await supabase
            .from('transcriptions')
            .update({
              video_id: urlData.publicUrl,  // Save the video URL to the transcription row
            })
            .eq('id', transcriptionData.id);  // Match the correct transcription row by ID
  
          if (updateError) {
            console.error("Error updating transcription data with video URL:", updateError.message);
          } else {
            console.log("Video URL saved successfully to the transcription table");
            setSavedVideoUrl(urlData.publicUrl); // Pass the URL to the parent component
          }
        }
      }
    }
  };
  

  
  const toggleMic = async () => {
    setIsMicOn((prev) => !prev);

    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled; // Enable/Disable audio
      }

      // Adjust the gain to unmute or mute the microphone
      if (gainNode) {
        if (isMicOn) {
          gainNode.gain.setValueAtTime(0, audioContext.currentTime); // Mute the mic
        } else {
          gainNode.gain.setValueAtTime(1, audioContext.currentTime); // Unmute the mic
        }
      }
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "2em", width: "100%", maxWidth: "100%", backgroundColor: "white"}}>
      <div
        style={{
          position: "relative",
          width: "80%",
          maxWidth: "1000px",
          height: "calc(100vw * 9 / 16)",
          maxHeight: "400px",
          margin: "0 auto",
          backgroundColor: "white",
          overflow: "hidden",
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted={!isMicOn} // Muting the video if mic is off
          style={{
            width: "100%",
            height: "100%",
            transform: "scaleX(-1)", // Flip the video horizontally
            display: isCameraOn ? "block" : "none",
          }}
        />
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

      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px", zIndex: 100 }}>
        <button onClick={() => setIsCameraOn((prev) => !prev)}>
          {isCameraOn ? <VideoCamera size={32} /> : <VideoCameraSlash size={32} />}
        </button>
        <button onClick={toggleMic}>
          {isMicOn ? <Microphone size={32} /> : <MicrophoneSlash size={32} />}
        </button>
        {isRecordingEnabled && (isRecording ? (
          <button onClick={stopRecording}>Stop Recording</button>
        ) : (
          <button onClick={startRecording}>Start Recording</button>
        ))}
      </div>

      {recordedChunks.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <button onClick={saveRecordingLocally}>Save to Computer</button>
          <button onClick={saveRecordingToSupabase} style={{ marginLeft: "10px" }}>
            Save to Browser
          </button>
        </div>
      )}
    </div>
  );
}

