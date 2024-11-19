import Head from "next/head";
import styles from "@/styles/Home.module.css";
import "@/styles/theme";
import { Heading, Box, CardBody, Text, Stack, Card, Link, Flex, Button } from "@chakra-ui/react";
import { useRouter } from 'next/router'; // Import useRouter
import QuestionPractice from "@/styles/components/QuestionPractice";
import LayoutSim from "@/styles/components/LayoutSim";

import { Image } from "@chakra-ui/react";

import ProgressBar from "@/styles/components/ProgressBar";

export default function PracticeInterviewQuestion() {
    const router = useRouter();
    const { question } = router.query;
   
    const handleEndClick = () => {
        router.push({
            pathname: '/practice-interview-filter'
        });
    };

    const handleSimulation = () => {
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
            <LayoutSim>
                <Flex
                    flexDirection="column"
                    height="86vh"
                    width="100%"
                >
                    
                    <ProgressBar activeStep={2}/>
                    
                    {/* Top Container */}
                    <Flex 
                        display="flex"
                        alignItems="center" 
                        justifyContent="center"
                        direction="column"
                        gap="10px"
                    >
                        <Image
                            src="/images/practice-question-icon.png"
                            alt="Icon"
                            height="auto"
                            objectFit="cover"
                            width="10%"
                            display="flex"
                        alignItems="center" 
                        justifyContent="center"
                            />
                        <Text fontSize="sm" textAlign="center">Customize your practice! <br/> Choose how many questions you’d like to answer and select the types that best fit your focus areas:  </Text>
                    </Flex>
                    <Flex
                        flex="1"
                        alignItems="center"
                        justifyContent="center"
                        direction="column"
                        gap="5"
                    >
                        <Box>
                            <QuestionPractice
                                showArrows={"true"}
                                borderRadius={"15"}
                                questionWidth={"80%"}
                            />
                        </Box>
                        <Box>
                            <QuestionPractice
                                showArrows={"true"}
                                borderRadius={"15"}
                                questionWidth={"80%"}
                            />
                        </Box>
                    </Flex>

                    {/* Bottom Container */}
                    <Flex 
                        flexDirection={"row"} 
                        justify={"space-between"} 
                        mt={"auto"} 
                        px="4em"
                        mb="20px"
                    >
                    <Button bg={"brand.blushPink"} size="xs" color={"white"} py={"1.5rem"} px={"5rem"} boxShadow={"md"} 
                        onClick={handleEndClick}
                        _hover={{
                            bg: "white",
                            color: "brand.blushPink",
                            border: "1px",
                            boxShadow:"md"
                        }}
                    >
                        Back
                    </Button>
                        
                    <Button bg={"brand.blushPink"} size="xs" color={"white"} py={"1.5rem"} px={"5rem"} boxShadow={"md"}
                        onClick={handleSimulation}
                        _hover={{
                            bg: "white",
                            color: "brand.blushPink",
                            border: "1px",
                            boxShadow:"md"
                        }}
                    >
                        Answer
                    </Button>
                    </Flex>
                </Flex>
            </LayoutSim>
        </>
    );
}
