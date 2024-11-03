import Head from "next/head";
import styles from "@/styles/Home.module.css";
import "@/styles/theme";
import { Heading, Box, CardBody, Text, Stack, Card, Link, Flex, Button } from "@chakra-ui/react";
import TopNav from "@/styles/components/TopNav";
import { SideNavBar } from "@/styles/components/SideNav";
import ProgressBar from "@/styles/components/ProgressBar";
import Footer from "@/styles/components/Footer";
import Popup from "@/styles/components/Popup.js";
import ViewAllPopup from "@/styles/components/ViewAllPopup"; // Import the new ViewAllPopup component
import { useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router'; // Import useRouter
import Layout from "@/styles/components/Layout";
import AnswerPractice from "@/styles/components/AnswerPractice"
import { useState } from "react";
import interviewQuestions from '@/data/interviewQuestions'; 

export default function PracticeAnswer() {
    const router = useRouter();
    // const { question } = router.query;

    const handleOverviewClick = () => {
        router.push({
            pathname: '/practiceOverview',
        });
    };
    const handleEndClick = () => {
        router.push({
            pathname: '/',
        });
    };

    const handleNextClick = () => {
        router.push({
            pathname: '/practice-interview-questions-2',
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
            <TopNav/>
            <Flex 
                flexDirection={"column"}
                height="calc(100vh - 9rem)"
                width="100%"
                maxW={{ base: "100%", md: "1200px", lg: "1920px" }} 
                >
                <Flex flexDirection={"row"} ml={"5rem"} mt={"6rem"}>
                    <AnswerPractice question={interviewQuestions[currentQuestionIndex]}/>
                </Flex>
                <Flex flexDirection={"row"} justify={"space-between"} mt={"50px"} mx={"13%"}>
                    <Button bg={"brand.pureWhite"} size="xxs" width={"6rem"} p={2} border={"1px"} borderColor={"red"}
                            onClick={handleEndClick}
                            _hover={{
                                bg: "brand.pureWhite",
                                color: "red",
                                border:"1px",
                                borderColor:"red"
                            }}>End</Button>
                    <Button bg={"brand.blushPink"} size="xxs" onClick={handleOverviewClick} width={"10rem"} color={"white"} p={2}
                            _hover={{
                                bg: "white",
                                color: "brand.blushPink",
                                border: "1px",
                                borderColor: "brand.blushPink"
                            }}>Next Question</Button>
                </Flex>
            </Flex>
            <Footer/>
        </>
    )
}