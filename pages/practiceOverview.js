import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";
import Head from "next/head";
import { Box, Center, Spinner, Text, Flex } from "@chakra-ui/react";
import Layout from "@/styles/components/Layout";
import ImprovementSteps from "@/styles/components/ImprovementSteps";
import TranscriptionComponent from "@/styles/components/FullTranscriptionCard";
import QuestionProgressIndicator from "@/styles/components/QuestionProgressIndicator";
import ArrowControls from "@/styles/components/ArrowControls";

export default function PracticeInterviewOverview() {
    const [videoUrl, setVideoUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    const { videoPath } = router.query;

    useEffect(() => {
        const fetchVideo = async () => {
            if (videoPath) {
                const { data, error } = await supabase
                    .storage
                    .from("onward-video") // Ensure correct bucket name
                    .getPublicUrl(videoPath);

                if (error) {
                    setError("Failed to load video.");
                    console.error("Error fetching video URL:", error.message);
                } else {
                    setVideoUrl(data.publicUrl);
                }
                setIsLoading(false);
            }
        };
        fetchVideo();
    }, [videoPath]);

    return (
        <>
            <Head>
                <title>Practice Interview Overview</title>
                <meta name="description" content="Onward is an AI-powered personal interview coach designed to help nurses, particularly those new to the Canadian healthcare system, excel in job interviews." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout showTopNav={true} pageTitle="Practice Overview">
                <Flex direction="column" p={4}>
                    {/* Two columns: Video and Improvement Steps */}
                    <Flex 
                        justifyContent="flex-start" 
                        mb={8} 
                        flexDirection={{ base: "column", xl: "row" }}
                    >
                        {/* Video Column */}
                        <Box
                            width={{ base: "100%", xl: "60%" }} // Adjust width for responsiveness
                            maxW="600px"
                            mb={6}
                            p={2}
                            boxShadow="md"
                            borderRadius="15"
                            border="1px"
                            borderColor="#E6EAF2"
                            bg="white"
                            overflow="hidden"
                        >
                            {isLoading ? (
                                <Center height="400px">
                                    <Spinner size="xl" />
                                    <Text ml={4}>Loading your video...</Text>
                                </Center>
                            ) : error ? (
                                <Center height="400px">
                                    <Text fontSize="xl" color="red.500">{error}</Text>
                                </Center>
                            ) : (
                                videoUrl && (
                                    <video 
                                        src={videoUrl} 
                                        controls 
                                        width="100%" 
                                        style={{ borderRadius: '8px' }} 
                                    />
                                )
                            )}
                        </Box>

                        {/* Improvement Steps Column */}
                        <Box
                            mx={4}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            my={{ base: "5", xl: 0 }}
                            width={{ base: "100%", xl: "40%" }} // Adjust width for responsiveness
                        >
                            <ImprovementSteps />
                        </Box>
                    </Flex>

                    {/* Transcription Component */}
                    <Box>
                        <TranscriptionComponent />
                    </Box>
                </Flex>
            </Layout>
        </>
    );
}
