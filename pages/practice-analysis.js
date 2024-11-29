import Head from "next/head";
import styles from "@/styles/Home.module.css";
import "@/styles/theme";
import {
  Heading,
  Box,
  Text,
  VStack,
  Flex,
  SimpleGrid,
  Tag,
  Divider,
  Container,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import LoadingSpinner from "@/styles/components/LoadingSpinner";
import HighlightFillerWords from "@/styles/components/HighlightFillerWords";
import LayoutSim from "@/styles/components/LayoutSim";
import QuestionProgressIndicator from "@/styles/components/QuestionProgressIndicator";

export default function VideoWithTranscriptions() {
  const [videoUrl, setVideoUrl] = useState(null); // State for video URL
  const [transcript, setTranscript] = useState([]); // State for transcriptions
  const [error, setError] = useState(null); // State for error handling
  const [analysisData, setAnalysisData] = useState(null); // Store analysis data
  const [currentQuestionId, setCurrentQuestionId] = useState(1); // Current Question ID
  const [loading, setLoading] = useState(true); // Loading state

  const GenerateAnalysis = () => {
    const analysis = localStorage.getItem("analysisData");
    return analysis ? JSON.parse(analysis) : null;
  };

  useEffect(() => {
    const data = GenerateAnalysis();
    setAnalysisData(data); // Set analysis data
  }, []);

  if (!analysisData) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <LoadingSpinner />
      </Flex>
    );
  }

  const currentAnalysis = analysisData.find(
    (item) => item["Question Id"] === `Q${currentQuestionId}`
  );


  useEffect(() => {
    const fetchVideoAndTranscriptions = async () => {
      try {
        // Fetch the latest video from the 'onward-video' bucket
        const { data: videoData, error: videoError } = await supabase.storage
          .from("onward-video")
          .list("videos", {
            limit: 1,
            offset: 0,
            sortBy: { column: "created_at", order: "desc" }, // Sort by created_at for the most recent video
          });
  
        if (videoError) {
          console.error("Error fetching video list:", videoError.message);
          setError("Failed to fetch video list.");
          setLoading(false);
          return;
        }
  
        const videoPath = videoData?.[0]?.name;
        if (videoPath && videoPath !== "emptyFolderPlaceholder") {
          const { data: urlData, error: urlError } = await supabase.storage
            .from("onward-video")
            .getPublicUrl(`videos/${videoPath}`);
  
          if (urlError) {
            console.error("Error fetching video URL:", urlError.message);
            setError("Failed to load video.");
          } else {
            setVideoUrl(urlData.publicUrl);
          }
        } else {
          setError("No valid video found.");
          setLoading(false);
          return;
        }
  
        // Now fetch the latest transcription from the 'transcriptions' table
        const { data: transcriptionData, error: transcriptionError } =
          await supabase
            .from("transcriptions")
            .select("text")
            .order("created_at", { ascending: false }) // Order by created_at for the latest transcription
            .limit(1); // Fetch only the latest transcription
  
        if (transcriptionError) {
          console.error(
            "Error fetching transcriptions:",
            transcriptionError.message
          );
          setError("Failed to fetch transcriptions.");
        } else {
          setTranscript(transcriptionData || []);
        }
  
        setLoading(false);
      } catch (error) {
        console.error("Error fetching video or transcriptions:", error.message);
        setError("Error fetching video or transcriptions.");
        setLoading(false);
      }
    };
  
    fetchVideoAndTranscriptions();
  }, []); // Empty dependency array ensures this only runs once on mount
  

  return (
    <>
      <Head>
        <title>Practice Interview — Onward</title>
        <meta
          name="description"
          content="Onward is an AI-powered personal interview coach designed to help nurses, particularly those new to the Canadian healthcare system, excel in job interviews."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`${styles.page}`}>
        <LayoutSim>
          <Box maxW="100vw" py={6} px={4} overflowX="hidden">
            <Container maxWidth="1920px" mx="auto">
              <Flex
                alignItems="center"
                justifyContent="space-between"
                px={4}
                mb={4}
              >
                <Heading
                  fontSize={{ base: "xs", lg: "md", "2xl": "lg" }}
                  fontWeight="bold"
                  mb={8}
                >
                  Response Analysis
                </Heading>
              </Flex>

              <Flex gap="2.5rem" alignItems="flex-start" px={4}>
                {/* Left Column with Overview and Response Sections */}
                <VStack
                  flex="0.55"
                  spacing={4}
                  alignItems="stretch"
                  width="50%"
                >
                  <Text
                    fontSize={{ base: "xxs", lg: "xs", "2xl": "sm" }}
                    color="nightBlack"
                  >
                    Overview
                  </Text>
                  <Box
                    bg="white"
                    p={4}
                    borderRadius="15"
                    w="100%"
                    boxShadow="md"
                    position="relative"
                  >
                    <Text fontWeight="bold" mb={2} fontSize="sm" color="gray.800">
                      {currentAnalysis["Question Id"]}
                    </Text>
                    <Text fontSize="sm" mb={4} color="gray.600">
                      {currentAnalysis.Expectation}
                    </Text>
                  </Box>

                  <Flex gap={1} mx={"auto"}>
                    <QuestionProgressIndicator totalSteps={5} currentStep={0} />
                  </Flex>

                  {/* Your Response Box */}
                  <Box bg="white" borderRadius="15" boxShadow="md" mb={50}>
                    <Box p={4} borderBottomWidth="1px">
                      <Text
                        fontWeight="bold"
                        fontSize={{ base: "xxs", lg: "xs", "2xl": "sm" }}
                      >
                        Your Response
                      </Text>
                    </Box>
                    <Box p={4} maxW="820px">
                      {transcript && transcript.length > 0 ? (
                        <Text fontSize="xxs" color="brand.nightBlack">
                          {transcript.map((item, index) => (
                            <span key={index}>{item.text} </span> // Assuming transcript items have a "text" property
                          ))}
                        </Text>
                      ) : (
                        <Text fontSize="xxs" color="brand.nightBlack">
                          Loading transcript...
                        </Text>
                      )}
                    </Box>
                  </Box>

                  {/* Filler and Relevant Words */}
                  <SimpleGrid columns={2} spacing={4}>
                    <Box
                      bg="brand.frostWhite"
                      p={4}
                      borderRadius="15"
                      boxShadow="md"
                    >
                      <Text
                        fontWeight="bold"
                        mb={2}
                        fontSize={{ base: "xxs", lg: "xs", "2xl": "sm" }}
                      >
                        Filler Words{" "}
                        <Tag colorScheme="red" ml={1} mt={2}>
                          !
                        </Tag>
                      </Text>
                      <Text fontSize="xxs" color="brand.nightBlack">
                        Um - used 7 times in your response
                      </Text>
                      <Text fontSize="xxs" color="brand.nightBlack">
                        Like - used 3 times in your response
                      </Text>
                    </Box>

                    <Box bg="gray.50" p={4} borderRadius="15" boxShadow="md">
                      <Text
                        fontWeight="bold"
                        mb={2}
                        fontSize={{ base: "xxs", lg: "xs", "2xl": "sm" }}
                      >
                        Relevant Words
                      </Text>
                      <Text fontSize="xxs" color="brand.nightBlack" mb={5}>
                        <strong>Heart Attack</strong> - empathy, bedside manner,
                        patient safety, patient-centered approach
                      </Text>
                      <Text fontSize="xxs" color="brand.nightBlack" mb={5}>
                        <strong>Intubation</strong> - medical knowledge,
                        communication, team-oriented approach
                      </Text>
                    </Box>
                  </SimpleGrid>
                </VStack>

                {/* Right Column with Video Player */}
                <VStack flex="0.45" spacing={4} alignItems="stretch">
                  <Text
                    fontSize={{ base: "xxs", lg: "xs", "2xl": "sm" }}
                    fontWeight="bold"
                    color="nightBlack"
                  >
                    Video Analysis
                  </Text>

                  <Box
                    bg="white"
                    p={4}
                    borderRadius="15"
                    boxShadow="md"
                    position="relative"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    w="100%"
                  >
                    {loading ? (
                      <Box height="400px">
                        <LoadingSpinner />
                      </Box>
                    ) : error ? (
                      <Box height="400px">
                        <Text fontSize="xl" color="red.500">
                          {error}
                        </Text>
                      </Box>
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

                  {/* Suggested Topics */}
                  <Box
                    bg="white"
                    p={4}
                    borderRadius="15"
                    boxShadow="md"
                    mb={5}
                    pb={6}
                  >
                    <Text
                      fontWeight="bold"
                      mb={4}
                      fontSize={{ base: "xxs", lg: "xs", "2xl": "sm" }}
                    >
                      Suggested Topics
                    </Text>
                    <Divider mb={4} />
                    <VStack align="stretch" spacing={5}>
                      <Box>
                        <Text
                          fontWeight="bold"
                          fontSize={{ base: "xxs", lg: "xs", "2xl": "sm" }}
                          color="gray.600"
                          mb={5}
                        >
                          Question 1
                        </Text>
                        <Text
                          fontWeight="bold"
                          fontSize={{ base: "xxs", lg: "xs", "2xl": "sm" }}
                          color="brand.nightBlack"
                        >
                          Patient–Centered Care:
                        </Text>
                        <Text fontSize="xxxs" color="brand.nightBlack">
                          Ask about handling unexpected patient needs.
                        </Text>
                      </Box>

                      <Box>
                        <Text
                          fontWeight="bold"
                          fontSize={{ base: "xxs", lg: "xs", "2xl": "sm" }}
                          color="gray.600"
                          mb={5}
                        >
                          Question 2
                        </Text>
                        <Text
                          fontWeight="bold"
                          fontSize={{ base: "xxs", lg: "xs", "2xl": "sm" }}
                          color="brand.nightBlack"
                        >
                          Effective Communication:
                        </Text>
                        <Text fontSize="xxxs" color="brand.nightBlack">
                          Focus on teamwork and clear communication in urgent
                          situations.
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
