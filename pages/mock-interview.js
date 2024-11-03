import Head from "next/head";
import styles from "@/styles/Home.module.css";
import "@/styles/theme";
import { Box, Flex, Text, Button, IconButton, Stack, Center } from "@chakra-ui/react";
import { Waveform, Microphone, VideoCamera } from "@phosphor-icons/react";
import VideoPlayer from "@/styles/components/VideoPlayer";
import { useRouter } from "next/router";
import nursingInterviewQuestions from "@/data/interviewQuestions";
import { useState, useEffect } from "react";
import Layout from "@/styles/components/Layout";

export default function MockInterviewQuestionPage() {
  const router = useRouter();
  const { question: initialQuestion } = router.query;
  const [currentQuestion, setCurrentQuestion] = useState(initialQuestion);

  useEffect(() => {
    if (!initialQuestion) {
      setCurrentQuestion(getRandomQuestion());
    }
  }, [initialQuestion]);

  const getRandomQuestion = () => {
    const randomCategory = nursingInterviewQuestions[Math.floor(Math.random() * nursingInterviewQuestions.length)];
    return randomCategory.questions[Math.floor(Math.random() * randomCategory.questions.length)];
  };


  const startInterview = () => {
    const randomCategory = nursingInterviewQuestions[Math.floor(Math.random() * nursingInterviewQuestions.length)];
    const randomQuestion = randomCategory.questions[Math.floor(Math.random() * randomCategory.questions.length)];

    router.push({
      pathname: "/mock-interview-start",
      query: { question: randomQuestion }
    });
  };

  return (
    <>
      <Head>
        <title>Mock Interview — Onward</title>
        <meta name="description" content="Onward is an AI-powered personal interview coach designed to help nurses excel in job interviews." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout showTopNav={true} pageTitle="Mock Interview">
        <Box className={styles.page} bg="gray.50" minH="100vh"  display="flex" flexDirection="row" gap={10} alignItems="center">

          {/* Video Player with Audio Overlay Icon */}
          <Flex justify="center" position="relative" width="80%">
            <VideoPlayer
              title="Interview Playback"
              thumbnail="/images/smiling-girl.png"
            />
            {/* Audio Overlay */}
            <Box position="absolute" top="4" left="430" bg="blackAlpha.700" p={2} borderRadius="md">
              <Waveform size={32} color="white" />
            </Box>
          </Flex>
              <Button
                bg="brand.blushPink"
                color="brand.frostWhite"
                size="sm"
                px={8}
                py={6}
                onClick={startInterview} // Starts a new interview with a random question
              >
                Start Interview
              </Button>

          
        </Box>
      </Layout>
    </>
  );
}
