import Head from "next/head";
import styles from "@/styles/Home.module.css";
import "@/styles/theme";
import { Box, Flex, Button, Text } from "@chakra-ui/react";
import { Waveform } from "@phosphor-icons/react";
import Record from "@/styles/components/Camera";
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
        <Flex className={styles.page} bg="gray.50" minH="100vh" align="center" justify="center" p={6} gap={6}>
          
          {/* Video Player with Button on the Right */}
          <Flex width="100%" maxW="1200px" gap={8} align="center">
            <Box position="relative" flex="1" maxW="70%">
              <Record />
              {/* Audio Overlay */}
              
            </Box>
            
            {/* Text and Button Stack */}
            <Flex direction="column" align="center" gap={2}>
              <Text fontSize="md" fontWeight="bold">Ready to Join?</Text>
              <Button
                bg="brand.blushPink"
                color="brand.frostWhite"
                size="sm"
                px={8}
                py={6}
                onClick={startInterview} // Keeps original button styling
              >
                Start Interview
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Layout>
    </>
  );
}
