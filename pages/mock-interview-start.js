import Head from "next/head";
import styles from "@/styles/Home.module.css";
import "@/styles/theme";
import { Box, Flex, Text, Button, IconButton, Stack, Center } from "@chakra-ui/react";
import { Microphone, MicrophoneSlash, VideoCamera, VideoCameraSlash } from "@phosphor-icons/react";
import RecordCamera from "@/styles/components/Camera";
import { useRouter } from "next/router";
import Layout from "@/styles/components/LayoutSim";
import { useState, useEffect } from "react";
import nursingInterviewQuestions from "@/data/interviewQuestions";

export default function MockInterviewQuestionPage() {
  const router = useRouter();
  const { question: initialQuestion } = router.query;
  const [currentQuestion, setCurrentQuestion] = useState(initialQuestion);

  // State for microphone and camera
  const [isMicOn, setIsMicOn] = useState(true); // Default: mic on
  const [isCameraOn, setIsCameraOn] = useState(false); // Default: camera off


  useEffect(() => {
    if (!initialQuestion) {
      setCurrentQuestion(getRandomQuestion());
    }
  }, [initialQuestion]);


// HERE: YET TO IMPLEMENT SPOKEN QUESTIONS WITH REPEAT BUTTON + HIDE THE QUESTION FROM INTERVIEWEE'S VIEW!
  const getRandomQuestion = () => {
    const randomCategory = nursingInterviewQuestions[Math.floor(Math.random() * nursingInterviewQuestions.length)];
    return randomCategory.questions[Math.floor(Math.random() * randomCategory.questions.length)];
  };

  const handleNextQuestion = () => {
    setCurrentQuestion(getRandomQuestion());
  };

  // const toggleMic = () => {
  //   setIsMicOn((prev) => !prev);
  // };

  // const toggleCamera = () => {
  //   setIsCameraOn((prev) => !prev);
  // };

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
          {/* HERE: YET TO IMPLEMENT SPOKEN QUESTIONS WITH REPEAT BUTTON + HIDE THE QUESTION FROM INTERVIEWEE'S VIEW! */}
          <Center>
            <Box bg="white" mt={4} px={6} py={4} borderRadius="md" boxShadow="sm" width="70%">
              <Text fontSize="sm" fontWeight="semibold" textAlign="center">
                {currentQuestion || "Loading..."}
              </Text>
            </Box>
          </Center>

          {/* Video Player */}
          <Flex justify="center" mb={8} mt={20} position="relative" height="500px" width="100%">
            <RecordCamera isMicOn={isMicOn} isCameraOn={isCameraOn} isRecordingEnabled={false} />
          </Flex>

          {/* Bottom Control Bar */}
          <Box width="100%" py={2} bg="white" boxShadow="md" position="fixed" bottom={0} zIndex="9999" >
            <Flex justify="space-between" align="center" maxW="800px" mx="auto" px={4}>
              {/* End Button */}
              <Button colorScheme="red" size="sm" px={8} py={6} onClick={() => router.push('/')}>
                End
              </Button>

              {/* Mic and Video Icon Buttons */}
                {/* HERE: Noticed these are not made functional yet? Currently the Camera component's ones work, so hiding them out for now...*/}

              <Stack direction="row" spacing={10}>
                {/* Microphone Toggle Button */}
                {/* <IconButton
                  px={4}
                  py={8}
                  aria-label="Toggle Microphone"
                  icon={
                    isMicOn ? (
                      <Microphone size={35} color="black" weight="fill" />
                    ) : (
                      <MicrophoneSlash size={35} color="black" weight="fill" />
                    )
                  }
                  bg="white"
                  boxShadow="md"
                  borderRadius="full"
                  onClick={toggleMic} // Toggle mic
                /> */}

                {/* Camera Toggle Button */}
                {/* <IconButton
                  px={4}
                  py={8}
                  aria-label="Toggle Video"
                  icon={
                    isCameraOn ? (
                      <VideoCamera size={35} color="black" weight="fill" />
                    ) : (
                      <VideoCameraSlash size={35} color="black" weight="fill" />
                    )
                  }
                  bg="white"
                  boxShadow="md"
                  borderRadius="full"
                  onClick={() => setIsCameraOn((prev) => !prev)} // Toggle camera
                /> */}
              </Stack>

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
