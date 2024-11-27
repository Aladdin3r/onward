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
                questionId: currentQuestionIndex + 1, // 1-based index
                question: currentQuestion?.question || "",
                response: responseText,
            };
            return updatedAnswers;
        });
        console.log("Saved answer:", { questionId: currentQuestionIndex + 1, responseText });
    };    
    

    const saveAllAnswersToFile = async () => {
        try {
            const sessionId = localStorage.getItem("sessionId");
            if (!sessionId) {
                console.error("Session ID not found.");
                return;
            }
    
            const bucketName = "onward-responses";
            const filePath = `uploads/${sessionId}/all-answers.json`;
    
            const file = new Blob([JSON.stringify(answers, null, 2)], { type: "application/json" });
    
            const { error } = await supabase.storage
                .from(bucketName)
                .upload(filePath, file, { upsert: true });
    
            if (error) throw new Error(error.message);
    
            console.log("All answers saved successfully to a single file.");
        } catch (err) {
            console.error("Error saving all answers:", err.message);
        }
    };
    
    
    // API stuff
    const UploadFiles = async (resumes) => {
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

    const UploadResponses = async (transcriptionText, questionId, videoURL = null) => {
        try {
            const response = await fetch("https://api.roughlyai.com/ttfiles/api/prompt_response", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    handler: "api_upload",
                    key: "Onward/Transcriptions/",
                    upload_data: [transcriptionText],
                    fn: [`transcription_${questionId}.txt`],
                    video_url: videoURL,
                    question_id: questionId,
                    api_key: process.env.NEXT_PUBLIC_ROUGHLY_API_KEY,
                }),
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Transcription uploaded successfully:", data);

            return data;
        } catch (error) {
            console.error("Error uploading transcription:", error);
            throw error;
        }
    };
    
    // API prompts
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

    const 

    // button handlers
    const handleNextClick = async () => {
        const responseText = activeButton === "text" ? editableTranscription : transcription;
    
        // Save current answer
        handleSaveAnswer(responseText);
    
        if (currentQuestionIndex < questions.length - 1) {
            const nextIndex = currentQuestionIndex + 1;
            setCurrentQuestionIndex(nextIndex);
    
            // Update editable transcription for the next question
            const nextAnswer = answers[nextIndex]?.response || "";
            setEditableTranscription(nextAnswer);
        } else {
            console.log("All questions answered. Saving all answers...");
            await saveAllAnswersToFile(); // Save all answers to a single file
            router.push("/practiceOverview");
        }
    };
    
    const handlePrevClick = () => {
        if (currentQuestionIndex > 0) {
            const prevIndex = currentQuestionIndex - 1;
            setCurrentQuestionIndex(prevIndex);
    
            // Update editable transcription for the previous question
            const prevAnswer = answers[prevIndex]?.response || "";
            setEditableTranscription(prevAnswer);
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
        setTranscription(transcribedText);
    
        handleSaveAnswer(transcribedText);
    };
    

    const handleAnalysisClick = async () => {
        const videoURL = savedVideoUrl;
        const transcriptionText = transcription;

        const transcriptionEntry = { text: transcriptionText, video_id: videoURL };
        const { error } = await supabase
        .from("transcriptions")
        .insert(transcriptionEntry);

        if (error) throw error;

        await saveAllAnswersToFile();

        router.push({ pathname: "/practiceOverview" });
    };

  return (
    <>
        <Flex
            flexDirection="row"
            gap="2rem"
            mx="auto"
            justifyContent="center"
            alignItems="flex-start"
            width="100%"
            maxWidth={showVideo ? "100%" : "60%"}
        >
        
            {/* Question and Answer Section */}
            <Box
                width="100%"
                maxW={showVideo ? "60%" : "100%"}
                transition="width 0.3s ease"
                display="flex"
                flexDirection="column"
                alignItems="center"
            >
                {/* Display Question */}
                <QuestionPractice question={currentQuestion}/>
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
                                        placeholder="Type your answer here"
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
                    <RecordCamera setSavedVideoUrl={(url) => handleVideoSave(url)} />
                    <Button
                        bg="brand.blushPink"
                        size="xs"
                        color="white"
                        py="1.5rem"
                        px="5rem"
                        boxShadow="md"
                        onClick={handleAnalysisClick}
                        _hover={{
                            bg: 'white',
                            color: 'brand.blushPink',
                            border: '1px',
                            boxShadow: 'md',
                        }}
                    >
                        Start Analysis
                    </Button>
                    
                    {/* Navigation Buttons */}
                    <Button
                        onClick={handlePrevClick}
                        disabled={currentQuestionIndex === 0}
                        bg="brand.pureWhite"
                        border="1px"
                        borderColor="red"
                        _hover={{ bg: "red", color: "white" }}
                    >
                        Previous
                    </Button>
                    <Button
                        onClick={handleNextClick}
                        bg="brand.oceanBlue"
                        color="white"
                        _hover={{ bg: "blue.500" }}
                    >
                        {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
                    </Button>
                </Flex>
                    )}
            </Flex>
        </>
    );
}
