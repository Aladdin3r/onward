import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Head from "next/head";
import { Box, Center, Spinner, Text, Flex } from "@chakra-ui/react";
import Layout from "@/styles/components/Layout";
import ImprovementSteps from "@/styles/components/ImprovementSteps";
import TranscriptionComponent from "@/styles/components/FullTranscriptionCard";

export default function PracticeInterviewOverview() {
    const [videoUrl, setVideoUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                // List files in the 'videos' folder
                const { data, error } = await supabase
                    .storage
                    .from('onward-video')
                    .list('videos', {
                        limit: 1,
                        offset: 0, 
                        sortBy: { column: 'created_at', order: 'desc' }, // Sort by created_at for recent videos
                    });
                
                if (error) {
                    console.error("Error fetching video list:", error.message);
                    setError("Failed to fetch video list.");
                    return;
                }

                // Check if there's a valid video file or an empty placeholder
                const videoPath = data?.[0]?.name;
                if (videoPath && videoPath !== "emptyFolderPlaceholder") {
                    console.log("Fetching video from path:", `videos/${videoPath}`);
                    const { data: urlData, error: urlError } = await supabase
                        .storage
                        .from('onward-video')
                        .getPublicUrl(`videos/${videoPath}`);
                    
                    if (urlError) {
                        setError("Failed to load video.");
                        console.error("Error fetching video URL:", urlError.message);
                    } else {
                        setVideoUrl(urlData.publicUrl);
                    }
                } else {
                    setError("No valid video found.");
                }

                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching video:", error.message);
                setError("Error fetching video.");
                setIsLoading(false);
            }
        };

        // Initial fetch when the component is mounted
        fetchVideo();

        // Polling every 5 seconds for new videos
        const intervalId = setInterval(fetchVideo, 5000);

        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);

    }, []);  // Empty dependency array ensures this runs once on mount

    return (
        <>
            <Head>
                <title>Practice Interview Overview</title>
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
                      <Box
                            width={{ base: "100%", xl: "60%" }}
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
                                    <video src={videoUrl} controls width="100%" style={{ borderRadius: '8px' }} />
                                )
                            )}
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
}