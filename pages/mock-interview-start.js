import Head from "next/head";
import styles from "@/styles/Home.module.css";
import "@/styles/theme";
import { Box, Flex, Text, Button, IconButton, Stack, Center } from "@chakra-ui/react";
import { Waveform, Microphone, VideoCamera } from "@phosphor-icons/react";
import VideoPlayer from "@/styles/components/VideoPlayer";
import { useRouter } from "next/router";
import Layout from "@/styles/components/Layout";

export default function MockInterviewQuestionPage() {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Mock Interview — Onward</title>
                <meta name="description" content="Onward is an AI-powered personal interview coach designed to help nurses excel in job interviews." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <Box className={styles.page} bg="gray.50" minH="100vh" py={8} display="flex" flexDirection="column" alignItems="center">
                    
                    {/* Question Prompt */}
                    <Center>
                        <Box bg="white" mt={20} px={6} py={4} borderRadius="md" boxShadow="sm" width="70%">
                            <Text fontSize="sm" fontWeight="semibold" textAlign="center">
                                Can you describe a time when you were faced with an emergency situation and had to make a quick decision? How did you prioritize tasks, and what steps did you take to ensure the best possible outcome for the patient?
                            </Text>
                        </Box>
                    </Center>

                    {/* Video Player with Audio Overlay Icon */}
                    <Flex justify="center" mb={8} mt={20} position="relative" width="70%">
                        <VideoPlayer
                            title="Interview Playback"
                            thumbnail="/images/smiling-girl.png"
                        />
                        {/* Audio Overlay */}
                        <Box position="absolute" top="4" left="430" bg="blackAlpha.700" p={2} borderRadius="md">
                            <Waveform size={32} color="white" />
                        </Box>
                    </Flex>

                    {/* Bottom Control Bar */}
                    <Box width="100%" py={2} bg="white" boxShadow="md" position="fixed" bottom={0}>
                        <Flex justify="space-between" align="center" maxW="800px" mx="auto" px={4}>
                            {/* End Button */}
                            <Button colorScheme="red" size="sm" px={8} py={6} 
                            onClick={() => router.push('/')} >
                                            {/* "End" will lead to Dashboard for now*/}
                                End
                            </Button>

                            {/* Mic and Video Icon Buttons */}
                            <Stack direction="row" spacing={10}>
                                <IconButton
                                    px={4}
                                    py={8}
                                    aria-label="Toggle Microphone"
                                    icon={<Microphone size={35} color="black" weight="fill"/>}
                                    bg="white"
                                    boxShadow="md"
                                    borderRadius="full"
                                />
                                <IconButton
                                    px={4}
                                    py={8}
                                    aria-label="Toggle Video"
                                    icon={<VideoCamera size={35} color="black" weight="fill"/>}
                                    bg="white"
                                    boxShadow="md"
                                    borderRadius="full"
                                />
                            </Stack>

                            {/* Next Question Button */}
                            <Button
                                bg="brand.blushPink"
                                color="brand.frostWhite"
                                size="sm"
                                px={8}
                                py={6}
                                onClick={() => router.push('/')}
                                    // "Next Question" will lead to Dashboard for now
                            >
                                Next Question
                            </Button>
                        </Flex>
                    </Box>
                </Box>
            </Layout>
        </>
    );
}
