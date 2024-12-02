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

function PracticeAnalysis() {
  const [videoUrl, setVideoUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [error, setError] = useState(null);
  const [answerAnalysis, setAnswerAnalysis] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const storedQuestions = localStorage.getItem("questions");
    if (storedQuestions) {
        try {
            const parsedQuestions = JSON.parse(storedQuestions);
            setQuestions(parsedQuestions);
            if (parsedQuestions.length > 0) {
                console.log("First Question:", parsedQuestions);
            } else {
                console.warn("Questions array is empty.");
            }
        } catch (error) {
            console.error("Error parsing questions from localStorage:", error);
        }
      }
  }, []);

  useEffect(() => {
    const storedAnalysis = localStorage.getItem("answerAnalysis");
  
    try {
      // Parse the stored analysis from localStorage
      const parsedAnalysis = storedAnalysis ? JSON.parse(storedAnalysis) : {};
  
      // Ensure the parsed data contains the 'answer' key
      if (parsedAnalysis.answer) {
        setAnswerAnalysis(parsedAnalysis.answer); // Set the 'answer' key directly in state
      } else {
        console.warn("No 'answer' field found in stored analysis.");
        setAnswerAnalysis([]); // Default to an empty array if no 'answer' field exists
      }
    } catch (error) {
      console.error("Error parsing stored analysis:", error);
      setAnswerAnalysis([]); // Reset to empty array if parsing fails
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
              w="50%"
              mt="0em"
              mb={6}
              p={2}
            >
              <Box
                maxW="70%"
                mb={4}
                p={2}
                boxShadow="md"
                borderRadius="15"
                border="1px"
                borderColor="#E6EAF2"
                bg="white"
                overflow="hidden"
                width="60%"
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
                mb={4}
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

              {/* Response  */}
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
                    {answerAnalysis ? (
                        <Box>
                          <Flex flexDir={"row"} justifyContent={"space-between"}>
                            <Heading as="h3" size="10pt" mb={4}>
                              Your Answer:
                            </Heading>
                            <Heading as="h3" size="10pt" mb={4}>
                              {currentQuestionIndex + 1}/{questions.length}
                            </Heading>
                          </Flex>
                          <Box
                            dangerouslySetInnerHTML={{
                              __html: answerAnalysis.answer || "No answer available.",
                            }}
                            overflow={"scroll"}
                            height={"50%"}
                          />
                        </Box>
                      ) : (
                        <Text pt="2" fontSize="18pt">
                          No questions available. Please try again.
                        </Text>
                      )}
                    </Stack>
                  </CardBody>
                </Card>

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
            <Flex flexDirection="column" gap={2} w="48%" mt="0em" mr={0} mb={6} pt={4} px={"1rem"} bgColor={"white"} overflow={"scroll"} borderBottomRadius={"15"} boxShadow={"md"}>
              <Box>
                <Heading as="h2" size={"xs"} my={4}>
                  Detailed Analysis
                </Heading>
              </Box>

              {answerAnalysis ? (
                <Box>
                  {answerAnalysis ? (
                    <>
                      {/* Overall Feedback */}
                      <Box
                        border="1px"
                        borderColor="brand.blueberryCreme"
                        borderRadius="md"
                        px={4}
                        py={2}
                        mb={4}
                      >
                        <Heading as="h4" size="10pt" mb={2}>
                          Overall Feedback:
                        </Heading>
                        <Text>
                          {answerAnalysis.overallFeedback || "No overall feedback available."}
                        </Text>
                      </Box>

                      {/* Detailed Feedback Sections */}
                      <Box
                        border="1px"
                        borderColor="brand.blueberryCreme"
                        borderRadius="md"
                        px={4}
                        py={2}
                        mb={4}
                      >
                        <Heading as="h4" size="10pt">Clarity:</Heading>
                        <Text>
                          {answerAnalysis.detailedFeedback?.clarity || "No feedback available"}
                        </Text>
                        <Heading as="h4" size="10pt" mt={2}>
                          Relevance:
                        </Heading>
                        <Text>
                          {answerAnalysis.detailedFeedback?.relevance || "No feedback available"}
                        </Text>
                        <Heading as="h4" size="10pt" mt={2}>
                          Effectiveness:
                        </Heading>
                        <Text>
                          {answerAnalysis.detailedFeedback?.effectiveness || "No feedback available"}
                        </Text>
                      </Box>

                      {/* Grammar and Syntax */}
                      <Box
                        border="1px"
                        borderColor="brand.blueberryCreme"
                        borderRadius="md"
                        px={4}
                        py={2}
                        mb={4}
                      >
                        <Heading as="h4" size="10pt">Grammar & Syntax:</Heading>
                        <Text>
                          {answerAnalysis.detailedFeedback?.grammarAndSyntax || "No feedback available"}
                        </Text>
                        <Heading as="h4" size="10pt" mt={2}>
                          Language Refinement:
                        </Heading>
                        <Text>
                          {answerAnalysis.detailedFeedback?.languageRefinement || "No feedback available"}
                        </Text>
                        <Heading as="h4" size="10pt">STAR Method:</Heading>
                        <Text>
                          {answerAnalysis.detailedFeedback?.starMethod || "No feedback available"}
                        </Text>
                      </Box>

                      {/* Filler Words and Power Words */}
                      <Flex gap={2} mb={4}>
                        <Box
                          border="1px"
                          borderColor="brand.blueberryCreme"
                          borderRadius="md"
                          px={4}
                          py={2}
                          flex={1}
                        >
                          <Heading as="h4" size="10pt">Filler Words:</Heading>
                          {answerAnalysis.detailedFeedback?.fillerAndPowerWords?.fillerWords?.length >
                          0 ? (
                            answerAnalysis.detailedFeedback.fillerAndPowerWords.fillerWords.map(
                              (word, i) => <Text key={i}>{word}</Text>
                            )
                          ) : (
                            <Text>No filler words identified. Great Job!</Text>
                          )}
                        </Box>
                        <Box
                          border="1px"
                          borderColor="brand.blueberryCreme"
                          borderRadius="md"
                          px={4}
                          py={2}
                          flex={1}
                        >
                          <Heading as="h4" size="10pt">Power Words:</Heading>
                          {answerAnalysis.detailedFeedback?.fillerAndPowerWords?.powerWords?.length >
                          0 ? (
                            answerAnalysis.detailedFeedback.fillerAndPowerWords.powerWords.map(
                              (word, i) => <Text key={i}>{word}</Text>
                            )
                          ) : (
                            <Text>
                              Consider using power words to make your answers more effective and
                              impactful!
                            </Text>
                          )}
                        </Box>
                      </Flex>

                      {/* STAR Method and Feedback */}
                      <Box
                        border="1px"
                        borderColor="brand.blueberryCreme"
                        borderRadius="md"
                        px={4}
                        py={2}
                      >
                        <Heading as="h4" size="10pt" mt={2}>
                          What Worked Well:
                        </Heading>
                        <Text>
                          {answerAnalysis.detailedFeedback?.whatWorkedWell || "No feedback available"}
                        </Text>
                        <Heading as="h4" size="10pt" mt={2}>
                          Room for Improvements:
                        </Heading>
                        <Text>
                          {answerAnalysis.detailedFeedback?.roomForImprovements || "No feedback available"}
                        </Text>
                        <Heading as="h4" size="10pt" mt={2}>
                          Next Steps to Success:
                        </Heading>
                        <Text>
                          {answerAnalysis.detailedFeedback?.nextStepsToSuccess || "No feedback available"}
                        </Text>
                      </Box>
                    </>
                  ) : (
                    <Text>No analysis found for the current question.</Text>
                  )}
                </Box>
              ) : (
                <Text>Loading detailed analysis...</Text>
              )}
            </Flex>

          </Flex>
        </Flex>        
      </LayoutSim>
    </>
  );
}

const DynamicPracticeAnalysis = dynamic(
  () => Promise.resolve(PracticeAnalysis),
  { ssr: false }
);

export default DynamicPracticeAnalysis;