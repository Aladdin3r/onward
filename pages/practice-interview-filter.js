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

  useEffect(() => {
    // Generate a session ID and save it in localStorage
    const sessionId = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
    localStorage.setItem("sessionId", sessionId);
    console.log("New Session ID generated:", sessionId);
  }, []);  

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

  // get selected file url
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
      const sessionId = localStorage.getItem("sessionId"); 
      if (!sessionId) {
        throw new Error("Session ID not found in localStorage.");
      }

      const uploadPromises = [];
  
      if (resumes.length > 0) {
        uploadPromises.push(
          fetch("/api/roughlyai", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              handlerType: "api_upload", 
              key: `Onward/${sessionId}`,
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
              key: `Onward/${sessionId}`,
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
      const sessionId = localStorage.getItem("sessionId"); 
      if (!sessionId) {
        throw new Error("Session ID not found in localStorage.");
      }

      const formattedQuestionTypes = selectedQuestionType.length
        ? selectedQuestionType.join(", ")
        : "all types";
      
      const filteredCategories = selectedQuestionType.filter(
        (category) => category !== "Common Interview Questions"
      );

      const jobQuestionPrompt = `
        Generate ${selectedNumber} unique interview questions from these categories: ${selectedQuestionType.join(", ")}.
        ### Rules:
          - Use details from the resume to craft questions about past experiences or skills when relevant.

        3. **Output:**
          - Return valid JSON with: [{"question":text, "category":"Behavioural, Situational, Technical, Competency, Cultural, Career Goals, Legal/Regulation, or Common Interview",}]
          - Do not include additional formatting and backticks`;
  
      const response = await fetch("/api/roughlyai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          handlerType: "api_call",
          key: `Onward/${sessionId}`,
          api_key: process.env.NEXT_PUBLIC_ROUGHLY_API_KEY,
          question: jobQuestionPrompt,
          numsimular: selectedNumber,
        }),
      });
  
  
      const { data } = await response.json();
      const jobPostQuestions = await PollingResponse(data);
      console.log("Generate Question Prompt:", jobPostQuestions);
  
      return { jobPostQuestions };
    } catch (error) {
      console.error("Error generating questions:", error);
      throw error;
    }
  };
  

  // next & back buttons
  const handleStartClick = async () => {
    try {
      setLoading(true);
      const sessionId = localStorage.getItem("sessionId"); 
      console.log("Session ID for this session:", sessionId);

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
