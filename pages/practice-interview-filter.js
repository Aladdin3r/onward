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
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

// right now using drop down for question number and length of interview

export default function PracticeInterviewFilter() {
    const router = useRouter();
    const [selectedFiles, setSelectedFiles] = useState({ resumes: [], jobPosts: [] });
    const [selectedFilesWithURLs, setSelectedFilesWithURLs] = useState({ resumes: [], jobPosts: [] });

    useEffect(() => {
        const fetchSelectedFiles = async () => {
            const selectedFiles = JSON.parse(localStorage.getItem("selectedFiles"));
            if (!selectedFiles) {
                console.log("No selected files found in localStorage.");
                return;
            }

            const fetchPublicURLs = async (fileIds, bucketName) => {
                const publicURLs = [];
                for (const fileId of fileIds) {
                    // Remove 'uploads/' prefix if the fileId already includes it
                    const filePath = fileId.startsWith("uploads/") ? fileId : `uploads/${fileId}`;
                    const { publicURL, error } = supabase
                        .storage
                        .from(bucketName)
                        .getPublicUrl(filePath);

                    if (error) {
                        console.error(`Error fetching public URL for ${filePath}:`, error.message);
                    } else {
                        publicURLs.push(publicURL);
                    }
                }
                return publicURLs;
            };

            const resumes = await fetchPublicURLs(selectedFiles.resumes, "onward-resume");
            const jobPosts = await fetchPublicURLs(selectedFiles.jobPosts, "onward-job-posting");

            console.log("Resumes Public URLs:", resumes);
            console.log("Job Posts Public URLs:", jobPosts);
        };

        fetchSelectedFiles();
    }, []);
    
    console.log("Selected Files with URLs:", selectedFilesWithURLs);

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
                        // flexDirection={"column"} 
                        // height="100vh" 
                        // minH={{ base: "90vh", md: "100vh", xl: "78vh", "2xl":"85vh" }} 
                        // width={"100%"}
                        // maxW={{ base: "100%", md: "1200px", lg: "1920px" }} 
                        // mx="auto"
                        // flexGrow={1} 
                        flexDirection="column"
                        height="86vh"
                        width="100%"
                    >
                        <ProgressBar currentStep={2} />

                        {/* section for the question time & type cards */}
                        <Flex 
                            mt="3em"
                            flexDirection={{ base: "column", xl: "row" }} 
                            justifyContent={"space-evenly"}
                            rowGap={5}
                        >
                            <QuestionTime />
                            <QuestionType />
                        </Flex>

                        {/* bottom buttons */}
                        <Flex 
                            flexDirection="row" 
                            justifyContent="space-between" 
                            // mt={{ base: "5rem", xl: "3rem", "2xl":"5rem"}} 
                            mt="auto"
                            mb="20px"
                        >
                            <Button bg={"brand.blushPink"} color={"white"} py={"1.5rem"} px={"5rem"} size="xs" width={{ base: "1rem", "2xl":"10rem"}} height={{ base: "2rem", "2xl":"2.5rem"}}
                            // <Button bg={"brand.blushPink"} color={"white"} py={"1.5rem"} px={"4rem"} size={{ base: "xxs", "2xl":"sm"}} width={{ base: "1rem", "2xl":"10rem"}} height={{ base: "2rem", "2xl":"2.5rem"}}
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
                            <Button bg={"brand.blushPink"} color={"white"} py={"1.5rem"} px={"5rem"} size="xs" 
                            width={{ base: "8rem", "2xl":"17rem"}} 
                            height={{ base: "2rem", "2xl":"2.5rem"}}
                            // width={{ base: "8rem", "2xl":"17rem"}} 
                            // height={{ base: "2rem", "2xl":"2.5rem"}}
                            // <Button bg={"brand.blushPink"} color={"white"} py={"1.5rem"} px={"8rem"} size={{ base: "xxs", "2xl":"sm"}} width={{ base: "8rem", "2xl":"17rem"}} height={{ base: "2rem", "2xl":"2.5rem"}}
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
