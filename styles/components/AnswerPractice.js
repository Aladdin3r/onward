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
    Textarea
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import VideoPlayer from './VideoPlayer';
import QuestionPractice from './QuestionPractice';
import { Stop, Record, Pause } from '@phosphor-icons/react';
import Transcriber from './Transcriber';
import RecordCamera from './Camera';
import { supabase } from '@/lib/supabaseClient';
import { createClient } from '@supabase/supabase-js';

export default function AnswerPractice({ onShowVideoChange, question }) {
    const router = useRouter();
    const [showVideo, setShowVideo] = useState(false); // default is text
    const [activeButton, setActiveButton] = useState('text');
    const [isRecording, setIsRecording] = useState(false); 
    const [editableTranscription, setEditableTranscription] = useState('');
    const [typedAnswer, setTypedAnswer] = useState('');
    const [transcription, setTranscription] = useState('');
    const [savedVideoUrl, setSavedVideoUrl] = useState(null); // Track saved video URL
    const [response, setResponse] = useState("");
    const [questions, setQuestions] = useState([]);
    
    useEffect(() => {
        const storedQuestions = localStorage.getItem("questions");
        if (storedQuestions) {
            try {
                const parsedQuestions = JSON.parse(storedQuestions);
    
                // add `answer` field to question array 
                const enrichedQuestions = parsedQuestions.map((question) => ({
                    ...question,
                    answer: question.answer || { transcription: "", video: "" }, 
                }));
    
                setQuestions(enrichedQuestions);
                localStorage.setItem("questions", JSON.stringify(enrichedQuestions));
            } catch (error) {
                console.error("Error parsing questions from localStorage:", error);
            }
        }
    }, []);

    const saveAnswer = (index, transcriptionText, videoURL) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].answer = { transcription: transcriptionText, video: videoURL }; // update the answer
        setQuestions(updatedQuestions);
        localStorage.setItem("questions", JSON.stringify(updatedQuestions)); // save to localStorage
        console.log(`Answer saved for question ${index + 1}:`, updatedQuestions[index].answer);
    };
    

    const handleVoiceClick = () => {
        setShowVideo(true);
        setActiveButton('voice');
        setIsRecording(!isRecording); // toggle recording state
        onShowVideoChange(true);
    };

    const handleTextClick = () => {
        setShowVideo(false);
        setActiveButton('text');
        setEditableTranscription(transcription); // to be able to edit transcription when switch to text
        onShowVideoChange(false);
    };

    const handleTextChange = (event) => {
        setTypedAnswer(event.target.value); // make answer box type-able when text is chosen
    };

    const handleEditableChange = (event) => {
        setEditableTranscription(event.target.value); // update editable transcription
    };
    
    const handleNextClick = () => {
        if (currentQuestionIndex < questions.length - 1) {
            saveAnswer(
                currentQuestionIndex,
                transcription, 
                savedVideoUrl  
            );
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1); // move to the next question
        }
    };
    return (
        <>
            <Flex 
                flexDirection="row" 
                gap="2rem" 
                mx="auto" 
                maxH={"80%"}
                justifyContent="center" 
                alignItems="flex-start" 
                width="100%"
                maxWidth={showVideo ? "100%" : "60%"} 
            >
                {/* question and answer section */}
                <Box 
                    width="100%"
                    maxW={showVideo ? '60%' : '100%'} 
                    transition="width 0.3s ease"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                >
                    {/* Display Current Question */}
                    <QuestionPractice question={question} />
                    <Flex 
                        gap="1.1rem" 
                        p="4" 
                        bg="brand.pureWhite" 
                        borderRadiusBottom={15} 
                        boxShadow="md" 
                        mb={0} 
                        position="relative" 
                        zIndex={1}
                        flexDirection="column"
                        divider={<StackDivider />}
                        width={"100%"}
                    >

                        {/* Response type area - voice or text button */}
                        <Heading size="18pt" textAlign="left">Response Type:</Heading>
                        <Divider orientation="horizontal" mb={4} />
                        
                        <Flex flexDirection="row" gap="2rem">
                            <Button 
                                width={isRecording ? "10rem%" : "7rem" }
                                onClick={handleVoiceClick}
                                bg={activeButton === 'voice' ? 'brand.oceanBlue' : 'brand.pureWhite'}
                                color={activeButton === 'voice' ? 'brand.pureWhite' : 'brand.oceanBlue'}
                                borderColor="brand.oceanBlue" 
                                border="1px" 
                                _hover={{ boxShadow: '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)' }}
                            >
                                <Text fontSize="xxs">
                                    {isRecording ? 'Stop Recording' : 'Voice'}
                                </Text>
                            </Button>
                            <Button 
                                width="7rem" 
                                onClick={handleTextClick}
                                bg={activeButton === 'text' ? 'brand.oceanBlue' : 'brand.pureWhite'}
                                color={activeButton === 'text' ? 'brand.pureWhite' : 'brand.oceanBlue'}
                                borderColor="brand.oceanBlue" 
                                border="1px" 
                                _hover={{ boxShadow: '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)' }}
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
                    
                    <Box
                        p="4"
                        bg="brand.blueberryCreme"
                        boxShadow="md"
                        mb={0}
                        position="relative"
                        zIndex={1}
                        borderBottomRadius={15}
                        maxH="35rem"
                        width="100%"
                    >
                        {/* Answer section */}
                        <Card borderRadius="15" textAlign="left">
                            <CardBody>
                                <Stack spacing="4" divider={<StackDivider />}>
                                    <Box>
                                        <Heading size="18pt" height="2rem">Your Response:</Heading>
                                    </Box>
                                    
                                    {/* Answer Box */}
                                    <Box overflowY="auto" height="10rem" w="100%">
                                        {activeButton === 'text' ? (
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
                
                {/* video Section */}
                {showVideo && (
                    <Flex 
                        flexDirection={"column"}
                        width="60%" 
                        py={"2rem"}
                        boxShadow="md" 
                        justifyContent={"center"}
                        alignItems={"center"}
                        borderRadius={15}
                    >
                        <RecordCamera setSavedVideoUrl={setSavedVideoUrl} />
                        {/* <Flex>
                            <Button><Record size={24} /></Button>
                            <Button><Stop size={24} /></Button>
                            <Button><Pause size={24} /></Button>
                        </Flex> */}
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
                    </Flex>
                )}
            </Flex>
        </>
    );
}
