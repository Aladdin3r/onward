import Head from "next/head";
import styles from "@/styles/Home.module.css";
import "@/styles/theme";
import { Heading, Box, CardBody, Text, Stack, Card, Link, Flex, Button } from "@chakra-ui/react";
import ProgressBar from "@/styles/components/ProgressBar";
import Popup from "@/styles/components/Popup.js";
import ViewAllPopup from "@/styles/components/ViewAllPopup"; // Import the new ViewAllPopup component
import { useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router'; // Import useRouter
import Layout from "@/styles/components/Layout";
import AnswerPractice from "@/styles/components/AnswerPractice"
import { useState } from "react";
import interviewQuestions from '@/data/interviewQuestions'; 
import LayoutSim from "@/styles/components/LayoutSim";

export default function PracticeAnswer() {

    const [showVideo, setShowVideo] = useState(false);
    const router = useRouter();
    // const { question } = router.query;

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

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

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
                        <AnswerPractice question={interviewQuestions[currentQuestionIndex]} onShowVideoChange={setShowVideo}/>
                    </Flex>

                    {/* Bottom Buttons */}
                    <Flex 
                        flexDirection={"row"} 
                        justify={"space-between"} 
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
                                color: "brand.blushPink",
                                border: "1px",
                                boxShadow:"md"
                            }}
                        > 
                            Start Analysis
                        </Button>
                        )};
                    </Flex>
                </Flex>
            </LayoutSim>
        </>
    )
}