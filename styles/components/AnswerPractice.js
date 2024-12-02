import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Flex,
  Text,
  Card,
  CardBody,
  Stack,
  StackDivider,
  Divider,
  Heading,
  Button,
  Textarea,
} from "@chakra-ui/react";
import QuestionPractice from "./QuestionPractice";
import RecordCamera from "./Camera";
import Transcriber from "./Transcriber";
import { supabase } from "@/lib/supabaseClient";

export default function AnswerPractice({ questions, onShowVideoChange }) {
    const router = useRouter();
    const [showVideo, setShowVideo] = useState(false); // Video response
    const [activeButton, setActiveButton] = useState('text'); // Default is text response
    const [isRecording, setIsRecording] = useState(false);
    const [editableTranscription, setEditableTranscription] = useState('');
    const [transcription, setTranscription] = useState('');
    const [savedVideoUrl, setSavedVideoUrl] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [answerAnalysis, setAnswerAnalysis] = useState([]);
    const [loading, setLoading] = useState(false); 


    const currentQuestion = questions[currentQuestionIndex];

    useEffect(() => {
        // Initialize the default voice as "Google US English"
        const voicesList = speechSynthesis.getVoices();
        const googleUSVoice = voicesList.find(voice => voice.name === "Google US");
        if (googleUSVoice) {
            setDefaultVoice(googleUSVoice);
        }
    }, []);

    const handleSaveAnswer = (responseText) => {
        setAnswers((prevAnswers) => {
            const updatedAnswers = [...prevAnswers];
            updatedAnswers[currentQuestionIndex] = {
                questionId: currentQuestionIndex + 1,
                question: currentQuestion?.question || "",
                response: responseText.trim(), 
            };
            return updatedAnswers;
        });
        console.log("Saved answer:", { questionId: currentQuestionIndex + 1, responseText });
    };
    

    // save answer array to supabase with session ID
    const saveAllAnswersToFile = async () => {
        try {
            const sessionId = localStorage.getItem("sessionId");
            if (!sessionId) {
                console.error("Session ID not found.");
                return;
            }
    
            const currentDate = new Date().toISOString().split("T")[0];
            const bucketName = "onward-responses";
            const fileName = `all-answers-${sessionId}.txt`;
            const filePath = `uploads/${currentDate}/${fileName}`;
    
            // Format answers as a text file (your existing format is perfect)
            const textContent = answers
                .map(
                    (answer) =>
                        `Question ${answer.questionId}:\n${answer.question}\n\nAnswer:\n${answer.response}\n`
                )
                .join("\n==========\n");
    
            const answersFile = new Blob([textContent], { type: "text/plain" });
    
            // Upload file to Supabase storage
            const { error: uploadError } = await supabase.storage
                .from(bucketName)
                .upload(filePath, answersFile, { upsert: true });
    
            if (uploadError) throw new Error(uploadError.message);
    
            console.log("All answers saved successfully to a single file.");
    
            // Fetch the public URL for the uploaded file
            const { data: publicUrlData, error: publicUrlError } = supabase.storage
                .from(bucketName)
                .getPublicUrl(filePath);
    
            if (publicUrlError) throw new Error(publicUrlError.message);
    
            const answersFileUrl = publicUrlData.publicUrl;
            console.log("Answers File Details:", { url: answersFileUrl, name: fileName });
    
            localStorage.setItem("answersPublicUrl", answersFileUrl);
    
            // Return the file URL and name
            return { url: answersFileUrl, name: fileName };
        } catch (err) {
            console.error("Error saving all answers:", err.message);
        }
    };    

    // Save analysis to Supabase
    const saveAnalysisToSupabase = async (analysis) => {
        try {
          // Construct the analysis entry
          const analysisEntry = {
            session_id: localStorage.getItem("sessionId"), 
            analysis_data: analysis, 
            created_at: new Date().toISOString(), 
          };
      
          // Insert the analysis into Supabase
          const { data, error } = await supabase.from("onward-analysis").insert([analysisEntry]);
      
          if (error) {
            throw new Error(`Failed to save analysis to Supabase: ${error.message}`);
          }
      
          console.log("Analysis saved to Supabase:", data);
        } catch (error) {
          console.error("Error saving analysis to Supabase:", error.message);
        }
      };
      
    
    // API stuff
    const UploadFiles = async (resumes, answers) => {
        try {
          const uploadPromises = [];
      
          // Upload resumes
          if (resumes.length > 0) {
            uploadPromises.push(
              fetch("/api/roughlyai", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
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
      
          // Upload answers
          if (answers.length > 0) {
            uploadPromises.push(
              fetch("/api/roughlyai", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  handlerType: "api_upload",
                  key: "Onward/Answers/",
                  upload_data: answers.map((file) => file.url),
                  fn: answers.map((file) => file.name),
                  api_key: process.env.NEXT_PUBLIC_ROUGHLY_API_KEY,
                }),
              })
            );
          }
      
          const responses = await Promise.all(uploadPromises);
      
          const pollingResults = await Promise.all(
            responses.map(async (resp) => {
              if (!resp.ok) {
                const errorDetails = await resp.text();
                throw new Error(`Upload failed with details: ${errorDetails}`);
              }
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
      
    // const UploadFiles = async (resumes, answers)=>{
    //     const _resp = await fetch("https://api.roughlyai.com/ttfiles/api/prompt_response", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json"
    //       },
    //       body: JSON.stringify({
    //         handler: "api_upload",
    //         key: "Onward/Analysis/",
    //         upload_data: [resumes.map((file) => file.url),
    //           answers.map((file) => file.url)],
    //         fn:[resumes.map((file) => file.name),
    //             answers.map((file) => file.name)],
    //         api_key: process.env.NEXT_PUBLIC_ROUGHLY_API_KEY
    //       })
    //     }) 
    //     const {data:_url} = await _resp.json();
    //     const prog = await PollingResponse(_url);
    //   }

    const GenerateAnalysis = async (answersUrl, resumeUrl) => {
        try {
          console.log("Sending API request with:", { answersUrl, resumeUrl });
      
          const analysisPrompt = `
            You are an AI interview coach helping immigrant nurses refine their answers. 
            Compare their answers to their resumes and provide actionable, clear, and constructive feedback.
            ### Focus Areas:
            - For each answer:
                1. Suggest professional language for casual terms (e.g., "help patients" → "facilitate patient care").
                2. Explain Canadian healthcare norms and highlight transferable skills.
                3. Encourage confidence and provide language support for English challenges.

            ### JSON Output:
            Generate an analysis array where each object corresponds to a question-answer pair. Each object must include the following fields:
                - **question**: The interview question.
                - **answer**: The user’s answer with:
                    - Filler words wrapped as <span color="brand.imperialRed;">word</span>.
                    - Power words bolded as <b>word</b>.
                - **expectation**: What the question is designed to assess (e.g., communication skills, problem-solving).
                - **overallFeedback**: Positive encouragement with tips for improvement.
                - **detailedFeedback**: A breakdown of key aspects, including:
                - **clarity**: Is the answer clear and concise?
                - **relevance**: Does the answer address the question and effectively utilize their past experience?
                - **effectiveness**: Is the answer impactful and compelling?
                - **grammarAndSyntax**: Are there any grammatical or syntactical issues?
                - **fillerAndPowerWords**: An object with:
                    - **fillerWords**: An array of filler words identified in the answer and total count.
                    - **powerWords**: An array of power words identified in the answer and total count.
                - **languageRefinement**: Suggestions for improving phrasing and vocabulary.
                - **starMethod**: Feedback on structuring answers using the STAR method, guide on what's missing (Situation, Task, Action, Result).
                - **whatWorkedWell**: Positive aspects of the answer.
                - **roomForImprovements**: Areas that need improvement.
                - **nextStepsToSuccess**: Actionable next steps for enhancing future answers.

                ### Constraints:
                - Use a conversational, encouraging, friendly and supportive tone.
                - Provide specific, actionable feedback tailored to immigrant nurses.
                - Return valid JSON only. Ensure the output is well-formed, with no additional formatting or backticks.
          `;
      
         
          const response = await fetch("/api/roughlyai", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              handlerType: "api_call", 
              key: "Onward/Analysis/",
              api_key: process.env.NEXT_PUBLIC_ROUGHLY_API_KEY, 
              question: analysisPrompt, 
              numsimular: answers.length, 
              upload_data: [
                { name: "Answers File", url: answersUrl },
                { name: "Resume File", url: resumeUrl },
              ], 
            }),
          });
      
          // Handle the response
          if (!response.ok) {
            throw new Error("Failed to generate analysis");
          }
      
          const { data } = await response.json();
          const analysisResult = await PollingResponse(data); 
          return { analysisResult };
        } catch (error) {
          console.error("Error generating analysis:", error);
          throw error;
        }
      };

    // button handlers
    const handleEndClick = () => {
        router.push({
            pathname: '/practice-interview'
        });
    };

    const handleNextClick = async () => {
        const responseText = activeButton === "text" ? editableTranscription : transcription;
    
        // Save the current answer
        handleSaveAnswer(responseText);
    
        if (currentQuestionIndex < questions.length - 1) {
            const nextIndex = currentQuestionIndex + 1;
            setCurrentQuestionIndex(nextIndex);
    
            // Update editable transcription and reset transcription state
            const nextAnswer = answers[nextIndex]?.response || "";
            setEditableTranscription(nextAnswer);
            if (activeButton === "text") {
                setTranscription("");
            }
        } else {
            console.log("All questions answered. Saving all answers...");
            await saveAllAnswersToFile();
            router.push("/practiceOverview");
        }
    };

    const handleVoiceClick = () => {
        setShowVideo(true);
        setActiveButton("voice");
        setIsRecording(!isRecording); // Toggle recording state
        onShowVideoChange(true);
    };

    const handleTextClick = () => {
        setShowVideo(false);
        setActiveButton("text");
        setEditableTranscription(transcription); // Switch to editable transcription
        onShowVideoChange(false);
    };

    // Handle typing
    const handleEditableChange = (event) => {
        const updatedText = event.target.value;
        setEditableTranscription(updatedText);
        handleSaveAnswer(updatedText); 
    };
    
    
    const handleTranscription = (transcribedText) => {
        setTranscription(transcribedText.trim()); 
        handleSaveAnswer(transcribedText.trim()); 
    };
    

    const handleAnalysisClick = async () => {
        try {
            setLoading(true); // Show loading spinner
    
            if (answers.length === 0) {
                console.error("No answers available.");
                alert("Please answer the questions before starting the analysis.");
                return;
            }
    
            // Save all answers to a text file
            const answersFile = await saveAllAnswersToFile();
            if (!answersFile) {
                throw new Error("Failed to save answers to a file.");
            }
            const answersUrl = answersFile.url;
            console.log("Answers file saved:", answersUrl);
    
            // Get resume files from localStorage
            const storedFiles = JSON.parse(localStorage.getItem("selectedFileURLs"));
            if (!storedFiles || !storedFiles.resumes || storedFiles.resumes.length === 0) {
                throw new Error("No resume files found in selected files.");
            }
            const resumes = storedFiles.resumes;
    
            // Upload resumes and answers
            console.log("Uploading resumes and answers...");
            const uploadProgress = await UploadFiles(resumes, [{ name: answersFile.name, url: answersUrl }]);
            console.log("Upload progress:", uploadProgress);
    
            // Generate analysis using the uploaded files
            console.log("Generating analysis...");
            const { analysisResult } = await GenerateAnalysis(answersUrl, resumes[0].url);
            console.log("Generated Analysis (Raw):", analysisResult);
    
            // Save analysis result to Supabase
            if (analysisResult) {
                await saveAnalysisToSupabase(analysisResult);
            }
    
            // Navigate to the practice overview page
            router.push("/practice-interview-analysis");
        } catch (error) {
            console.error("Error in handleAnalysisClick:", error.message);
            alert(`An error occurred during analysis: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };
    
  return (
    <>
        <Flex
            flexDirection="column"
            justifyContent="center"
        >
            <Flex flexDirection="row"
                gap="2rem"
                mx="auto"
                justifyContent="center"
                width="100%"
                maxWidth={showVideo ? "100%" : "60%"}
            >
                {/* Question and Answer Section */}
                <Box
                    width="100%"
                    maxW={showVideo ? "60%" : "100%"}
                    transition="width 0.5s ease"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                >
                    {/* Display Question */}
                    <QuestionPractice question={questions[currentQuestionIndex]}/>
                    <Flex
                        gap="1.1rem"
                        p="4"
                        bg="brand.pureWhite"
                        borderRadiusBottom={15}
                        boxShadow="md"
                        flexDirection="column"
                        divider={<StackDivider />}
                        width="100%"
                    >
                        <Heading size="18pt" textAlign="left">
                            Response Type:
                        </Heading>
                        <Divider orientation="horizontal" mb={4} />

                        {/* Response Type Buttons */}
                        <Flex flexDirection="row" gap="2rem">
                            <Button
                                width={isRecording ? "10rem%" : "7rem"}
                                onClick={handleVoiceClick}
                                bg={
                                activeButton === "voice"
                                    ? "brand.oceanBlue"
                                    : "brand.pureWhite"
                                }
                                color={
                                activeButton === "voice"
                                    ? "brand.pureWhite"
                                    : "brand.oceanBlue"
                                }
                                borderColor="brand.oceanBlue"
                                border="1px"
                                _hover={{
                                boxShadow:
                                    "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
                                }}
                            >
                                <Text fontSize="xxs">
                                {isRecording ? "Stop Recording" : "Voice"}
                                </Text>
                            </Button>
                            <Button
                                width="7rem"
                                onClick={handleTextClick}
                                bg={
                                activeButton === "text"
                                    ? "brand.oceanBlue"
                                    : "brand.pureWhite"
                                }
                                color={
                                activeButton === "text"
                                    ? "brand.pureWhite"
                                    : "brand.oceanBlue"
                                }
                                borderColor="brand.oceanBlue"
                                border="1px"
                                _hover={{
                                boxShadow:
                                    "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
                                }}
                            >
                                <Text fontSize="xxs">Text</Text>
                            </Button>
                            <Transcriber
                                isRecording={isRecording}
                                setTranscription={setTranscription}
                                setEditableTranscription={setEditableTranscription}
                            />
                        </Flex>
                    </Flex>

                    {/* Answer Section */}
                        <Box
                            p="4"
                            bg="brand.blueberryCreme"
                            boxShadow="md"
                            borderBottomRadius={15}
                            maxH="35rem"
                            width="100%"
                        >
                            <Card borderRadius="15" textAlign="left">
                                <CardBody>
                                    <Stack spacing="4" divider={<StackDivider />}>
                                        <Box>
                                            <Heading size="18pt">Your Response:</Heading>
                                        </Box>
                                        {/* Answer Box */}
                                        <Box overflowY="auto" height="10rem" w="100%">
                                            {activeButton === "text" ? (
                                            <Textarea
                                                value={editableTranscription}
                                                onChange={handleEditableChange}
                                                placeholder="Type your answer here..."
                                                size="sm"
                                                height="10rem"
                                                resize="vertical"
                                            />
                                            ) : (
                                            <Text pt="2" fontSize="14pt">
                                                {transcription}
                                            </Text>
                                            )}
                                        </Box>
                                    </Stack>
                                </CardBody>
                            </Card>
                        </Box>
                    </Box>

                    {/* Video Section */}
                    {showVideo && (
                        <Flex
                            flexDirection="column"
                            width="60%"
                            py="2rem"
                            boxShadow="md"
                            justifyContent="center"
                            alignItems="center"
                            borderRadius={15}
                        >
                            {/* <RecordCamera setSavedVideoUrl={setSavedVideoUrl} /> */}
                            <RecordCamera isRecordingAvailable={true} setSavedVideoUrl={setSavedVideoUrl} />
                        </Flex>
                    )}
                </Flex>
        
                {/* Buttons Container */}
                <Flex
                    justifyContent={"space-between"}
                    my={{base: "5rem", xl: "3rem", "2xl":"5rem"}}
                >
                    <Button bg={"white"} size="xs" color={"red"} py={"1.5rem"} px={"5rem"} boxShadow={"md"} borderColor={"red"} borderWidth={"1px"}
                        onClick={handleEndClick}
                        _hover={{
                            bg: "red",
                            color: "white",
                            boxShadow:"md"
                        }}
                    >
                        End
                    </Button>
                    {/* Conditionally show Start Analysis or Next Question */}
                    {currentQuestionIndex === questions.length - 1 ? (
                        <Button
                        bg="brand.blushPink"
                        size="xs"
                        color="white"
                        py="1.5rem"
                        px="5rem"
                        boxShadow="md"
                        onClick={handleAnalysisClick}
                        _hover={{
                            bg: "white",
                            color: "brand.blushPink",
                            border: "1px",
                            boxShadow: "md",
                        }}
                        >
                        Start Analysis
                        </Button>
                    ) : (
                        <Button
                        bg="brand.blushPink"
                        size="xs"
                        color="white"
                        py="1.5rem"
                        px="5rem"
                        boxShadow="md"
                        onClick={handleNextClick}
                        _hover={{
                            bg: "white",
                            color: "brand.blushPink",
                            border: "1px",
                            boxShadow: "md",
                        }}
                        >
                        Next Question
                        </Button>
                    )}
                </Flex>
            </Flex>
        </>
    );
}

const PollingResponse = async (_url) => {
    const _response = await new Promise((resolve) => {
      const GetProgress = async (tries = 0) => {
        if (tries === 20) {
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
  
