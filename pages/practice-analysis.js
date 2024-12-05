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


export default function PracticeAnalysis() {
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
                console.log("First Question:", parsedQuestions);
            } else {
                console.warn("Questions array is empty.");
            }
        } catch (error) {
            console.error("Error parsing questions from localStorage:", error);
        }
      }
  }, []);

  // FOR DEMO prepopulated analysis
  const answerAnalysis = [
    {
      question: "Can you describe a situation where you had to prioritize multiple patient needs in a fast-paced environment? How did you manage it?",
      answer: "<span style='color: #EA4A4D;'> Um, well, </span> there was this time in the ER where, <span style='color: #EA4A4D;'>uh,</span> I had a patient with chest pain, and I had to, <span style='color: #EA4A4D;'>like,</span> focus on them first, and then, <span style='color: #EA4A4D;'>um,</span> I kind of <b>delegated</b> some stuff to others and, you know, tried to make sure everyone got taken care of.",
      expectation: "The skill or quality being assessed.",
      overallFeedback: "Great start! You've identified key actions like prioritizing the patient with chest pain and delegating tasks, which are essential in a fast-paced environment. Let's build on this foundation to present your experience with more confidence and detail.",
      detailedFeedback: [
        {
          clarity: "Your response gives a good sense of the situation, but it can benefit from specific details about the actions you took and the results you achieved. For example, what tasks did you delegate, and how did you ensure patient safety and team coordination?",
          relevance: "Focusing on the high-pressure ER environment is a strong choice for this question. To enhance relevance, tie your actions back to the qualities interviewers are looking for, such as decision-making under pressure and teamwork.",
          effectiveness: "The answer demonstrates an understanding of prioritization and delegation, but adding concrete outcomes (e.g., stabilizing the patient, improving team efficiency) would better showcase your impact.",
          grammarAndSyntax: "The response includes filler words ('um', 'uh', 'like') that may dilute the impact. Instead, consider replacing them with confident phrasing to highlight your skills.",
          fillerAndPowerWords: [
            { fillerWords: ["um", "uh", "like"], fillerWordsCount: 0, powerWords: ["delegated"], powerWordsCount: 1 },
          ],
          languageRefinement: "Consider saying, 'In the ER, I had a patient with chest pain who required immediate attention. I prioritized their care by stabilizing them and communicating with my team to delegate tasks effectively. This ensured all patients received timely and appropriate care.'",
          starMethod: "Try to structure your answer using the STAR method: Describe the Situation, Task, Action, and Result.",
        },
      ],
      whatWorkedWell: "You emphasized the importance of prioritization and delegation, which are critical skills in nursing and clearly demonstrated your ability to manage a high-pressure situation",
      roomForImprovements: "Include specific examples of your actions and their impact to strengthen your response and Replace casual language with professional phrasing to showcase your expertise.",
      nextStepsToSuccess: "Practice describing similar scenarios using the STAR method to structure your answers clearly and effectively. Focus on including measurable outcomes, such as 'reduced patient wait times' or 'ensured team compliance with protocols.' Minimize filler words by practicing responses aloud or using mock interview tools.",
    },
  ];
  
  const handleEndClick = () => {
    router.push({
      pathname: "/practice-interview",
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
        <title>Practice Interview Analysis</title>
      </Head>
      <LayoutSim>
        <Flex direction="column">
          <Flex direction="row" justifyContent="space-between">
            {/* LEFT COLUMN */}
            <Flex flexDirection="column" alignItems="center" w="50%" mt="0em" mb={6} p={2}>
              {/* Video Section */}
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
                  videoUrl && <video src={videoUrl} controls width="100%" style={{ borderRadius: "8px" }} />
                )}
              </Box>
  
              {/* Question and Answer Section */}
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
                <CardBody textAlign="left">
                  <Stack spacing="4" divider={<StackDivider />}>
                    {answerAnalysis.length > 0 ? (
                      <Box>
                        <Flex flexDir={"column"}>
                          <Flex justifyContent="space-between">
                            <Heading size={{ base: "12pt", md: "16pt", "2xl": "18pt" }}>
                              {questions[currentQuestionIndex]?.category || "No question available."} Question
                            </Heading>
                            <Heading as="h3" size="10pt" mb={4}>
                             {currentQuestionIndex + 1}/{answerAnalysis.length}
                            </Heading>
                          </Flex>
                          <Box>
                            <Heading as="h3" size="16pt" mb={4}>
                              {questions[currentQuestionIndex]?.question || "No question available."}
                          </Heading>
                        </Box>

                        </Flex>
                        <Box
                          pt="2"
                          fontSize="16pt"
                          dangerouslySetInnerHTML={{
                            __html: answerAnalysis[currentQuestionIndex]?.answer || "No answer provided.",
                          }}
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
  
              {/* Navigation Buttons */}
              {answerAnalysis.length > 1 && (
                <Flex mt={6} gap={2} width="80%" alignItems="center">
                  {answerAnalysis.map((_, index) => (
                    <Button
                      key={index}
                      borderRadius="md"
                      flexGrow={1}
                      flexBasis={`calc(100% / ${Math.min(answerAnalysis.length, 5)} - 0.5rem)`}
                      height="10px"
                      bg={index === currentQuestionIndex ? "brand.pastelBlue" : "brand.blueberryCreme"}
                      boxShadow={index === currentQuestionIndex ? "md" : "none"}
                      _hover={{ bg: "brand.pastelBlue" }}
                      onClick={() => handleQuestionSelect(index)}
                    />
                  ))}
                </Flex>
              )}
              <Flex 
                  flexDirection={"row"} 
                  mt={"auto"} 
                  px="4em"
                  mb="20px"
                  marginTop="30px"
              >
                  <Button bg={"white"} size="xs" color={"brand.imperialRed"} py={"1.5rem"} px={"5rem"} boxShadow={"md"} border={"1px"} borderColor={"brand.imperialRed"}
                      onClick={handleEndClick}
                      _hover={{
                          bg: "brand.imperialRed",
                          color: "white",
                          border: "1px",
                          boxShadow:"md"
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
              w="48%"
              mt="0em"
              mr={0}
              mb={6}
              py={4}
              px="1rem"
              bgColor="white"
              overflow="scroll"
              borderBottomRadius="15"
              boxShadow="md"
            >
              <Box>
                <Heading as="h2" size="xs" my={4}>
                  Detailed Analysis
                </Heading>
              </Box>
  
              {/* Analysis Details */}
              {answerAnalysis.length > 0 ? (
                <Box>
                  {/* Overall Feedback */}
                  <Box border="1px" borderColor="brand.blueberryCreme" borderRadius="md" px={4} py={2} mb={4}>
                    <Heading as="h4" size="10pt" mb={2}>
                      Overall Feedback:
                    </Heading>
                    <Text>
                      {answerAnalysis[currentQuestionIndex]?.overallFeedback ||
                        "No overall feedback available."}
                    </Text>
                  </Box>
  
                  {/* Clarity, Relevance, and Effectiveness */}
                  <Box border="1px" borderColor="brand.blueberryCreme" borderRadius="md" px={4} py={2} mb={4}>
                    <Heading as="h4" size="10pt">Clarity:</Heading>
                    <Text>
                      {answerAnalysis[currentQuestionIndex]?.detailedFeedback[0]?.clarity || "No feedback available."}
                    </Text>
                    <Heading as="h4" size="10pt" mt={2}>
                      Relevance:
                    </Heading>
                    <Text>
                      {answerAnalysis[currentQuestionIndex]?.detailedFeedback[0]?.relevance || "No feedback available."}
                    </Text>
                    <Heading as="h4" size="10pt" mt={2}>
                      Effectiveness:
                    </Heading>
                    <Text>
                      {answerAnalysis[currentQuestionIndex]?.detailedFeedback[0]?.effectiveness || "No feedback available."}
                    </Text>
                  </Box>
  
                  {/* Grammar & Syntax, Language Refinement, and STAR Method */}
                  <Box border="1px" borderColor="brand.blueberryCreme" borderRadius="md" px={4} py={2} mb={4}>
                    <Heading as="h4" size="10pt">Grammar & Syntax:</Heading>
                    <Text>
                      {answerAnalysis[currentQuestionIndex]?.detailedFeedback[0]?.grammarAndSyntax ||
                        "No feedback available."}
                    </Text>
                    <Heading as="h4" size="10pt" mt={2}>
                      Language Refinement:
                    </Heading>
                    <Text>
                      {answerAnalysis[currentQuestionIndex]?.detailedFeedback[0]?.languageRefinement ||
                        "No feedback available."}
                    </Text>
                    <Heading as="h4" size="10pt">STAR Method:</Heading>
                    <Text>
                      {answerAnalysis[currentQuestionIndex]?.detailedFeedback[0]?.starMethod || "No feedback available."}
                    </Text>
                  </Box>
  
                  {/* Filler Words and Power Words */}
                  <Flex gap={2} mb={4}>
                  <Box border="1px" borderColor="brand.blueberryCreme" borderRadius="md" px={4} py={2} w={"50%"}>
                    <Heading as="h4" size="10pt">Filler Words:</Heading>
                    {answerAnalysis[currentQuestionIndex]?.detailedFeedback?.[0]?.fillerAndPowerWords?.[0]?.fillerWords.length > 0 ? (
                      answerAnalysis[currentQuestionIndex]?.detailedFeedback?.[0]?.fillerAndPowerWords?.[0]?.fillerWords.map((word, index) => (
                        <Text key={index} fontWeight="bold" color="brand.imperialRed">
                          {word}
                        </Text>
                      ))
                    ) : (
                      <Text>No filler words identified. Great Job!</Text>
                    )}
                  </Box>

                  <Box border="1px" borderColor="brand.blueberryCreme" borderRadius="md" px={4} py={2} w={"50%"}>
                    <Heading as="h4" size="10pt">Power Words:</Heading>
                    {answerAnalysis[currentQuestionIndex]?.detailedFeedback?.[0]?.fillerAndPowerWords?.[0]?.powerWords.length > 0 ? (
                      answerAnalysis[currentQuestionIndex]?.detailedFeedback?.[0]?.fillerAndPowerWords?.[0]?.powerWords.map((word, index) => (
                        <Text key={index}>
                          {word} 
                        </Text>
                      ))
                    ) : (
                      <Text>Consider using power words to make your answers more impactful!</Text>
                    )}
                  </Box>
                  </Flex>
  
                  {/* Next Steps and Improvements */}
                  <Box border="1px" borderColor="brand.blueberryCreme" borderRadius="md" px={4} py={2}>
                    <Heading as="h4" size="10pt" mt={2}>
                      What Worked Well:
                    </Heading>
                    <Text>
                      {answerAnalysis[currentQuestionIndex]?.whatWorkedWell ||
                        "No feedback available."}
                    </Text>
                    <Heading as="h4" size="10pt" mt={2}>
                      Room for Improvements:
                    </Heading>
                    <Text>
                      {answerAnalysis[currentQuestionIndex]?.roomForImprovements ||
                        "No feedback available."}
                    </Text>
                    <Heading as="h4" size="10pt" mt={2}>
                      Next Steps to Success:
                    </Heading>
                    <Text>
                      {answerAnalysis[currentQuestionIndex]?.nextStepsToSuccess ||
                        "No feedback available."}
                    </Text>
                  </Box>
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
};  