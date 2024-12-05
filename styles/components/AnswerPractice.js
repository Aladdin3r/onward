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
import LoadingSpinner from "./LoadingSpinner";

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

    const currentQuestion = questions[0]; // only display 1st


    useEffect(() => {
        // Initialize the default voice as "Google US English"
        const voicesList = speechSynthesis.getVoices();
        const googleUSVoice = voicesList.find(voice => voice.name === "Google US");
        if (googleUSVoice) {
            setDefaultVoice(googleUSVoice);
        }
    }, []);

    // useEffect(() => {
    //     const demoAnswers = [
    //         {
    //             questionId: 1,
    //             question: "What motivated you to pursue a career in nursing?",
    //             response: "I wanted to help people and make a meaningful impact on their lives.",
    //         },
    //     ];
    
    //     setAnswers(demoAnswers); // Store prepared answers for analysis
    // }, []);

    // const handleSaveAnswer = (responseText) => {
    //     setAnswers((prevAnswers) => {
    //         const updatedAnswers = [...prevAnswers];
    //         updatedAnswers[currentQuestionIndex] = {
    //             questionId: currentQuestionIndex + 1,
    //             question: currentQuestion?.question || "",
    //             response: responseText.trim(),
    //         };
    //         return updatedAnswers;
    //     });
    //     console.log("Answer saved locally:", responseText);
    // };    
    
    // // save answer array to supabase with session ID
    // const saveAllAnswersToFile = async (updatedAnswers) => {
    //     if (!updatedAnswers || updatedAnswers.length === 0) {
    //         console.error("No answers to save.");
    //         return;
    //     }
    
    //     const textContent = updatedAnswers
    //         .map((answer) => {
    //             if (!answer || !answer.question || !answer.response) {
    //                 console.warn("Incomplete answer detected:", answer);
    //                 return "Incomplete answer detected.";
    //             }
    //             return `Question ${answer.questionId}:\n${answer.question}\n\nAnswer:\n${answer.response}\n`;
    //         })
    //         .join("\n==========\n");
    
    //     const answersFile = new Blob([textContent], { type: "text/plain" });
    
    //     console.log("All answers saved successfully to a single file.");
    // };    


    // button handlers
    const handleEndClick = () => {
        router.push({
            pathname: `/practice-interview`
        });
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
    

    const handleAnalysisClick = () => {
        setLoading(true);
    
        // Simulate processing delay
        setTimeout(() => {
          const responseText =
            activeButton === "text" ? editableTranscription : transcription;
    
          // Save the response to localStorage
          const demoAnswers = [
            {
              questionId: 1,
              question: "What motivated you to pursue a career in nursing?",
              response: responseText.trim(),
            },
          ];
          localStorage.setItem("answerResponse", JSON.stringify(demoAnswers));
    
          // Navigate to the analysis page
          router.push("/practice-analysis");
        }, 5500); // 
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