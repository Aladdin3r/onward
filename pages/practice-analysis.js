import Head from "next/head";
import styles from "@/styles/Home.module.css";
import "@/styles/theme";
import { Heading, Box, Text, VStack, Flex, Button, SimpleGrid, Tag, Divider, Container } from "@chakra-ui/react";
import TopNav from "@/styles/components/TopNav";
import { useRouter } from 'next/router';
import Image from "next/image";
import VideoPLayer from "@/styles/components/VideoPlayer";
import ArrowControls from "@/styles/components/ArrowControls";
import QuestionProgressIndicator from "@/styles/components/QuestionProgressIndicator";
import QuestionCard from "@/styles/components/QuestionCard";
import HighlightFillerWords from "@/styles/components/HighlightFillerWords";
import LanguageToggle from "@/styles/components/LanguageToggle";
import LayoutSim from "@/styles/components/LayoutSim";

export default function PracticeAnalysis() {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Practice Interview — Onward</title>
                <meta name="description" content="Onward is an AI-powered personal interview coach designed to help nurses, particularly those new to the Canadian healthcare system, excel in job interviews." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={`${styles.page}`}>
            <LayoutSim>
                <Box maxW="100vw" py={6} px={4} overflowX="hidden">
                    {/* Centered Container for the layout */}
                    <Container maxWidth="1920px" mx="auto">
                        {/* Header and Language Toggle */}
                        <Flex alignItems="center" justifyContent="space-between" px={4} mb={4}>
                            <Heading fontSize={{base: "xs", lg:"md", "2xl":"lg" }} fontWeight="bold" mb={8}>
                                Response Analysis
                            </Heading>
                            <LanguageToggle/>
                        </Flex>

                        <Flex 
                            gap="2.5rem" 
                            alignItems="flex-start" 
                            px={4}
                        >
                            {/* Left Column with Overview and Response Sections */}
                            <VStack 
                                flex="0.55" 
                                spacing={4} 
                                alignItems="stretch"
                                width="50%"
                            >
                                {/* Overview Section */}
                                <Text fontSize={{base: "xxs", lg:"xs", "2xl":"sm" }} color="nightBlack">
                                    Overview
                                </Text>
                                <Box bg="white" p={4} borderRadius="15"w="100%" boxShadow="md" position="relative">
                                    <Text fontWeight="bold" mb={2} fontSize={{base: "xxs", lg:"xs", "2xl":"sm" }} color="brand.nightBlack">
                                        QUESTION 1
                                    </Text>
                                    <Text fontSize="xxs" mb={4} color="brand.nightBlack">
                                        Can you describe a time when you were faced with an emergency situation and had to make a quick decision? 
                                        How did you prioritize tasks, and what steps did you take to ensure the best possible outcome for the patient?
                                    </Text>
                                </Box>

                                {/* Styled Blue Bottom Area Positioned as Layered Section */}
                                <Flex gap={1} mx={"auto"}>
                                    <QuestionProgressIndicator totalSteps={5} currentStep={0} />
                                </Flex>

                                {/* Your Response Box */}
                                <Box 
                                    bg="white" 
                                    borderRadius="15" 
                                    boxShadow="md" 
                                    mb={50}
                                >
                                    <Box p={4} borderBottomWidth="1px">
                                        <Text fontWeight="bold" fontSize={{base: "xxs", lg:"xs", "2xl":"sm" }}>
                                            Your Response
                                        </Text>
                                    </Box>
                                    <Box p={4} maxW="820px">
                                    <Text 
                                        fontSize="xxs" 
                                        color="brand.nightBlack" 
                                        whiteSpace="normal" 
                                        overflowWrap="break-word" 
                                        wordBreak="keep-all"
                                    ><HighlightFillerWords answer={"Um, in my previous role as a nurse in the ER, there was this one time when, like, a patient came in with chest pain, and we thought it might be a heart attack. At the same time, uh, another patient had a severe allergic reaction. So, I had to, like, figure out who needed help faster. I quickly checked the chest pain patient and told the doctor to start treatment while I, uh, helped the allergic reaction patient by giving them epinephrine and, like, monitoring their breathing. I stayed with them until they were stable. I, um, made sure to communicate with my team, and, uh, even though it was urgent, I stayed calm. In the end, both patients got the care they needed, so, uh, yeah, it worked out okay"} />
                                        </Text>
                                    </Box>
                                </Box>

                                {/* Filler and Relevant Words */}
                                <SimpleGrid columns={2} spacing={4}>
                                    <Box bg="brand.frostWhite" p={4} borderRadius="15" boxShadow="md">
                                        <Text fontWeight="bold" mb={2} fontSize={{base: "xxs", lg:"xs", "2xl":"sm" }}>
                                            Filler Words <Tag colorScheme="red" ml={1} mt={2}>!</Tag>
                                        </Text>
                                        <Text fontSize="xxs" color="brand.nightBlack"> Um - used 7 times in your response</Text>
                                        <Text fontSize="xxs" color="brand.nightBlack">Like - used 3 times in your response</Text>
                                    </Box>

                                    <Box bg="gray.50" p={4} borderRadius="15" boxShadow="md">
                                        <Text fontWeight="bold" mb={2} fontSize={{base: "xxs", lg:"xs", "2xl":"sm" }}>Relevant Words</Text>
                                        <Text fontSize="xxs" color="brand.nightBlack" mb={5}>
                                            <strong>Heart Attack</strong> - empathy, bedside manner, patient safety, patient-centered approach
                                        </Text>
                                        <Text fontSize="xxs" color="brand.nightBlack" mb={5}>
                                            <strong>Allergic Reaction</strong> - IV insertion, wound care, medication administration, vital signs monitoring
                                        </Text>
                                        <Text fontSize="xxs" color="brand.nightBlack" mb={5}>
                                            <strong>Ephephrine</strong> - clear, compassionate, effective, active listening, patient education
                                        </Text>
                                        <Text fontSize="xxs" color="brand.nightBlack" mb={5}>
                                            <strong>Teamwork</strong> - collaboration, multidisciplinary team, coordination, team player
                                        </Text>
                                    </Box>
                                </SimpleGrid>
                            </VStack>

                            {/* Right Column - Video and Suggested Topics */}
                            <VStack flex="0.45" spacing={4} alignItems="stretch" width="50%">
                                {/* Interview Playback */}
                                <Text fontSize={{base: "xxs", lg:"xs", "2xl":"sm" }} fontWeight="bold" color="nightBlack">
                                    Interview Playback
                                </Text>
                                <VideoPLayer 
                                    videoSrc="/recorded-video.webm"
                                    thumbnail="/recorded-video.webm"
                                    duration="0:00 - 2:14"
                                    width="100%"
                                    />

                                {/* Suggested Topics */}
                                <Box bg="white" p={4} borderRadius="15" boxShadow="md" mb={5} pb={6}>
                                    <Text fontWeight="bold" mb={4} fontSize={{base: "xxs", lg:"xs", "2xl":"sm" }}>
                                        Suggested Topics
                                    </Text>
                                    <Divider mb={4} />
                                    <VStack align="stretch" spacing={5}>
                                        <Box>
                                            <Text fontWeight="bold" fontSize={{base: "xxs", lg:"xs", "2xl":"sm" }} color="gray.600" mb={5}>Question 1</Text>
                                            <Text fontWeight="bold" fontSize={{base: "xxs", lg:"xs", "2xl":"sm" }} color="brand.nightBlack">
                                                Patient–Centered Care:
                                            </Text>
                                            <Text fontSize="xxxs" color="brand.nightBlack" mb={3}>
                                                Emphasize your ability to provide compassionate, personalized care that prioritizes the patient's needs, preferences, and well-being. Highlight any experiences where you went above and beyond for patients.
                                            </Text>
                                        </Box>
                                        <Box>
                                            <Text fontWeight="bold" fontSize={{base: "xxs", lg:"xs", "2xl":"sm" }} color="brand.nightBlack">
                                                Telehealth and Technology Integration:
                                            </Text>
                                            <Text fontSize="xxxs" color="brand.nightBlack" mb={3}>
                                                With the rise of telemedicine, nurses should discuss their comfort and experience using technology to monitor patients remotely, manage electronic health records (EHR), or conduct virtual consultations.
                                            </Text>
                                        </Box>
                                        <Box>
                                            <Text fontWeight="bold" fontSize={{base: "xxs", lg:"xs", "2xl":"sm" }} color="brand.nightBlack">
                                                Interdisciplinary Team Collaboration:
                                            </Text>
                                            <Text fontSize="xxxs" color="brand.nightBlack" mb={3}>
                                                Employers value nurses who can work effectively with physicians, social workers, and other healthcare professionals. Share examples of how you’ve successfully collaborated with different teams to ensure the best patient outcomes.
                                            </Text>
                                        </Box>
                                        <Box>
                                            <Text fontWeight="bold" fontSize={{base: "xxs", lg:"xs", "2xl":"sm" }} color="brand.nightBlack">
                                                Cultural Competency and Diversity Awareness:
                                            </Text>
                                            <Text fontSize="xxxs" color="brand.nightBlack">
                                                Given the growing diversity of patients, demonstrate your ability to care for individuals from various backgrounds and address cultural and language differences in healthcare.
                                            </Text>
                                        </Box>
                                    </VStack>
                                </Box>
                            </VStack>
                        </Flex>
                    </Container>
                </Box>
                </LayoutSim>
            </div>
        </>
    );
}
