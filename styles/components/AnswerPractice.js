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

export default function AnswerPractice({ question, questions, onShowVideoChange, saveAnswer = () => {} }) {
    const router = useRouter();
    const [showVideo, setShowVideo] = useState(false); // Video response
    const [activeButton, setActiveButton] = useState('text'); // Default is text response
    const [isRecording, setIsRecording] = useState(false);
    const [editableTranscription, setEditableTranscription] = useState('');
    // const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [transcription, setTranscription] = useState('');
    const [savedVideoUrl, setSavedVideoUrl] = useState(null);
    const [defaultVoice, setDefaultVoice] = useState(null);
    const [loading, setLoading] = useState(false);
    const [answers, setAnswers] = useState({});


    useEffect(() => {
        // Initialize the default voice as "Google US English"
        const voicesList = speechSynthesis.getVoices();
        const googleUSVoice = voicesList.find(voice => voice.name === "Google US");
        if (googleUSVoice) {
            setDefaultVoice(googleUSVoice);
        }

        const sessionId = localStorage.getItem("sessionId");
    }, []);
    
    const uploadAnswerToSession = async (sessionId, questionId, file) => {
        try {
            const bucketName = "onward-responses"; // Replace with your Supabase bucket name
            const filePath = `uploads/${sessionId}/question-${questionId}.txt`; // Path for the uploaded file
    
            console.log(`Uploading to bucket: ${bucketName}, path: ${filePath}`);
    
            // Upload file to Supabase
            const { data, error } = await supabase.storage
                .from(bucketName)
                .upload(filePath, file, { upsert: true });
    
            if (error) {
                console.error("Error uploading file:", error.message);
                return null;
            }
    
            // Generate public URL for the uploaded file
            const { data: publicUrlData } = supabase.storage
                .from(bucketName)
                .getPublicUrl(filePath);
    
            console.log("File uploaded successfully. Public URL:", publicUrlData.publicUrl);
            return publicUrlData.publicUrl;
        } catch (err) {
            console.error("Upload failed:", err.message);
            return null;
        }
    };

    // const saveAnswer = (responseType, responseText, questionId, videoUrl = null) => {
    //     setAnswers((prevAnswers) => ({
    //         ...prevAnswers,
    //         [questionId]: {
    //             responseType,
    //             responseText,
    //             videoUrl,
    //         },
    //     }));
    // };    

    const UploadTranscription = async (transcriptionText, questionId, videoURL = null) => {
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
            saveAnswer(question.id, "text", updatedText); // Save typed response
        };
    
        // Handle transcription
        const handleTranscription = (transcribedText) => {
            setTranscription(transcribedText);
            saveAnswer(question.id, "voice", transcribedText); // Save transcribed response
        };
    
        
    

    // const handleAnalysisClick = async () => {
    //     const videoURL = savedVideoUrl;
    //     const transcriptionText = transcription;

    //     const transcriptionEntry = { text: transcriptionText, video_id: videoURL };
    //     const { error } = await supabase.from('transcriptions').insert(transcriptionEntry);

    //     if (error) throw error;

    //     const localResponses = JSON.parse(localStorage.getItem('responses')) || {};
    //     localResponses[question.id] = {
    //         response: editableTranscription || transcriptionText, 
    //         videoUrl: videoURL, 
    //     };
    //     localStorage.setItem('responses', JSON.stringify(localResponses));

    //     console.log('Responses saved to localStorage:', localResponses);

    //     if (currentQuestionIndex < questions.length - 1) {
    //         setCurrentQuestionIndex((prevIndex) => {
    //             const newIndex = prevIndex + 1;
    //             console.log("Next Question Index:", newIndex); 
    //             console.log("Next Question:", questions[newIndex]); 
    //             return newIndex;
    //         });
    //     }
    // };

    const handleNextQuestion = async () => {
        const sessionId = localStorage.getItem("sessionId"); // Get session ID from localStorage
        const questionId = question.id; // Get the current question ID
    
        // Prepare the answer content
        const responseText =
          activeButton === "text" ? editableTranscription : transcription;
        const videoUrl = savedVideoUrl;
    
        // Save the answer
        try {
            if (!responseText) {
                alert("Please provide a response before proceeding.");
                return;
            }
    
        const publicUrl = await uploadAnswerToSession(
            sessionId,
            questionId,
            responseText
        );
    
        console.log("Answer saved with URL:", publicUrl);
    
          // Navigate to the next question
        const currentIndex = questions.findIndex((q) => q.id === questionId);
            if (currentIndex < questions.length - 1) {
            const nextQuestion = questions[currentIndex + 1];
            router.push(`/practice-interview/${nextQuestion.id}`);
            } else {
            router.push("/practiceOverview"); // Navigate to overview when all questions are answered
            }
        } catch (error) {
            console.error("Error saving answer or navigating:", error);
        }
    };

    const handleAnalysisClick = async () => {
        const videoURL = savedVideoUrl;
        const transcriptionText = transcription;

        const transcriptionEntry = { text: transcriptionText, video_id: videoURL };
        const { error } = await supabase
        .from("transcriptions")
        .insert(transcriptionEntry);

        if (error) throw error;

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
          <QuestionPractice question={question} />
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
                        <Button
                            bg="brand.blushPink"
                            size="xs"
                            color="white"
                            py="1.5rem"
                            px="5rem"
                            boxShadow="md"
                            onClick={handleNextQuestion}
                            _hover={{
                                bg: 'white',
                                color: 'brand.blushPink',
                                border: '1px',
                                boxShadow: 'md',
                            }}
                        >
                            Next Question
                        </Button>
                    </Flex>
                )}
            </Flex>
        </>
    );
}
