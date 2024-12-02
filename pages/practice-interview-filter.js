import Head from "next/head";
import styles from "@/styles/Home.module.css";
import "@/styles/theme";
import {
  Heading,
  Box,
  CardBody,
  Text,
  Stack,
  Card,
  Link,
  Flex,
  Button,
} from "@chakra-ui/react";
import TopNav from "@/styles/components/TopNav";
import { SideNavBar } from "@/styles/components/SideNav";
import ProgressBar from "@/styles/components/ProgressBar";
import Footer from "@/styles/components/Footer";
import Popup from "@/styles/components/Popup.js";
import ViewAllPopup from "@/styles/components/ViewAllPopup"; // Import the new ViewAllPopup component
import { useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router"; // Import useRouter
import UploadFile from "@/styles/components/FileUpload";
import Layout from "@/styles/components/Layout";
import QuestionType from "@/styles/components/QuestionType";
import QuestionTime from "@/styles/components/QuestionTime";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import LoadingSpinner from "@/styles/components/LoadingSpinner";

// right now using drop down for question number and length of interview

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

  const handleNumberOfQuestionChange = (value) => {
    setSelectedNumber(value);
    console.log("Selected number of question", value);
  };

  const handleLengthOfPracticeChange = (value) => {
    setSelectedLength(value);
    console.log("Selected length of practice", value);
  };

  const handleQuestionTypeChange = (types) => {
    setSelectedQuestionType(types);
    console.log("Selected question types:", types);
  };

  useEffect(() => {
    console.log("Updated selectedQuestionType:", selectedQuestionType);
  }, [selectedQuestionType]);

  // get slected file url
  const getPublicURLs = async (selectedFiles) => {
    try {
      const selectedFileURLs = { resumes: [], jobPosts: [] };

      for (const type in selectedFiles) {
        const bucketName =
          type === "resumes" ? "onward-resume" : "onward-job-posting";
        const selectedFileArray = selectedFiles[type];

        for (const file of selectedFileArray) {
          const filePath = `uploads/${file.name}`;
          console.log(
            `Fetching public URL for file: ${filePath} in bucket: ${bucketName}`
          );

          const { data, error } = supabase.storage
            .from(bucketName)
            .getPublicUrl(filePath);

          if (error) {
            console.error(`Error fetching public URL for ${file.name}:`, error);
          } else if (data) {
            console.log(
              `Fetched public URL for ${file.name}: ${data.publicUrl}`
            );
            selectedFileURLs[type].push({
              name: file.name,
              url: data.publicUrl,
            });
          }
        }
      }

      console.log("Final Selected File URLs:", selectedFileURLs);

       // save the selected file URLs to localStorage
      localStorage.setItem("selectedFileURLs", JSON.stringify(selectedFileURLs));
      return selectedFileURLs;
    } catch (error) {
      console.error("Error fetching public URLs:", error);
    }
  };

  // fetch URLs when the component mounts
  useEffect(() => {
    const fetchURLs = async () => {
      try {
        // retrieve selected files from localStorage
        const storedFiles = JSON.parse(localStorage.getItem("selectedFiles"));
        console.log("Stored Files from Local Storage:", storedFiles);

        if (storedFiles) {
          const urls = await getPublicURLs(storedFiles);
          setFileURLs(urls);
          console.log("File URLs in State:", urls);
        } else {
          console.warn("No selected files found in localStorage.");
        }
      } catch (error) {
        console.error("Error during URL fetching in useEffect:", error);
      }
    };

    fetchURLs();
  }, []);

  // AI stuff

  // sending file to roughly functoin
  const UploadFiles = async (resumes, jobPosts) => {
    try {
      const uploadPromises = [];
  
      if (resumes.length > 0) {
        uploadPromises.push(
          fetch("/api/roughlyai", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              handlerType: "api_upload", 
              key: "Onward/Resumes/",
              upload_data: resumes.map((file) => file.url),
              fn: resumes.map((file) => file.name),
              api_key: process.env.NEXT_PUBLIC_ROUGHLY_API_KEY,
            }),
          })
        );
      }
  
      if (jobPosts.length > 0) {
        uploadPromises.push(
          fetch("/api/roughlyai", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              handlerType: "api_upload",
              key: "Onward/JobPosts/",
              upload_data: jobPosts.map((file) => file.url),
              fn: jobPosts.map((file) => file.name),
              api_key: process.env.NEXT_PUBLIC_ROUGHLY_API_KEY,
            }),
          })
        );
      }
  
      const responses = await Promise.all(uploadPromises);
  
      const pollingResults = await Promise.all(
        responses.map(async (resp) => {
          const { data: _url } = await resp.json();
          return await PollingResponse(_url);
        })
      );
  
      return pollingResults;
    } catch (error) {
      console.error("Error uploading files:", error);
      throw error;
    }
  };
  

  // prompt function
  const GenerateQuestions = async (
    jobPosts,
    resumes,
    selectedNumber,
    selectedQuestionType
  ) => {
    try {
      const formattedQuestionTypes = selectedQuestionType.length
        ? selectedQuestionType.join(", ")
        : "all types";
      
      const filteredCategories = selectedQuestionType.filter(
        (category) => category !== "Common Interview Questions"
      );

      const jobQuestionPrompt = `Generate a unique set of ${selectedNumber} interview questions strictly from these categories: ${selectedQuestionType.join(", ")}.
        If "Common Interview Questions" is selected, include exactly 1 "Common Interview Question" for every 5 questions, positioned at the start of the group. 
        If fewer than 5 questions are requested, include no more than 1 "Common Interview Question", positioned at the start of the group.  

        The remaining questions must be strictly and evenly distributed across the following categories: 
        ${filteredCategories.join(", ")} (excluding "Common Interview Questions"). 

        Each question must:
        1. Be relevant to the job posting and draw from specific skills or past experiences on the resume when possible.
        2. Align with its assigned category and not overlap with other categories.
        3. Avoid repeating or using overly similar phrasing from prior sets.

        Return the questions in valid JSON format, without any additional formatting or backticks. Each object should follow this structure:
        - question: The interview question.
        - category: Must be one of these - Behavioural Question, Situational Question, Technical Question, Competency Question, Cultural Question, 
          Career Goals Question, Legal/Regulation Question, or Common Interview Question.`;
  
      const response = await fetch("/api/roughlyai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          handlerType: "api_call", // Specify the handler type
          key: "Onward/JobPosts/",
          api_key: process.env.NEXT_PUBLIC_ROUGHLY_API_KEY,
          question: jobQuestionPrompt,
          numsimular: selectedNumber,
        }),
      });
  
  
      const { data } = await response.json();
      const jobPostQuestions = await PollingResponse(data);
  
      return { jobPostQuestions };
    } catch (error) {
      console.error("Error generating questions and talking points:", error);
      throw error;
    }
    console.error("Generate Questions Prompt:", jobPostQuestions);
  };
  

  // next & back buttons
  const handleStartClick = async () => {
    try {
      setLoading(true);
      const storedFiles = JSON.parse(localStorage.getItem("selectedFiles"));
      const urls = await getPublicURLs(storedFiles);
      setFileURLs(urls);
  
      const uploadProgress = await UploadFiles(urls.resumes, urls.jobPosts);
      console.log("Upload progress:", uploadProgress);
  
      const { jobPostQuestions } = await GenerateQuestions(
        urls.jobPosts,
        urls.resumes,
        selectedNumber,
        selectedQuestionType
      );
  
      console.log("Generated Questions:", jobPostQuestions);
  
      const parsedQuestions = JSON.parse(jobPostQuestions.answer); 
      console.log("Parsed Questions:", parsedQuestions);
  
      localStorage.setItem("questions", JSON.stringify(parsedQuestions));
      router.push("/practice-interview-questions");
    } catch (error) {
      console.error("Error in handleStartClick:", error);
    } finally {
      setLoading(false);
    }
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
              position="absolute"
              direction="column"
              top="0"
              left="0"
              width="100%"
              height="100%"
              bg="rgba(255, 255, 255, 0.8)"
              zIndex="10"
            >
              <LoadingSpinner />
              <Text>Generating your Questions...</Text>
            </Flex>
          )}
          <Flex
            // flexDirection={"column"}
            // height="100vh"
            // minH={{ base: "90vh", md: "100vh", xl: "78vh", "2xl":"85vh" }}
            // width={"100%"}
            // maxW={{ base: "100%", md: "1200px", lg: "1920px" }}
            // mx="auto"
            // flexGrow={1}
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

const PollingResponse = async (_url) => {
  const _response = await new Promise((resolve) => {
    const GetProgress = async (tries = 0) => {
      if (tries === 10) {
        console.log("too long");
        resolve(false);
      }
      const _progress = await fetch(_url);
      const _progJson = await _progress.json();
      console.log("progress in json", _progJson);
      if (_progJson.progress === 2) {
        resolve(_progJson);
      } else {
        //try again
        await setTimeout(() => GetProgress(tries + 1), 2000);
      }
    };

    GetProgress();
  });

  return _response;
};
