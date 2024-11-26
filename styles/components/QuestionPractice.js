"use client";
import {
  Box,
  Flex,
  Text,
  Card,
  CardBody,
  Stack,
  StackDivider,
  Heading,
  Button,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { ArrowCounterClockwise } from "@phosphor-icons/react";

export default function QuestionPractice({
  questions = [],
  questionTypes = [],
  question,
  borderTopRadius,
  borderBottomRadius,
  questionWidth,
}) {
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false); // Track if the audio is playing
  const [isMuted, setIsMuted] = useState(false); // Track if audio is muted
  const audioRef = useRef(null); // Store reference to the audio element for control

  // Fetch the question's audio URL from your API route
  useEffect(() => {
    if (question) {
      const fetchAudio = async () => {
        try {
          const response = await fetch("/api/textToSpeech", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              text: question.question || question,
              pitch: 1.5,
            }),
          });

          if (response.ok) {
            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob); // Create URL for audio playback
            setAudioUrl(audioUrl); // Store the audio URL
          } else {
            console.error("Error fetching audio:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching audio:", error);
        }
      };

      fetchAudio();
    }
  }, [question]);

  useEffect(() => {
    if (audioUrl && !isPlaying) {
      // If there was a previously playing audio, pause it before creating a new one
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false); // Reset the playing state before starting new audio
      }

      // Create a new Audio object and play it
      const newAudio = new Audio(audioUrl);
      audioRef.current = newAudio; // Store the new audio instance in the ref

      // Handle promise rejection from audio.play()
      newAudio.play().catch((err) => {
        console.error("Audio play failed:", err);
        setIsPlaying(false); // Ensure state is reset on error
      });

      setIsPlaying(true); // Set playing state to true

      // Cleanup function to reset the playing state when the audio ends
      newAudio.onended = () => {
        setIsPlaying(false);
      };

      // Cleanup to stop the audio if the component unmounts or the URL changes
      return () => {
        newAudio.pause();
        setIsPlaying(false);
      };
    }
  }, [audioUrl, isPlaying]); // Depend on audioUrl and isPlaying to control playback

  // Handle muting/unmuting audio
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Handle replaying the audio
  const replayAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset to the beginning of the audio
      audioRef.current.play().catch((err) => {
        console.error("Audio replay failed:", err);
      });
      setIsPlaying(true);
    }
  };

  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Card
        borderTopRadius={borderTopRadius}
        borderBottomRadius={borderBottomRadius}
        w={questionWidth}
        m={0}
        p={0}
      >
        <CardBody textAlign={"left"}>
          <Stack spacing="4" divider={<StackDivider />}>
            {/* Handle single question or multiple questions */}
            {question ? (
              <Box>
                <Heading size={{ base: "12pt", md: "16pt", "2xl": "18pt" }}>
                  {question.category || "General Question"}
                </Heading>
                <Text pt="2" fontSize="18pt">
                  {question.question || "No question text available"}
                </Text>
              </Box>
            ) : questions && questions.length > 0 ? (
              questions.map((q, index) => (
                <Box key={index}>
                  <Heading size="18pt">
                    {q.category || questionTypes[index] || "General Question"}
                  </Heading>
                  <Text pt="2" fontSize="18pt">
                    {q.question || q}{" "}
                    {/* Handles both string and object cases */}
                  </Text>
                </Box>
              ))
            ) : (
              <Text pt="2" fontSize="18pt">
                No questions available. Please try again.
              </Text>
            )}
          </Stack>

          {/* Buttons for muting and replaying the audio */}
          <Flex mt="4" justify="flex-end" gap="2">
            <Button
              onClick={toggleMute}
              bg={
                 "text" ? "brand.pureWhite" : "brand.oceanBlue"
              }
              color={
               "text" ? "brand.oceanBlue" : "brand.pureWhite"
              }
              fontSize="xs"
              borderColor="brand.oceanBlue"
              border="1px"
              _hover={{
                boxShadow:
                  "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
              }}
            >
              {isMuted ? "Unmute" : "Mute"}
            </Button>
            <Button onClick={replayAudio}
            bg={
                "text" ? "brand.oceanBlue" : "brand.pureWhite"
             }
             color={
              "text" ? "brand.pureWhite" : "brand.oceanBlue"
             }
             fontSize="xs"
             borderColor="brand.oceanBlue"
             border="1px"
             _hover={{
               boxShadow:
                 "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
             }}
            ><ArrowCounterClockwise size={20} /></Button>
          </Flex>
        </CardBody>
      </Card>
    </Flex>
  );
}
