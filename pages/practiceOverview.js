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
import dynamic from "next/dynamic";

function PracticeInterviewOverview() {
  const [videoUrl, setVideoUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [questions, setQuestions] = useState([]); 
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);  
    const [answerAnalysis, setAnswerAnalysis] = useState([]);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
      if (typeof window !== "undefined") {
          const storedQuestions = localStorage.getItem("questions");
          if (storedQuestions) {
              try {
                  const parsedQuestions = JSON.parse(storedQuestions);
                  setQuestions(parsedQuestions || []); // Ensure questions is always an array
              } catch (error) {
                  console.error("Error parsing questions from localStorage:", error);
              }
          }
      }
  }, []);


    useEffect(() => {
      const storedAnalysis = localStorage.getItem("answerAnalysis");
      if (storedAnalysis) {
        try {
          const parsedAnalysis = JSON.parse(storedAnalysis); 
          if (typeof parsedAnalysis.answer === "string") {
            parsedAnalysis.answer = JSON.parse(parsedAnalysis.answer);
          }
          setAnswerAnalysis(parsedAnalysis); 
          console.log("Parsed Analysis:", parsedAnalysis);
        } catch (err) {
          console.error("Error parsing answerAnalysis:", err);
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
          <Flex direction="column" p={4} mx="5em">
          <Flex direction="row" justifyContent={"space-between"}>
              {/* LEFT COLUMN*/}
              <Flex
                flexDirection={"column"}
                alignItems={"center"}
                columnGap="0em"
                w="55%"
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
                                  {questions[currentQuestionIndex]?.category || "General Question"}
                              </Heading>
                              <Heading as="h3" size="10pt" mb={4}>
                                  {currentQuestionIndex + 1}/{questions.length}
                              </Heading>
                          </Flex>
                          <Box>
                              <Text pt="2" fontSize="16pt">
                                  {questions[currentQuestionIndex]?.question || "No question text available"}
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
                flexDirection="column" 
                gap={2} 
                w="40%" 
                mt={2} mr={0} mb={6} 
                pt={4} px={"1rem"} 
                bgColor={"white"} 
                overflow={"scroll"} 
                borderRadius={15} 
                boxShadow={"md"}
                h={"50%"}
              >
                <Box>
                  <Heading as="h2" size={"xs"} mb={4}>
                    Quick Glance:
                  </Heading>
                </Box>
                <ImprovementSteps/>
                    
              </Flex>
            </Flex>
          </Flex>
        </LayoutSim>
      </>
    );
  }

  const DynamicPracticeInterviewOverview = dynamic(() => Promise.resolve(PracticeInterviewOverview), { ssr: false });

  export default DynamicPracticeInterviewOverview;