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
import QuestionProgressIndicator from "@/styles/components/QuestionProgressIndicator";
import ArrowControls from "@/styles/components/ArrowControls";
import LayoutSim from "@/styles/components/LayoutSim";

// need to fix spacing between the cards

export default function PracticeInterviewOverview() { 
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Practice Interview — Onward</title>
                <meta name="description" content="Onward is an AI-powered personal interview coach designed to help nurses, particularly those new to the Canadian healthcare system, excel in job" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <LayoutSim >
                    <Flex direction="column" p={4} mx="10em">
                        <Flex 
                            justifyContent={"center"}
                            alignItems="flex-start"
                            flexDirection={{base: "column", xl: "row"}}
                            columnGap="0em"
                            w="100%"
                        > 
                            <Flex  flexDirection={"column"} alignItems="center" justifyContent="center" gap={"0.5rem"} width="100%">
                                <VideoWQuestionCard />
                                <QuestionProgressIndicator/>
                                <ArrowControls/>
                            </Flex>
                            <Box  display="flex" alignItems="center" justifyContent="center" my={{base: "5", xl:0}} width="100%">
                                <ImprovementSteps />
                            </Box>
                        </Flex>

                        <Flex
                            justifyContent={"center"}
                            alignItems="flex-start"                       
                        >
                            <TranscriptionComponent />
                        </Flex>
                    </Flex>
            </LayoutSim>
        </>
    );
};
