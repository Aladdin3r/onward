import Head from "next/head";
import styles from "@/styles/Home.module.css";
import "@/styles/theme";
import { Heading, Box, CardBody, Text, Stack, Card, Link, Flex, Button, borderRad, StackDivider } from "@chakra-ui/react";
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

export default function PracticeInterviewQuestion2() {
    const router = useRouter();
    const { question } = router.query;

    const handleAnswerPage = () => {
        router.push({
            pathname: '/practice-interview-answer-2',
            // query: { question: question }, // Pass the current question to the answer page
        });
    };
   
    const handleEndClick = () => {
        router.push({
            pathname: '/'
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
                    <Box>
                        <Card borderRadius={borderRad}>
                            <CardBody textAlign={"left"}>
                                <Stack spacing='4' divider={<StackDivider />}>
                                    <Box>
                                        <Heading size='md'>
                                            Technical Question
                                            {/* {interviewQuestions[currentCategoryIndex].category} */}
                                        </Heading>
                                    </Box>
                                    <Box>
                                        <Text pt='2' fontSize='xxs'>
                                            {/* placeholder */}
                                            Can you walk me through the steps you would take to perform a sterile dressing change?
                                            {/* {currentQuestionText} */}
                                        </Text>
                                    </Box>
                                </Stack>
                            </CardBody>
                        </Card>
                    </Box>
                    <Box p={2}>1/2</Box>
                </Flex>

                {/* Buttons container */}

                <Flex flexDirection={"row"} justify={"space-between"} mt={"50px"} mx={"13%"}>
                    <Button bg={"brand.pureWhite"} size="xxs" width={"6rem"} p={2} border={"1px"} borderColor={"red"}
                            onClick={handleEndClick}
                            _hover={{
                                bg: "brand.pureWhite",
                                color: "red",
                                border:"1px",
                                borderColor:"red"
                        }}>End</Button>
                    <Button bg={"brand.blushPink"} size="xxs" width={"10rem"} color={"white"} p={2}
                        onClick={handleAnswerPage}
                        _hover={{
                            bg: "white",
                            color: "brand.blushPink",
                            border: "1px",
                            borderColor: "brand.blushPink"
                        }}
                    >
                            Answer
                    </Button>
                </Flex>
            </Box>
            <Footer/>
        </>
    )
}