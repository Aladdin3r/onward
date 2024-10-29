import Head from "next/head";
import styles from "@/styles/Home.module.css";
import "@/styles/theme";
import { Heading, Box, Stack, Text, Flex } from "@chakra-ui/react";
import TopNav from "@/styles/components/TopNav";
import { SideNavBar } from "@/styles/components/SideNav";
import ProgressBar from "@/styles/components/ProgressBar";
import Footer from "@/styles/components/Footer";
import Popup from "@/styles/components/Popup";
import ViewAllPopup from "@/styles/components/ViewAllPopup"; // Import the new ViewAllPopup component
import { useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import VideoPlayer from "@/styles/components/VideoPlayer";
import VideoWQuestionCard from "@/styles/components/VideoWQuestionCard";

export default function PracticeInterviewOverview() {
    const router = useRouter();

    const handlePrev = () => console.log("Previous question");
    const handleNext = () => console.log("Next question");
    const handleExpand = () => console.log("Expand video");


    return (
        <>
            <Head>
                <title>Practice Interview Overview — Onward</title>
                <meta name="description" content="Onward is an AI-powered personal interview coach designed to help nurses, particularly those new to the Canadian healthcare system, excel in job interviews." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Page Container */}
            <div className={styles.page}>
                {/* Top Navigation */}
                <TopNav />

                {/* Main Layout with Sidebar and Content */}
                <Flex>
                    {/* Sidebar */}
                    <Box width="17.1875rem">
                        <SideNavBar activeVariant="variant3" />
                    </Box>

                    {/* Main Content Area */}
                    <Box flex="1" p={6}>

                        {/* Overview Content */}

                        <Stack spacing={6} mt={4}>

                            <Heading as="h1" size="lg">Practice Overview</Heading>
                            
                            <VideoWQuestionCard 
                                thumbnail="/images/smiling-girl.png"
                                questionNumber={1}
                                questionText="Can you walk me through a situation where you had to collaborate with the interdisciplinary team during a code blue to ensure timely administration of ACLS protocols and coordinate care post-resuscitation, including any challenges with the EMR documentation?"
                                totalSteps={5}
                                currentStep={0}
                                onPrev={handlePrev}
                                onNext={handleNext}
                                onExpand={handleExpand}
                             />

                            {/* Example Content: Cards or Sections */}
                            <Box>
                             
                            </Box>

                            <Box>
                          
                            </Box>
                        </Stack>

                        {/* Footer */}
                        <Footer />
                    </Box>
                </Flex>
            </div>
        </>
    );
}
