import { Box, VStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient"; // Assuming you have a supabase client setup

const VideoPlayer = ({ width, height }) => {
  const [videoSrc, setVideoSrc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestVideo = async () => {
      try {
        setLoading(true);
        // Fetch list of videos in the onward-video/videos folder
        const { data, error: fetchError } = await supabase.storage
          .from("onward-video")
          .list("videos", {
            limit: 1,
            sortBy: { column: "created_at", order: "desc" },
          });

        if (fetchError) {
          setError(fetchError.message);
          console.error("Error fetching video list:", fetchError);
          setLoading(false);
          return;
        }

        if (data.length > 0) {
          // Construct the full URL of the latest video
          const latestVideo = data[0].name;
          const videoUrl = `https://jndgvlobhprynoeqxvhn.supabase.co/storage/v1/object/public/onward-video/videos/${latestVideo}`;
          setVideoSrc(videoUrl);
        } else {
          setError("No videos found.");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching video:", error.message);
        setError("Error fetching video.");
        setLoading(false);
      }
    };

    fetchLatestVideo();
  }, []);

  return (
    <Box width={width} height={height} mx="auto" p={4} borderRadius="lg" bg="white">
      <VStack align="start" spacing={2}>
        {/* Video Element with Custom Controls */}
        <Box position="relative" borderRadius="md" overflow="hidden">
          <video
            src={videoSrc} // Use videoSrc as the full URL
            controls
            width="100%" // Set the video width to 100% of the container
            height="100%" // Set the video height to 100% of the container
            style={{ objectFit: "contain" }} // Scale the video to fit inside the container
          />
        </Box>
      </VStack>
    </Box>
  );
};

export default VideoPlayer;
