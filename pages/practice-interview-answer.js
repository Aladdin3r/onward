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

    const handleEndClick = () => {
        router.push({
            pathname: '/',
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
            <Box 
                minH={"100vh"}
                bg="brand.frostWhite"
                justify="center"
                align="center"
                px={"0"}
                py={"0"}
                overflow="hidden"
            >
                <Flex my={"2rem"} mx={"5rem"} gap={"5rem"} flexDirection={"row"}>
                    <AnswerPractice question={interviewQuestions[currentQuestionIndex]}/>
                </Flex>
                <Flex flexDirection={"row"} justify={"space-between"} mx={"5rem"} my={"1rem"}>
                    <Button size="xxs" onClick={handleEndClick}>End</Button>
                    <Button size="xxs">Next Question</Button>
                </Flex>
            </Box>
            <Footer/>
        </>
    )
}