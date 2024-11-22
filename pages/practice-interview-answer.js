import Head from "next/head";
import styles from "@/styles/Home.module.css";
import "@/styles/theme";
import { Heading, Box, CardBody, Text, Stack, Card, Link, Flex, Button, Textarea, Divider, StackDivider } from "@chakra-ui/react";
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import LayoutSim from "@/styles/components/LayoutSim";
import { supabase } from '@/lib/supabaseClient';

export default function PracticeAnswer() {
    const [showVideo, setShowVideo] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const router = useRouter();
    const [activeButton, setActiveButton] = useState('text');
    const [isRecording, setIsRecording] = useState(false);
    const [transcription, setTranscription] = useState('');
    const [editableTranscription, setEditableTranscription] = useState('');
    const [typedAnswer, setTypedAnswer] = useState('');
    const [savedVideoUrl, setSavedVideoUrl] = useState(null);

    useEffect(() => {
        const storedQuestions = localStorage.getItem("questions");
        if (storedQuestions) {
            try {
                const parsedQuestions = JSON.parse(storedQuestions);
                setQuestions(parsedQuestions);
                console.log("First Question Index: 0");
                if (parsedQuestions.length > 0) {
                    console.log("First Question:", parsedQuestions[0]);
                } else {
                    console.warn("Questions array is empty.");
                }
            } catch (error) {
                console.error("Error parsing questions from localStorage:", error);
            }
        }
    }, []);

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
    

    const handleAnalysisClick = () => {
        router.push({
            pathname: '/practiceOverview',
        });
    };

    const handleEndClick = () => {
        router.push({
            pathname: '/practice-interview',
        });
    };

    const handleVoiceClick = () => {
        setShowVideo(true);
        setActiveButton('voice');
        setIsRecording(!isRecording);
    };

    const handleTextClick = () => {
        setShowVideo(false);
        setActiveButton('text');
        setEditableTranscription(transcription);
    };

    const handleEditableChange = (event) => {
        setEditableTranscription(event.target.value);
    };

    const handleTextChange = (event) => {
        setTypedAnswer(event.target.value);
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
                            <Box width="100%">
                                <Heading size="18pt" textAlign="left">Question:</Heading>
                                <Text pt="2" fontSize="14pt">{questions[currentQuestionIndex]}</Text>
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
                                    <Heading size="18pt" textAlign="left">Response Type:</Heading>
                                    <Divider orientation="horizontal" mb={4} />
                                    <Flex flexDirection="row" gap="2rem">
                                        <Button 
                                            width="7rem" 
                                            onClick={handleVoiceClick}
                                            bg={activeButton === 'voice' ? 'brand.oceanBlue' : 'brand.pureWhite'}
                                            color={activeButton === 'voice' ? 'brand.pureWhite' : 'brand.oceanBlue'}
                                            borderColor="brand.oceanBlue" 
                                            border="1px" 
                                            _hover={{ boxShadow: '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)' }}
                                        >
                                            <Text fontSize="xxs">
                                                {isRecording ? 'Finish' : 'Voice'}
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
                                    </Flex>
                                    {/* Transcription area */}
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
                                </Flex>
                            </Box>
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
                            disabled={currentQuestionIndex === questions.length - 1}
                            _hover={{ bg: "brand.pureWhite", borderColor: "green" }}
                        >
                            Next
                        </Button>
                    </Flex>

                    {/* Move Analyze Response Button Below */}
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

                        {!showVideo && (
                            <Button bg={"brand.blushPink"} size="xs" color={"white"} py={"1.5rem"} px={"5rem"} boxShadow={"md"} 
                                onClick={handleAnalysisClick}
                                _hover={{
                                    bg: "white",
                                    borderColor: "brand.blushPink",
                                    color: "brand.blushPink"
                                }}
                            >
                                {"Analyze Response"}
                            </Button>
                        )}
                    </Flex>
                </Flex>
            </LayoutSim>
        </>
    );
}
