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
import UploadFile from "@/styles/components/UploadFile";
import Layout from "@/styles/components/Layout";
import QuestionType from "@/styles/components/QuestionType";
import QuestionTime from "@/styles/components/QuestionTime";

export default function PracticeInterviewFilter() {
    const router = useRouter();

        const handleStartClick  = () => {
        router.push({
            pathname: '/practice-interview-questions',
        });
    };
             const handleBackClick = () => {
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
            <Layout showTopNav={true} title="Practice Interview">
                <div className={styles.page} style={{ position: "relative" }}>
                    <Flex>
                        
                    <Flex 
                        flexDirection="column"
                        width="100%" 
                        height="100vh" 
                        overflowX="hidden" 
                        maxW={{ base: "100%", md: "1200px", lg: "1920px" }} 
                        mx="auto"
                    >
                        <ProgressBar currentStep={1} />

                        <Flex flexDirection="row" gap={10} align="center" mx="5rem" my="1rem">
                            <QuestionTime />
                            <QuestionType />
                    </Flex>
                            <Flex flexDirection={"row"} justify={"space-between"} mt={"300px"}>
                                <Button bg={"brand.blushPink"} size="xxs" width={"10rem"} color={"white"} p={2}
                                    onClick={handleBackClick}
                                    _hover={{
                                        bg: "white",
                                        color: "brand.blushPink"
                                    }}
                                >
                                        Back
                                    </Button>
                                <Button bg={"brand.blushPink"} size="xxs" width={"10rem"} color={"white"} p={2}
                                    onClick={handleStartClick}
                                    _hover={{
                                        bg: "white",
                                        color: "brand.blushPink"
                                    }}
                                >
                                        Start Practice
                                </Button>
                            </Flex>
                        </Flex>

                        {/* Separate row for the Next button */}
                        <Flex justifyContent="flex-end" mx="5rem" my="1rem">
                            <Button size="sm" onClick={handleNextClick}>Next</Button>
                        </Flex>
                    </Flex>
                </div>
            </Layout>
        </>
    );
}
