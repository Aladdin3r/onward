import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Head from "next/head";
import { Box, Center, Spinner, Text, Flex, Button, Stack, Heading, Card, CardBody, StackDivider } from "@chakra-ui/react";
import Layout from "@/styles/components/Layout";
import ImprovementSteps from "@/styles/components/ImprovementSteps";
import TranscriptionComponent from "@/styles/components/FullTranscriptionCard";
import LayoutSim from "@/styles/components/LayoutSim.js";
import { useRouter } from "next/router";
import LoadingSpinner from "@/styles/components/LoadingSpinner";

export default function PracticeInterviewOverview() {
  const [videoUrl, setVideoUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedQuestions = localStorage.getItem("questions");
    if (storedQuestions) {
        try {
            const parsedQuestions = JSON.parse(storedQuestions);
            setQuestions(parsedQuestions);
            if (parsedQuestions.length > 0) {
                console.log("First Question:", parsedQuestions[0]); // Log the first question content
            } else {
                console.warn("Questions array is empty.");
            }
        } catch (error) {
            console.error("Error parsing questions from localStorage:", error);
        }
      }
  }, []);


  const handleOverviewClick = () => {
    router.push({
      pathname: "/practiceOverview",
    });
  };
  const handleEndClick = () => {
    router.push({
      pathname: "/",
    });
  };

  const handleNextClick = () => {
    router.push({
      pathname: "/practice-interview-questions-2",
    });
  };

  const handleQuestionSelect = (index) => {
    setCurrentQuestionIndex(index);
};

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        // List files in the 'videos' folder
        const { data, error } = await supabase.storage
          .from("onward-video")
          .list("videos", {
            limit: 1,
            offset: 0,
            sortBy: { column: "created_at", order: "desc" }, // Sort by created_at for recent videos
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
          const { data: urlData, error: urlError } = await supabase.storage
            .from("onward-video")
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
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <>
      <Head>
        <title>Practice Interview Overview</title>
      </Head>
      <LayoutSim>
        <Flex direction="column">
          <Flex direction="row" justifyContent={"space-between"}>
            {/* LEFT COLUMN*/}
            <Flex
              flexDirection={"column"}
              alignItems={"center"}
              columnGap="0em"
              w="50%"
              mt="0em"
              mb={6}
              p={2}
            >
              <Box
                maxW="80%"
                mb={6}
                p={2}
                boxShadow="md"
                borderRadius="15"
                border="1px"
                borderColor="#E6EAF2"
                bg="white"
                overflow="hidden"
                width="100%"
              >
                {isLoading ? (
                  <Center height="400px">
                    <LoadingSpinner /> {/* Custom spinner */}
                  </Center>
                ) : error ? (
                  <Center height="400px">
                    <Text fontSize="xl" color="red.500">
                      {error}
                    </Text>
                  </Center>
                ) : (
                  videoUrl && (
                    <video
                      src={videoUrl}
                      controls
                      width="100%"
                      style={{ borderRadius: "8px" }}
                    />
                  )
                )}
              </Box>

              <Card
                boxShadow="md"
                borderRadius="15"
                border="1px"
                borderColor="#E6EAF2"
                bg="white"
                overflow="hidden"
                width="100%"
              >
                <CardBody textAlign={"left"}>
                  <Stack spacing="4" divider={<StackDivider />}>
                    {questions.length > 0 ? (
                      <Box>
                        <Flex flexDir={"row"} justifyContent={"space-between"}>
                          <Heading as="h3" size="10pt" mb={4}>
                            {questions[currentQuestionIndex].category || "General Question"}
                          </Heading>
                          <Heading as="h3" size="10pt" mb={4}>
                            {currentQuestionIndex + 1}/{questions.length}
                          </Heading>
                        </Flex>
                        <Box>
                          <Text pt="2" fontSize="16pt">
                            {questions[currentQuestionIndex].question || "No question text available"}
                          </Text>
                        </Box>
                      </Box>
                    ) : (
                      <Text pt="2" fontSize="18pt">
                        No questions available. Please try again.
                      </Text>
                    )}
                  </Stack>

                  {/* Navigation buttons styled as squares */}
                  {questions.length > 0 && (
                  <Flex mt={6} gap={2} width={"80%"} alignItems={"center"}>
                      {questions.map((_, index) => (
                          <Button
                              key={index}
                              borderRadius="md" 
                              flexGrow={1}
                              flexBasis={`calc(100% / ${Math.min(questions.length, 5)} - 0.5rem)`}
                              height="10px"
                              bg={
                                  index === currentQuestionIndex
                                      ? "brand.pastelBlue"
                                      : "brand.blueberryCreme"
                              }
                              boxShadow={index === currentQuestionIndex ? "md" : "none"}
                              _hover={{ bg: "brand.pastelBlue" }}
                              onClick={() => handleQuestionSelect(index)}
                          >
                          </Button>
                      ))}
                    </Flex>
                  )}
                </CardBody>
              </Card>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                my={{ base: "5", xl: 0 }}
                width="100%"
              >
                <TranscriptionComponent />
              </Box>
              <Flex
                alignSelf={"flex-start"}
                mb={0}
                pt={8}
              >
                <Button
                  bg={"brand.pureWhite"}
                  size="xxs"
                  width={"6rem"}
                  p={2}
                  py="2.5"
                  border={"1px"}
                  borderColor={"red"}
                  onClick={handleEndClick}
                  _hover={{
                    bg: "brand.pureWhite",
                    color: "red",
                    border: "1px",
                    borderColor: "red",
                  }}
                >
                  End
                </Button>
              </Flex>
            </Flex>

            {/* RIGHT COLUMN */}
            <Flex 
              flexDirection={"column"}
              gap={2}
              w="48%"
              mt="0em"
              mr={0}
              mb={6}
              pt={4}
              px={"1rem"}
              bgColor={"white"}
              overflow={"scroll"}
              borderBottomRadius={"md"}
              boxShadow={"md"}
            >
                <Box>
                  <Heading as="h2" size={"xs"} mb={4}>
                    Detailed Analysis
                  </Heading>
                </Box>
                <Box border={"1px"} borderColor={"brand.blueberryCreme"} borderRadius={"md"} px={4} py={2}>
                  <Heading as="h4" size="10pt">
                    Overall:
                  </Heading>
                  <Text>
                    Start with encouragement, then offer constructive suggestions for improvement.
                  </Text>
                </Box>
                <Box border={"1px"} borderColor={"brand.blueberryCreme"} borderRadius={"md"} px={4} py={2}>
                  <Heading as="h4" size="10pt">
                    Clarity:
                  </Heading>
                  <Text>
                    Suggestions to improve phrasing and reduce hesitations.
                  </Text>
                  <Heading as="h4" size="10pt">
                    Relevance:
                  </Heading>
                  <Text>
                    Suggestions to improve phrasing and reduce hesitations.
                  </Text>
                  <Heading as="h4" size="10pt">
                    Effectiveness:
                  </Heading>
                  <Text>
                    Suggestions to improve phrasing and reduce hesitations.
                  </Text>
                </Box>

                <Box border={"1px"} borderColor={"brand.blueberryCreme"} borderRadius={"md"} px={4} py={2}>
                  <Heading as="h4" size="10pt">
                    Grammar & Syntax:
                  </Heading>
                  <Text>
                    Suggestions to improve phrasing and reduce hesitations.
                  </Text>
                  <Heading as="h4" size="10pt">
                    Language Support:
                  </Heading>
                  <Text>
                    Suggestions to improve phrasing and reduce hesitations.
                  </Text>
                </Box>
                <Flex gap={2}>
                  <Box border={"1px"} borderColor={"brand.blueberryCreme"} borderRadius={"md"} px={4} py={2}>
                    <Heading as="h4" size="10pt">
                      Filler Words:
                    </Heading>
                    <Text>
                      Suggestions to improve phrasing and reduce hesitations.
                    </Text>
                  </Box>
                  <Box border={"1px"} borderColor={"brand.blueberryCreme"} borderRadius={"md"} px={4} py={2}>
                    <Heading as="h4" size="10pt">
                      Power Words:
                    </Heading>
                    <Text>
                      Suggestions to improve phrasing and reduce hesitations.
                    </Text>
                  </Box>
                </Flex>
                <Box border={"1px"} borderColor={"brand.blueberryCreme"} borderRadius={"md"} px={4} py={2}>
                  <Heading as="h4" size="10pt">
                    STAR Method:
                  </Heading>
                  <Text>
                    Suggestions to improve phrasing and reduce hesitations.
                  </Text>
                </Box>
                <Box border={"1px"} borderColor={"brand.blueberryCreme"} borderRadius={"md"} px={4} py={2}>
                  <Heading as="h4" size="10pt">
                    What Worked Well:
                  </Heading>
                  <Text>
                    Suggestions to improve phrasing and reduce hesitations.
                  </Text>
                  <Heading as="h4" size="10pt">
                    Room for Improvements:
                  </Heading>
                  <Text>
                    Suggestions to improve phrasing and reduce hesitations.
                  </Text>
                  <Heading as="h4" size="10pt">
                    Next Steps to Success
                  </Heading>
                  <Text>
                    Suggestions to improve phrasing and reduce hesitations.
                  </Text>
                </Box>
            </Flex>
          </Flex>
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
