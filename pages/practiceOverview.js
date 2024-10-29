import Head from "next/head";
import styles from "@/styles/Home.module.css";
import "@/styles/theme";
import { Box, Flex } from "@chakra-ui/react";
import TopNav from "@/styles/components/TopNav";
import { SideNavBar } from "@/styles/components/SideNav";
import ProgressBar from "@/styles/components/ProgressBar";
import { useRouter } from 'next/router';
import TranscriptionComponent from "@/styles/components/FullTranscriptionCard";
import ImprovementSteps from "@/styles/components/ImprovementSteps";
import VideoWQuestionCard from "@/styles/components/VideoWQuestionCard";
import Layout from "@/styles/components/Layout";
import Header from "@/styles/components/Header";

export default function PracticeInterviewOverview() {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Practice Interview — Onward</title>
                <meta name="description" content="Onward is an AI-powered personal interview coach designed to help nurses, particularly those new to the Canadian healthcare system, excel in job interviews." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout title="Practice Interview" showTopNav={false}>
                <Flex height="100vh">
                    {/* <Box 
                        width="250px" 
                        bg="gray.100" 
                        position="fixed" 
                        top="0" 
                        left="0" 
                        height="100vh" 
                        overflowY="auto" 
                    > */}
                    {/* </Box> */}
                    {/* <Flex direction="column" flex="1" marginLeft="250px">  */}
                        <Box 
                            bg="white" 
                            position="fixed" 
                            top="0" 
                            left="250px" 
                            right="0" 
                            zIndex="1000" 
                        >

                        </Box>
                        <Flex direction="column" flex="1" p={4} pt="20px" overflowY="auto" align="center" mt="6">
                            <Flex 
                                flex="1" 
                                justify="space-between" 
                                alignItems="flex-end" 
                                mb={6} 
                            >
                                <Box mx={0} flex="1" display="flex" alignItems="center" justifyContent="center" >
                                    <VideoWQuestionCard />
                                </Box>
                                <Box mx={4} flex="1" display="flex" alignItems="center" justifyContent="center">
                                    <ImprovementSteps />
                                </Box>
                            </Flex>

                            <Box flex="0" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                                <TranscriptionComponent />
                            </Box>
                        </Flex>
                    </Flex>
            </Layout>
        </>
    );
};
