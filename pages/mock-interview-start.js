import Head from "next/head";
import styles from "@/styles/Home.module.css";
import "@/styles/theme";
import { Box, Flex, Text, Button, Center } from "@chakra-ui/react";
import RecordCamera from "@/styles/components/Camera";
import { useRouter } from "next/router";
import Layout from "@/styles/components/LayoutSim";
import { useState, useEffect, useRef } from "react";
import nursingInterviewQuestions from "@/data/interviewQuestions";

export default function MockInterviewQuestionPage() {
  const router = useRouter();
  const { question: initialQuestion } = router.query;
  const [currentQuestion, setCurrentQuestion] = useState(initialQuestion);
  const audioRef = useRef(null);  // To control the audio playback

  useEffect(() => {
    if (!initialQuestion) {
      setCurrentQuestion(getRandomQuestion());
    }
  }, [initialQuestion]);

  const getRandomQuestion = () => {
    const randomCategory = nursingInterviewQuestions[Math.floor(Math.random() * nursingInterviewQuestions.length)];
    return randomCategory.questions[Math.floor(Math.random() * randomCategory.questions.length)];
  };

  const handleNextQuestion = () => {
    setCurrentQuestion(getRandomQuestion());
  };

  // Fetch and play audio for the question
  useEffect(() => {
    if (currentQuestion) {
      const fetchAudio = async () => {
        try {
          const response = await fetch("/api/textToSpeech", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              text: currentQuestion,  // Send the question text to the backend
              voice: "deepgram",  // Specify the Deepgram voice option (you can change it to a different voice if needed)
            }),
          });

          if (response.ok) {
            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob); // Create URL for audio playback
            if (audioRef.current) {
              audioRef.current.src = audioUrl; // Set the audio source
              audioRef.current.play(); // Automatically play the audio when it's ready
            }
          } else {
            console.error("Error fetching audio:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching audio:", error);
        }
      };

      fetchAudio();
    }
  }, [currentQuestion]);

  return (
    <>
      <Head>
        <title>Mock Interview — Onward</title>
        <meta
          name="description"
          content="Onward is an AI-powered personal interview coach designed to help nurses excel in job interviews."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout showTopNav={true} pageTitle="Mock Interview">
        <Box
          className={styles.page}
          bg="gray.50"
          minH="100vh"
          py={8}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          {/* Question Prompt */}
          <Center>
            <Box bg="white" mt={4} px={6} py={4} borderRadius="md" boxShadow="sm" width="70%">
              <Text fontSize="sm" fontWeight="semibold" textAlign="center">
                {currentQuestion || "Loading..."}
              </Text>
            </Box>
          </Center>

          {/* Video Player */}
          <Flex justify="center" mb={8} mt={20} position="relative" height="500px" width="100%">
            <RecordCamera isMicOn={true} isCameraOn={false} isRecordingAvailable={true} isRecordingEnabled={false} />
          </Flex>

          {/* Hidden Audio Player */}
          <audio ref={audioRef} style={{ display: "none" }} /> {/* This player will be hidden */}

          {/* Bottom Control Bar */}
          <Box width="100%" py={2} bg="white" boxShadow="md" position="fixed" bottom={0} zIndex="9999">
            <Flex justify="space-between" align="center" maxW="800px" mx="auto" px={4}>
              {/* End Button */}
              <Button
                colorScheme="red"
                size="sm"
                px={8}
                py={6}
                onClick={() => router.push("/")}
              >
                End
              </Button>

              {/* Next Question Button */}
              <Button
                bg="brand.blushPink"
                color="brand.frostWhite"
                size="sm"
                px={8}
                py={6}
                onClick={handleNextQuestion}
              >
                Next Question
              </Button>
            </Flex>
          </Box>
        </Box>
      </Layout>
    </>
  );
}
