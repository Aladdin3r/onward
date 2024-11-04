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
import UploadFile from "@/styles/components/FileUpload";
import Layout from "@/styles/components/Layout";
import QuestionType from "@/styles/components/QuestionType";
import QuestionTime from "@/styles/components/QuestionTime";

// right now using drop down for question number and length of interview

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

            <Layout showTopNav={true} pageTitle="Practice Interview">

                <div className={styles.page} style={{ position: "relative" }}>
                    <Flex 
                        flexDirection={"column"} 
                        height="100vh" 
                        width={"100%"}
                        maxW={{ base: "100%", md: "1200px", lg: "1920px" }} 
                        mx="auto"
                    >
                        <ProgressBar currentStep={2} />

                        {/* section for the question time & type cards */}
                        <Flex 
                            flexDirection={{ base: "column", xl: "row" }} 
                            justifyContent={"space-evenly"}
                            rowGap={5}
                        >
                            <QuestionTime />
                            <QuestionType />
                        </Flex>

                        {/* bottom buttons */}
                        <Flex flexDirection="row" justifyContent="space-between" mt={{ base: "5rem", xl: "3rem", "2xl":"5rem"}} mb="3rem">
                            <Button bg={"brand.blushPink"} color={"white"} py={"1.5rem"} px={"4rem"} size={{ base: "xxs", "2xl":"sm"}} width={{ base: "1rem", "2xl":"10rem"}} height={{ base: "2rem", "2xl":"2.5rem"}}
                                onClick={handleBackClick}
                                _hover={{
                                    bg: "white",
                                    color: "brand.blushPink",
                                    border: "1px",
                                    boxShadow:"md"
                                }}
                            >
                                    Back
                                </Button>
                            <Button bg={"brand.blushPink"} color={"white"} py={"1.5rem"} px={"8rem"} size={{ base: "xxs", "2xl":"sm"}} width={{ base: "8rem", "2xl":"17rem"}} height={{ base: "2rem", "2xl":"2.5rem"}}
                                onClick={handleStartClick}
                                _hover={{
                                    bg: "white",
                                    color: "brand.blushPink",
                                    border: "1px",
                                    boxShadow:"md"
                                }}
                            >
                                    Start Practice
                            </Button>
                        </Flex>
                    </Flex>
                </div>
            </Layout>
        </>
    );
}
