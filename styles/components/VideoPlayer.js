// VideoPlayer component

import { Box, VStack } from "@chakra-ui/react";
import { useState } from "react";

const VideoPlayer = ({ videoSrc, thumbnail, duration, width }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Box width={width} mx="auto" p={4} borderRadius="lg" bg="white">
      <VStack align="start" spacing={2}>
        {/* Video Element with Custom Controls */}
        <Box position="relative" borderRadius="md" overflow="hidden">
          <video
            src={videoSrc}
            poster={
              thumbnail || "https://placehold.co/600x300?text=VideoPlayer"
            }
            controls
            width="100%"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        </Box>
        {/* Optional Duration Display */}
        {duration && (
          <Box>
            <span>{duration}</span>
          </Box>
        )}
      </VStack>
    </Box>
  );
};


export default VideoPlayer;
