import Head from "next/head";
import styles from "@/styles/Home.module.css";
import "@/styles/theme";
import { Heading, Box, CardBody, Text, Stack, Card, Link, Flex, Button } from "@chakra-ui/react";
import { useRouter } from 'next/router'; // Import useRouter
import AnswerPractice from "@/styles/components/AnswerPractice"
import { useState, useEffect } from "react";
import LayoutSim from "@/styles/components/LayoutSim";

export default function PracticeAnswer() {
    const [showVideo, setShowVideo] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
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
                        {/* <Button bg={"brand.pureWhite"} size="xxs" width={"6rem"} p={2} border={"1px"} borderColor={"red"}
                                onClick={handleEndClick}
                                _hover={{
                                    bg: "brand.pureWhite",
                                    color: "red",
                                    border:"1px",
                                    borderColor:"red"
                                }}>End</Button> */}

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
    )
}