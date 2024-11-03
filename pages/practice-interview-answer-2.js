import Head from "next/head";
import styles from "@/styles/Home.module.css";
import "@/styles/theme";
import { Heading, Box, CardBody, Text, Stack, Card, Link, Flex, Button, StackDivider } from "@chakra-ui/react";
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
import QuestionPractice from "@/styles/components/QuestionPractice";
import VideoPlayer from "@/styles/components/VideoPlayer";

export default function PracticeAnswer() {
    const router = useRouter();
    // const { question } = router.query;
    const [showVideo, setShowVideo] = useState(false);
    const [activeButton, setActiveButton] = useState('');
    const handleEndClick = () => {
        router.push({
            pathname: '/',
        });
    };

    const handleFinishClick = () => {
        router.push({
            pathname: '/practice-interview-overview',
        });
    };

    const handleVoiceClick = () => {
        setShowVideo(true);
        setActiveButton('voice');
    };

    const handleTextClick = () => {
        setShowVideo(false);
        setActiveButton('text');
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
            <Flex flexDir={"column"} maxH={"100vh"} bg="brand.frostWhite" justifyContent={"center"} >
                    <Flex flexDirection={"row"} ml={"5rem"} my={3}>
                    <Flex flexDirection="row" gap="2rem" mx={"auto"}>
                <Box maxW={showVideo ? '60%' : '100%'} transition="width 0.3s ease" borderRadiusTop={15} mx="auto">
                    <QuestionPractice />
                    <Flex 
                        gap="1.1rem" 
                        p="4" 
                        bg="brand.pureWhite" 
                        borderRadiusBottom={15} 
                        boxShadow="md" 
                        mb={0} 
                        position="relative" 
                        zIndex={1}
                        flexDirection={"column"}
                    >
                        <Heading size="md" textAlign={"left"}>Response Type:</Heading>
                        <Flex flexDirection={"row"} gap="2rem">
                            <Button 
                                width="7rem" 
                                onClick={handleVoiceClick}
                                bg={activeButton === 'voice' ? 'brand.oceanBlue' : 'brand.pureWhite'}
                                color={activeButton === 'voice' ? 'brand.pureWhite' : 'brand.oceanBlue'}
                                borderColor="brand.oceanBlue" 
                                border="1px" 
                                _hover={{ boxShadow: '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)' }}
                            >
                                <Text fontSize="xxs">Voice</Text>
                            </Button>
                            <Button 
                                width="7rem" 
                                onClick={handleTextClick}
                                bg={activeButton === 'text' ? 'brand.oceanBlue' : 'brand.pureWhite'}
                                color={activeButton === 'text' ? 'brand.pureWhite' : 'brand.oceanBlue'}
                                borderColor="brand.oceanBlue" 
                                border="1px" 
                                _hover={{ boxShadow: '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)' }}
                            >
                                <Text fontSize="xxs">Text</Text>
                            </Button>
                        </Flex>
                    </Flex>
                    
                    <Box
                        p="4"
                        bg="brand.blueberryCreme"
                        boxShadow="md"
                        mb={0}
                        position="relative"
                        zIndex={1}
                        borderBottomRadius={15}
                        maxH="15rem"
                    >
                        {/* Answer section */}
                        <Card borderRadius="15" textAlign="left">
                            <CardBody>
                                <Stack spacing="4" divider={<StackDivider />}>
                                    <Box>
                                        <Heading size="md" height="2rem">Transcript:</Heading>
                                    </Box>
                                    
                                    {/* Answer Box */}
                                    <Box overflowY="auto" maxH="5rem" w="100%">
                                        <Text pt="2" fontSize="xxs">
                                        So first, I would, gather all the necessary supplies, you know, like sterile gloves, gauze, and, um, any ointments or solutions needed. Then, I would, um, make sure to wash my hands really well because, like, hand hygiene is super important.

Next, I’d put on the sterile gloves before touching the dressing. Then, I’d carefully, um, remove the old dressing, making sure to, like, avoid any discomfort to the patient. After that, I would clean the wound gently, using, um, the saline solution, I guess, to remove any debris.

Then, I’d assess the wound for, like, signs of infection, like redness or swelling, and, um, document everything, you know, in the patient’s chart. Finally, I’d apply the new dressing, making sure it’s secure but not too tight, and then I’d, um, wash my hands again after. So, yeah, that’s pretty much it."
                                        </Text>
                                    </Box>
                                </Stack>
                            </CardBody>
                        </Card>
                    </Box>
                </Box>
                
                <Box width="45%">
                    {showVideo && <VideoPlayer />}
                </Box>
            </Flex>
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
                        <Button bg={"brand.blushPink"} size="xxs" width={"10rem"} color={"white"} p={2}
                                onClick={handleFinishClick}
                                _hover={{
                                    bg: "white",
                                    color: "brand.blushPink",
                                    border: "1px",
                                    borderColor: "brand.blushPink"
                                }}>Finish</Button>
                    </Flex>
            </Flex>
            <Footer/>
        </>
    )
}