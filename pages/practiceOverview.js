import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Head from "next/head";
import { Box, Center, Spinner, Text, Flex, Button} from "@chakra-ui/react";
import Layout from "@/styles/components/Layout";
import ImprovementSteps from "@/styles/components/ImprovementSteps";
import TranscriptionComponent from "@/styles/components/FullTranscriptionCard";
import LayoutSim from "@/styles/components/LayoutSim.js"
import { useRouter } from 'next/router';

export default function PracticeInterviewOverview() {
    const [videoUrl, setVideoUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

        const router = useRouter();
        // const { question } = router.query;
    
        const handleOverviewClick = () => {
            router.push({
                pathname: '/practiceOverview',
            });
        };
        const handleEndClick = () => {
            router.push({
                pathname: '/',
            });
        };
    
        const handleNextClick = () => {
            router.push({
                pathname: '/practice-interview-questions-2',
            });
        };

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
            <LayoutSim>
                <Flex direction="column" p={4} mx="10em">
                    <Flex
                        justifyContent={"center"}
                        alignItems="flex-start"
                        flexDirection={{base: "column", xl: "row"}}
                        columnGap="0em"
                        w="100%"
                        mt="0em"
                    >
                        <Box
                            maxW="600px"
                            mb={6}
                            p={2}
                            boxShadow="md"
                            borderRadius="15"
                            border="1px"
                            borderColor="#E6EAF2"
                            bg="white"
                            overflow="hidden"
                            width="100%"
                            ml="4em"
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
                        </Box>

                        <Box display="flex" alignItems="center" justifyContent="center" my={{base: "5", xl:0}} width="100%">
                            <ImprovementSteps />
                        </Box>
                    </Flex>
                    <Box width="100%">
                        <TranscriptionComponent />
                    </Box>
                </Flex>
                <Flex 
                        flexDirection={"row"} 
                        justify={"space-between"} 
                        mt={"auto"} 
                        px="4em"
                         mb="20px"
                    >
                        <Button bg={"brand.pureWhite"} size="xxs" width={"6rem"} p={2} py="2.5" border={"1px"} borderColor={"red"}
                                onClick={handleEndClick}
                                _hover={{
                                    bg: "brand.pureWhite",
                                    color: "red",
                                    border:"1px",
                                    borderColor:"red"
                                }}>End</Button>
                    {/* <Button bg={"brand.blushPink"} size="xs" color={"white"} py={"1.5rem"} px={"5rem"} boxShadow={"md"}
                        onClick={handleOverviewClick}
                        _hover={{
                            bg: "white",
                            color: "brand.blushPink",
                            border: "1px",
                            boxShadow:"md"
                        }}
                    > 
                        Finish
                    </Button> */}
                    </Flex>
            </LayoutSim>
        </>
    );
}

// import Head from "next/head";
// import styles from "@/styles/Home.module.css";
// import "@/styles/theme";
// import { Box, Flex } from "@chakra-ui/react";
// import TopNav from "@/styles/components/TopNav";
// import { SideNavBar } from "@/styles/components/SideNav";
// import ProgressBar from "@/styles/components/ProgressBar";
// import { useRouter } from 'next/router';
// import TranscriptionComponent from "@/styles/components/FullTranscriptionCard";
// import ImprovementSteps from "@/styles/components/ImprovementSteps";
// import VideoWQuestionCard from "@/styles/components/VideoWQuestionCard";
// import Layout from "@/styles/components/Layout";
// import Header from "@/styles/components/Header";
// import QuestionProgressIndicator from "@/styles/components/QuestionProgressIndicator";
// import ArrowControls from "@/styles/components/ArrowControls";
// import LayoutSim from "@/styles/components/LayoutSim";

// // need to fix spacing between the cards

// export default function PracticeInterviewOverview() { 
//     const router = useRouter();

//     return (
//         <>
//             <Head>
//                 <title>Practice Interview — Onward</title>
//                 <meta name="description" content="Onward is an AI-powered personal interview coach designed to help nurses, particularly those new to the Canadian healthcare system, excel in job interviews." />
//                 <meta name="viewport" content="width=device-width, initial-scale=1" />
//                 <link rel="icon" href="/favicon.ico" />
//             </Head>
//             <LayoutSim >
//                     <Flex direction="column" p={4} mx="10em">
//                         <Flex 
//                             justifyContent={"center"}
//                             alignItems="flex-start"
//                             flexDirection={{base: "column", xl: "row"}}
//                             columnGap="0em"
//                             w="100%"
//                         >
//                             <Flex  flexDirection={"column"} alignItems="center" justifyContent="center" gap={"0.5rem"} width="100%">
//                                 <VideoWQuestionCard />
//                                 <QuestionProgressIndicator/>
//                                 <ArrowControls/>
//                             </Flex>
//                             <Box  display="flex" alignItems="center" justifyContent="center" my={{base: "5", xl:0}} width="100%">
//                                 <ImprovementSteps />
//                             </Box>
//                         </Flex>

//                         <Flex
//                             justifyContent={"center"}
//                             alignItems="flex-start"                       
//                         >
//                             <TranscriptionComponent />
//                         </Flex>
//                     </Flex>
//             </LayoutSim>
//         </>
//     );
// };
