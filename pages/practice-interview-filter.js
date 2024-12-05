import Head from "next/head";
import styles from "@/styles/Home.module.css";
import "@/styles/theme";
import {
  Text,
  Flex,
  Button,
} from "@chakra-ui/react";
import ProgressBar from "@/styles/components/ProgressBar";
import { useRouter } from "next/router"; // Import useRouter
import UploadFile from "@/styles/components/FileUpload";
import Layout from "@/styles/components/Layout";
import QuestionType from "@/styles/components/QuestionType";
import QuestionTime from "@/styles/components/QuestionTime";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import LoadingSpinner from "@/styles/components/LoadingSpinner";

export default function PracticeInterviewFilter() {
  const router = useRouter();
  const [selectedFiles, setSelectedFiles] = useState({
    resumes: [],
    jobPosts: [],
  });
  const [fileURLs, setFileURLs] = useState({ resumes: [], jobPosts: [] });
  const [selectedNumber, setSelectedNumber] = useState(5); // default to 5
  const [selectedLength, setSelectedLength] = useState(10); // default to 10
  const [selectedQuestionType, setSelectedQuestionType] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);

  // Loading messages for the loading screen
  const loadingMessages = [
    "Analyzing the job posting requirements...",
    "Tailoring questions to match the job role...",
    "Generating personalized interview questions...",
  ];

  // Rotate loading screen text
  useEffect(() => {
    if (loading) {
      const intervalId = setInterval(() => {
        setLoadingTextIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
      }, 3000);

      return () => clearInterval(intervalId); // Cleanup interval on unmount
    }
  }, [loading]);

  // DEMO MODE 
  const demoQuestions = [
    {
      question: "Can you describe a situation where you had to prioritize multiple patient needs in a fast-paced environment? How did you manage it?",
      category: "Situational",
    },
    {
      question: "Tell me about a time when you had to collaborate with a multidisciplinary team to improve patient outcomes. What was your role and what was the result?",
      category: "Behavioral",
    },
  ];

  const handleLengthOfPracticeChange = (value) => {
    setSelectedNumber(value);
    console.log("Selected Timing:", value);
  };
  
  const handleNumberOfQuestionChange = (value) => {
    setSelectedNumber(value);
    console.log("Selected Number of Questions:", value);
  };
  
  const handleQuestionTypeChange = (types) => {
    setSelectedQuestionType(types);
    console.log("Selected Question Types:", types);
  };
  
  
  const handleStartClick = async () => {
    setLoading(true); // Set loading to true
  
    setTimeout(() => {
      // Store hardcoded questions in localStorage
      localStorage.setItem("questions", JSON.stringify(demoQuestions));
  
      // Navigate to the next page after loading
      router.push("/practice-interview-questions");
  
      // Stop loading AFTER navigation
      setLoading(false);
    }, 5500); // Simulate 3.5-second delay
  };
  
  

  const handleBackClick = () => {
    router.push({
      pathname: "/practice-interview",
    });
  };

  return (
    <>
      <Head>
        <title>Practice Interview — Onward</title>
        <meta
          name="description"
          content="Onward is an AI-powered personal interview coach designed to help nurses, particularly those new to the Canadian healthcare system, excel in job interviews."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <Layout showTopNav={true} pageTitle="Practice">
        <div className={styles.page} style={{ position: "relative" }}>
          {loading && (
            <Flex
              align="center"
              justify="center"
              position="fixed" 
              direction="column"
              top="0"
              left="0"
              width="100vw" 
              height="100vh"
              bg="rgba(255, 255, 255, 0.8)" 
              zIndex="9999" 
            >
              <LoadingSpinner />
              {loadingMessages[loadingTextIndex]}
            </Flex>
          )}

          <Flex
            flexDirection="column"
            height="86vh"
            width="100%"
          >
            <ProgressBar activeStep={1} />

            {/* section for the question time & type cards */}
            <Flex
              mt="3em"
              flexDirection={{ base: "column", xl: "row" }}
              justifyContent={"space-between"}
              gap={"5%"}
            >
              <QuestionTime
                selectedNumber={selectedNumber}
                onNumberChange={handleNumberOfQuestionChange}
                selectedLength={selectedLength}
                onLengthChange={handleLengthOfPracticeChange}
              />
              <QuestionType
                selectedQuestionType={selectedQuestionType}
                setSelectedQuestionType={handleQuestionTypeChange}
              />
            </Flex>
            {/* bottom buttons */}
            <Flex
              flexDirection="row"
              justifyContent="space-between"
              mt="auto"
              mb="20px"
            >
              <Button
                bg={"brand.blushPink"}
                color={"white"}
                py={"1.5rem"}
                px={"5rem"}
                size="xs"
                width={{ base: "1rem", "2xl": "10rem" }}
                height={{ base: "2rem", "2xl": "2.5rem" }}
                // <Button bg={"brand.blushPink"} color={"white"} py={"1.5rem"} px={"4rem"} size={{ base: "xxs", "2xl":"sm"}} width={{ base: "1rem", "2xl":"10rem"}} height={{ base: "2rem", "2xl":"2.5rem"}}
                onClick={handleBackClick}
                _hover={{
                  bg: "white",
                  color: "brand.blushPink",
                  border: "1px",
                  boxShadow: "md",
                }}
              >
                Back
              </Button>
              <Button
                bg={"brand.blushPink"}
                color={"white"}
                py={"1.5rem"}
                px={"5rem"}
                size="xs"
                width={{ base: "8rem", "2xl": "17rem" }}
                height={{ base: "2rem", "2xl": "2.5rem" }}
                // width={{ base: "8rem", "2xl":"17rem"}}
                // height={{ base: "2rem", "2xl":"2.5rem"}}
                // <Button bg={"brand.blushPink"} color={"white"} py={"1.5rem"} px={"8rem"} size={{ base: "xxs", "2xl":"sm"}} width={{ base: "8rem", "2xl":"17rem"}} height={{ base: "2rem", "2xl":"2.5rem"}}
                onClick={handleStartClick}
                _hover={{
                  bg: "white",
                  color: "brand.blushPink",
                  border: "1px",
                  boxShadow: "md",
                }}
              >
                Start Practice
              </Button>
            </Flex>
          </Flex>
        </div>
      </Layout>
    </>
  );
}

