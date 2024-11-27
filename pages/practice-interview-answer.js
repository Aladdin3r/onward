import Head from "next/head";
import styles from "@/styles/Home.module.css";
import "@/styles/theme";
import { Heading, Box, CardBody, Text, Stack, Card, Link, Flex, Button } from "@chakra-ui/react";
import { useRouter } from 'next/router'; // Import useRouter
import { useState, useEffect } from "react";
import LayoutSim from "@/styles/components/LayoutSim";
import AnswerPractice from "@/styles/components/AnswerPractice";
import { supabase } from "@/lib/supabaseClient";

export default function PracticeAnswer() {
    const [showVideo, setShowVideo] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [fileURLs, setFileURLs] = useState({ resumes: [], jobPosts: [] });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    
    useEffect(() => {
        const storedQuestions = localStorage.getItem("questions");
        if (storedQuestions) {
            try {
                const parsedQuestions = JSON.parse(storedQuestions);
                setQuestions(parsedQuestions);
                console.log("First Question Index: 0"); // Log the first question index
                if (parsedQuestions.length > 0) {
                    console.log("First Question:", parsedQuestions[0]); // Log the first question content
                } else {
                    console.warn("Questions array is empty.");
                }
            } catch (error) {
                console.error("Error parsing questions from localStorage:", error);
            }
        }
    }, []);

    const UploadFiles = async (resumes, jobPosts) => {
        try {
          const uploadPromises = [];
    
          if (resumes.length > 0) {
            uploadPromises.push(
              fetch("https://api.roughlyai.com/ttfiles/api/prompt_response", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  handler: "api_upload",
                  key: "Onward/Resumes/",
                  upload_data: resumes.map((file) => file.url),
                  fn: resumes.map((file) => file.name),
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
      
    const GenerateTalkingPoints = async (resumes) => {
        try {
            const savedQuestions = JSON.parse(localStorage.getItem("questions"));

            if (!savedQuestions || savedQuestions.length === 0) {
                throw new Error("No questions found. Please refresh or generate questions before analyzing.");
            }

            const talkingPointsPrompt = `Generate an array of talking points that align resume to the job description in valid JSON format. 
            Include the following interview questions: ${JSON.stringify(savedQuestions)}. 
            Return only a JSON array. Avoid any additional text, formatting, or line breaks outside of the JSON array. 
            The JSON must be valid and parsable where each object follows this structure:
                - "talkingPoints": A talking point relevant to aligning resumes with the job description.
                - "category": Behavioral Question, Situational Question, Technical Question, etc.
                - "response": Leave this field as an empty string ("").
                - "video_id": Leave this field as an empty string ("").
                - "video_url": Leave this field as an empty string ("").
                Do not include \`\`\`json`;

            console.log("Talking Points Prompt:", talkingPointsPrompt);

            // Make API call
            const resumeResponse = await fetch("https://api.roughlyai.com/ttfiles/api/prompt_response", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    handler: "api_call",
                    key: "Onward/Resumes/",
                    api_key: process.env.NEXT_PUBLIC_ROUGHLY_API_KEY,
                    question: talkingPointsPrompt,
                    numsimular: 5, 
                }),
            });

            const resumeTalkingPoints = await PollingResponse(
                (
                    await resumeResponse.json()
                ).data
            );

            console.log("Parsed Talking Points:", resumeTalkingPoints);

            return { resumeTalkingPoints };
        } catch (error) {
            console.error("Error generating talking points:", error);
            throw error;
        }
    };

        // navigation buttons
    const handleNextClick = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prevIndex) => {
                const newIndex = prevIndex + 1;
                console.log("Next Question Index:", newIndex); 
                console.log("Next Question:", questions[newIndex]); 
                return newIndex;
            });
        }
    };

    const handlePrevClick = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prevIndex) => {
                const newIndex = prevIndex - 1;
                console.log("Previous Question Index:", newIndex); 
                console.log("Previous Question:", questions[newIndex]); 
                return newIndex;
            });
        }
    };
    

    const handleAnalysisClick = async () => {
        try {
            setLoading(true); // Show loading spinner
            const savedFileURLs = JSON.parse(localStorage.getItem("selectedFileURLs"));
            if (!savedFileURLs || !savedFileURLs.resumes || savedFileURLs.resumes.length === 0) {
                alert("No resume files found. Please upload a resume and try again.");
                return;
            }
            console.log("File URLs (resumes):", fileURLs.resumes);

            const uploadProgress = await UploadFiles(fileURLs.resumes);
            console.log("Upload progress:", uploadProgress);

            const { resumeTalkingPoints } = 
              await GenerateTalkingPoints(
                fileURLs.resumes,
            )
            
            localStorage.setItem("questions", JSON.stringify(resumeTalkingPoints));
            console.log("Parsed Talking Points:", resumeTalkingPoints);

            
            console.log("Generated Talking Points:", resumeTalkingPoints);
            router.push("/practiceOverview");
                } catch (error) {
                console.error("Error in handleAnalysisClick:", error);
                } finally {
                setLoading(false); // Hide loading spinner
                }
        };
    
    const handleEndClick = () => {
        router.push({
            pathname: '/practice-interview',
        });
    };

    return (
        <>
            <Head>
                <title>Practice Interview — Onward</title>
                <meta name="description" content="Onward is an AI-powered personal interview coach designed to help nurses, particularly those new to the Canadian healthcare system, excel in job interviews." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <LayoutSim>
                <Flex 
                    flexDirection="column"
                    height="86vh"
                    width="100%"
                >
                    {/* Answer cards */}
                    <Flex flexDirection={"row"} ml={"0rem"} mt={"3rem"}>
                        {questions.length > 0 ? (
                            <AnswerPractice
                                question={questions[currentQuestionIndex]}
                                onShowVideoChange={() => {}}
                            />
                        ) : (
                            <Text>No questions available. Please try again.</Text>
                        )}
                    </Flex>

                    {/* question navigation buttons */}
                    <Flex flexDirection="row" justify="space-between" mt="auto" px="4em" mb="20px">
                        <Button
                            bg="brand.pureWhite"
                            size="xxs"
                            p={2}
                            border="1px"
                            borderColor="red"
                            onClick={handlePrevClick}
                            _hover={{ bg: "brand.pureWhite", borderColor: "red" }}
                        >
                            Prev (for testing)
                        </Button>

                        <Button
                            bg="brand.pureWhite"
                            size="xxs"
                            p={2}
                            border="1px"
                            borderColor={currentQuestionIndex < questions.length - 1 ? "green" : "gray"}
                            onClick={handleNextClick}
                            disabled={currentQuestionIndex === questions.length - 1} // Disable on the last question
                            _hover={{ bg: "brand.pureWhite", borderColor: "green" }}
                        >
                            Next
                        </Button>
                    </Flex>

                    {/* Bottom Buttons */}
                    <Flex 
                        flexDirection={"row"} 
                        justify={"flex-end"} 
                        mt={"auto"} 
                        px="4em"
                        mb="20px"
                    >
                        <Button bg={"brand.pureWhite"} size="xxs" width={"6rem"} p={2} border={"1px"} borderColor={"red"}
                                onClick={handleEndClick}
                                _hover={{
                                    bg: "brand.pureWhite",
                                    color: "red",
                                    border:"1px",
                                    borderColor:"red"
                                }}>End</Button>

                        {/* {!showVideo && (
                            <Button bg={"brand.blushPink"} size="xs" color={"white"} py={"1.5rem"} px={"5rem"} boxShadow={"md"} 
                                onClick={handleAnalysisClick}
                                _hover={{
                                    bg: "white",
                                    color: "brand.blushPink",
                                    border: "1px",
                                    boxShadow:"md"
                                }}
                            > 
                               Start Analysis
                            </Button>
                        )} */}
                    </Flex>
                </Flex>
            </LayoutSim>
        </>
    );
}

    const PollingResponse = async (_url) => {
        const response = await new Promise((resolve) => {
            const GetProgress = async (tries = 0) => {
                if (tries === 10) {
                    console.error("Polling timed out.");
                    resolve(null);
                }

                const progressResponse = await fetch(_url);
                const progressJson = await progressResponse.json();

                console.log("Polling Progress:", progressJson);

                if (progressJson.progress === 2) {
                    resolve(progressJson);
                } else {
                    setTimeout(() => GetProgress(tries + 1), 2000);
                }
            };

            GetProgress();
        });

        return response;
    };
