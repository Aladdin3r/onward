import { Box, Text, VStack, Divider, HStack } from "@chakra-ui/react";
import HighlightFillerWords from "@/styles/components/HighlightFillerWords";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function TranscriptionComponent() {
  const [transcript, setTranscript] = useState(null);
  const [videoSrc, setVideoSrc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching the most recent transcription
        const { data: transcriptData, error: transcriptError } = await supabase
          .from("transcriptions")
          .select("text, video_id")
          .order("created_at", { ascending: false })
          .limit(1);

        if (transcriptError) {
          console.error("Error fetching transcription:", transcriptError);
          throw transcriptError;
        }

        if (transcriptData && transcriptData.length > 0) {
          setTranscript(transcriptData[0].text);
          const videoUrl = transcriptData[0].video_id; // Directly use video_id as the URL

          if (!videoUrl) {
            console.error("No video_id in transcription data.");
            setError("No video URL found in transcription data.");
            return;
          }

          console.log("Fetched video URL: ", videoUrl); // Debugging statement

          setVideoSrc(videoUrl); // Set videoSrc with the full URL from the database

          // Set loading to false after data is fetched
          setLoading(false);
        } else {
          setTranscript("No transcript available.");
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setError("Error fetching transcript.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box mt={0} width="100%">
      <Text
        fontWeight="semibold"
        fontSize="20px"
        mb={0}
        ml={1}
        zIndex={1}
        position="relative"
      >
        Full Transcription
      </Text>
      <Box
        mt={2}
        border="1px"
        borderColor="#E6EAF2"
        borderRadius="15"
        boxShadow="md"
      >
        <Box p={4} bg="white" borderRadius="15">
          <VStack spacing={4} align="stretch">
            <HStack spacing={4} align="flex-start" display="flex">
              {/* <Text fontWeight="bold" color="purple.500" minW="120px">
                You
              </Text > */}
              <Box 
              display="flex"
              flex="1"
              overflow="auto"
              wordWrap="break-word"
              whiteSpace="pre-wrap"
              height="auto"
              >
                {transcript ? (
                  <HighlightFillerWords answer={transcript} />
                ) : (
                  <Text fontSize="xxs" color="brand.nightBlack" display="flex" flexWrap="wrap" height="auto">
                    Loading transcript...
                  </Text>
                )}
              </Box>
            </HStack>

            <Divider />
          </VStack>
        </Box>
      </Box>
    </Box>
  );
}
