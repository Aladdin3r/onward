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
import LoadingSpinner from "./LoadingSpinner";
import { Keyboard, Microphone, Keyboard as TextIcon } from "@phosphor-icons/react";

export default function AnswerPractice({ questions, onShowVideoChange }) {
    const router = useRouter();
    const [showVideo, setShowVideo] = useState(false); // Video response
    const [activeButton, setActiveButton] = useState('text'); // Default is text response
    const [isRecording, setIsRecording] = useState(false);
    const [editableTranscription, setEditableTranscription] = useState('');
    const [transcription, setTranscription] = useState('');
    const [transcriptionText, setTranscriptionText] = useState('')
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
        console.log("Answer saved locally:", responseText);
    };    
    
    // save answer array to supabase with session ID
    const saveAllAnswersToFile = async (updatedAnswers) => {
        if (!updatedAnswers || updatedAnswers.length === 0) {
            console.error("No answers to save.");
            return;
        }
    
        const textContent = updatedAnswers
            .map((answer) => {
                if (!answer || !answer.question || !answer.response) {
                    console.warn("Incomplete answer detected:", answer);
                    return "Incomplete answer detected.";
                }
                return `Question ${answer.questionId}:\n${answer.question}\n\nAnswer:\n${answer.response}\n`;
            })
            .join("\n==========\n");
    
        const answersFile = new Blob([textContent], { type: "text/plain" });
    
        try {
            const sessionId = localStorage.getItem("sessionId");
            if (!sessionId) {
                console.error("Session ID not found.");
                return;
            }
    
            const bucketName = "onward-responses";
            const fileName = `${sessionId}-answers.txt`;
            const filePath = `uploads/${sessionId}`;
    
            const { error: uploadError } = await supabase.storage
                .from(bucketName)
                .upload(filePath, answersFile, { upsert: true });
    
            if (uploadError) throw new Error(uploadError.message);
    
            const { data: publicUrlData, error: publicUrlError } = await supabase.storage
                .from(bucketName)
                .getPublicUrl(filePath);
    
            if (publicUrlError) throw new Error(publicUrlError.message);
    
            const answersFileUrl = publicUrlData.publicUrl;
            console.log("Answers File Details:", { url: answersFileUrl, name: fileName });
    
            return { url: answersFileUrl, name: fileName };
        } catch (err) {
            console.error("Error saving all answers:", err.message);
        }
    
        console.log("All answers saved successfully to a single file.");
    };    

    // Save analysis to Supabase
    const saveAnalysisToSupabase = async (analysis) => {
        try {
            const sessionId = localStorage.getItem("sessionId"); 
            if (!sessionId) {
              throw new Error("Session ID not found in localStorage.");
            }

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
            const sessionId = localStorage.getItem("sessionId"); 
            if (!sessionId) {
              throw new Error("Session ID not found in localStorage.");
            }
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
                    key: `Onward/${sessionId}`,
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
                    key: `Onward/${sessionId}`,
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

    const GenerateAnalysis = async (answersUrl, resumeUrl) => {
        try {
            console.log("Sending API request with:", { answersUrl, resumeUrl });

            const sessionId = localStorage.getItem("sessionId"); 
            if (!sessionId) {
                throw new Error("Session ID not found in localStorage.");
            }
      
            const analysisPrompt = `
            You are an AI interview coach specializing in helping immigrant nurses excel in interviews. 
            Analyze their answers, compare with their past experiences on their resume, 
            and provide insights and specific actionable, clear, and constructive feedback tailored to their needs.
            
            ### Focus Areas:
            For each answer:
            1. Suggest professional language to replace casual terms (e.g. "facilitate patient care" instead of "help patients").
            2. Use their resume to highlight transferable skills and align feedback with their professional experience.
            3. Provide suggestions to address English language challenges and boost confidence with encouraging feedback.
            
            ### JSON Output:
            Generate an analysis array for each question-answer pair. The structure must be strictly as follows:
            - "question" (string): The interview question.
            - "answer" (string): The user's response with:
                - Filler words (e.g., "um") wrapped in <span style="color: #EA4A4D;">word</span>.
                - Power words wrapped in <b>word</b>.
            - "expectation" (string): The skill or quality being assessed.
            - "overallFeedback" (string): High-level encouragement and tips for improvement.
            - "detailedFeedback" (object): A breakdown with the following fields:
                - "clarity" (string): Clarity feedback.
                - "relevance" (string): Relevance feedback.
                - "effectiveness" (string): Effectiveness feedback.
                - "grammarAndSyntax" (string): Grammar and syntax issues.
                - "fillerAndPowerWords" (object):
                    - "fillerWords" (array of strings): Filler words.
                    - "fillerWordsCount" (number): Count of filler words.
                    - "powerWords" (array of strings): Power words.
                    - "powerWordsCount" (number): Count of power words.
                - "languageRefinement" (string): Suggestions for improved phrasing.
                - "starMethod" (string): Feedback on STAR structure (Situation, Task, Action, Result).
            - "whatWorkedWell" (string): Positive aspects of the answer.
            - "roomForImprovements" (string): Areas needing improvement.
            - "nextStepsToSuccess" (string): Actionable steps for future answers.
            
            ### Constraints:
            1. Use conversational, friendly and encouraging language.
            2. Tailor feedback to align with the Canadian healthcare system.
            3. Return only valid JSON. Do not include any additional text, formatting, or \`\`\`\json in the response.
            `;        
    
          const response = await fetch("/api/roughlyai", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              handlerType: "api_call",
              key: `Onward/${sessionId}`,
              api_key: process.env.NEXT_PUBLIC_ROUGHLY_API_KEY, 
              question: analysisPrompt, 
              numsimular: 10
            }),
          });
      
          // Handle the response
          if (!response.ok) {
            throw new Error("Failed to generate analysis ${errorDetails}");
          }
      
          const { data } = await response.json();
          const answerAnalysis = await PollingResponse(data); 

          if (!answerAnalysis) {
            throw new Error("Polling failed or returned invalid data.");
        }

        console.log("Generated Analysis (Raw):", answerAnalysis);
        return { answerAnalysis };
          
        } catch (error) {
          console.error("Error generating analysis:", error);
          throw error;
        }
      };

    // button handlers
    const handleEndClick = () => {
        router.push({
            pathname: `/practice-interview`
        });
    };

    const handleNextClick = async () => {
        const responseText = activeButton === "text" ? editableTranscription : transcription;
    
        // Save the current answer in the answers array
        handleSaveAnswer(responseText);
    
        if (currentQuestionIndex < questions.length - 1) {
            const nextIndex = currentQuestionIndex + 1;
            setCurrentQuestionIndex(nextIndex);
            
            // Reset on next question
            setEditableTranscription("");
            setTranscription("");
        } else {
            console.log("All questions answered. Saving all answers...");
            await saveAllAnswersToFile();
            router.push("/practiceOverview");
        }
    };
      
    const handleVoiceClick = () => {
        setShowVideo(true);
        setActiveButton("voice");
        setIsRecording(!isRecording);
        onShowVideoChange(true);

        if (!isRecording) handleVoice();
    };

    const handleVoice = async () => {
        // simulate transcription and pass it to voice input
        try {
          console.log("Starting voice transcription...");
          const simulatedTranscription = "This is a transcription of the user's voice.";
          handleVoiceInput(simulatedTranscription); 
        } catch (error) {
          console.error("Error during transcription:", error);
        }
      };

      const handleVoiceInput = (transcribedText) => {
        setTranscriptionText(transcribedText);
        console.log("Captured transcription:", transcribedText);
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
    

    const handleAnalysisClick = async () => {
        try {
            setLoading(true); // Show loading spinner
    
            // Save the last question answer
            const responseText =
                activeButton === "text" ? editableTranscription : transcription;
    
            const updatedAnswers = [...answers];
            updatedAnswers[currentQuestionIndex] = {
                questionId: currentQuestionIndex + 1,
                question: currentQuestion?.question || "",
                response: responseText.trim(),
            };
            setAnswers(updatedAnswers);
    
            // Wait for the state to update or a reasonable delay
            let retries = 0;
            while (retries < 10) {
                await new Promise((resolve) => setTimeout(resolve, 100)); 
                if (answers === updatedAnswers) break; // Ensure the state matches
                retries++;
            }
    
            console.log("Final Answers Array:", updatedAnswers);
    
            // Save all answers to Supabase
            const answersFile = await saveAllAnswersToFile(updatedAnswers); 
            if (!answersFile) {
                throw new Error("Failed to save answers to a file.");
            }
            const answersUrl = answersFile.url;
            console.log("Answers file saved:", answersUrl);
    
            // Get resume files from localstorage
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
            const { answerAnalysis } = await GenerateAnalysis(answersUrl, resumes[0].url);
            console.log("Generated Analysis (Raw):", answerAnalysis);
    
            // Save analysis to localStorage
            const parsedAnalysis = JSON.parse(answerAnalysis.answer);
            console.log("Parsed Analysis:", parsedAnalysis);
    
            localStorage.setItem("answerAnalysis", JSON.stringify(parsedAnalysis));
    
            // Save analysis result to Supabase
            if (answerAnalysis) {
                await saveAnalysisToSupabase(answerAnalysis);
            }
    
            // Navigate to the practice analysis page
            router.push("/practice-analysis");
        } catch (error) {
            console.error("Error in handleAnalysisClick:", error.message);
            alert(`An error occurred during analysis: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };    
    
  return (
    <>
        {loading ? (
        <Flex
            align="center"
            justify="center"
            height="100vh"
            width="100vw"
            position="fixed"
            top="0"
            left="0"
            bg="rgba(255, 255, 255, 0.8)"
            zIndex="10"
            flexDirection="column"
        >
            <LoadingSpinner /> {/* Replace with your actual spinner component */}
            <Text>Analyzing Your Answers...</Text>
        </Flex>
        ) : (
        <Flex flexDirection="column" justifyContent="center">
            <Flex
            flexDirection="row"
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
                <QuestionPractice question={questions[currentQuestionIndex]} />
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
                <Divider orientation="horizontal" mb={1} />

                {/* Response Type Buttons */}
                <Flex flexDirection="row" gap="1.5rem">

                    {/* VOICE BUTTON  */}
                    <Button
                        width={isRecording ? "14rem" : "9rem"}
                        onClick={handleVoiceClick}
                        bg={activeButton === "voice" ? "brand.oceanBlue" : "brand.pureWhite"}
                        color={activeButton === "voice" ? "brand.pureWhite" : "brand.oceanBlue"}
                        borderColor="brand.oceanBlue"
                        border="1px"
                        _hover={{
                            boxShadow:
                                "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
                        }}
                        gap="8px" 
                    >
                        <Microphone size={21}/>
                        <Text fontSize="xxs">
                            {isRecording ? "Stop Recording" : "Voice"}
                        </Text>
                    </Button>

                    {/* TEXT Button */}
                    <Button
                    width="9rem"
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
                    gap="10px" 
                    >
                    <Keyboard size={24} /> {/* Microphone icon on the left */}
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
                            size="xs"
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
                bg="#ffffff"
                >
                <RecordCamera
                    isRecordingAvailable={true}
                    setSavedVideoUrl={setSavedVideoUrl}
                />
                </Flex>
            )}
            </Flex>

            {/* Buttons Container */}
            <Flex
            justifyContent={"space-between"}
            my={{ base: "5rem", xl: "3rem", "2xl": "5rem" }}
            >
            <Button
                bg={"white"}
                size="xs"
                color={"red"}
                py={"1.5rem"}
                px={"5rem"}
                boxShadow={"md"}
                borderColor={"red"}
                borderWidth={"1px"}
                onClick={handleEndClick}
                _hover={{
                bg: "red",
                color: "white",
                boxShadow: "md",
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
        )}
    </>
    );
}

const PollingResponse = async (_url) => {
    const _response = await new Promise((resolve) => {
      const GetProgress = async (tries = 0) => {
        if (tries >= 20) {
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