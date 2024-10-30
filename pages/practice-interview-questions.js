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
import QuestionPractice from "@/styles/components/QuestionPractice";
import VideoPlayer from '@/styles/components/VideoPlayer'

export default function PracticeInterview() {
    const router = useRouter();

    const handleNextClick = () => {
        router.push({
            pathname: '/practice-analysis'
        });
    };

    const handleAnswer = () => {
        router.push({
            pathname: '/practice-interview-answer'
        })
    }


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
                <Flex mt={"5rem"} flexDirection={"column"}
                    p={4}
                    width="75%"
                    mb={0}
                    zIndex={1}    
                >
                    <QuestionPractice borderRadius={15}/>
                </Flex>

                {/* Buttons container */}

                <Flex flexDirection={"row"} justify={"space-between"} mx={"5rem"} my={"1rem"}>
                    <Button size="xxs">End</Button>
                    <Button size="xxs" onClick={handleAnswer}>Answer</Button>
                </Flex>
                <Flex flexDirection={"row"} justify={"space-between"} mx={"5rem"} my={"1rem"}>
                        </Flex>
                            <Button size="xxs" onClick={handleNextClick}>Next</Button>
            </Box>
            <Footer/>
        </>
    )
}