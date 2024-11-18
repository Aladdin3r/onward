import Head from "next/head";
import styles from "@/styles/Home.module.css";
import "@/styles/theme";
import {
  Heading,
  Box,
  Text,
  VStack,
  Flex,
  Button,
  SimpleGrid,
  Tag,
  Divider,
  Container,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import VideoPlayer from "@/styles/components/VideoPlayer";
import QuestionProgressIndicator from "@/styles/components/QuestionProgressIndicator";
import HighlightFillerWords from "@/styles/components/HighlightFillerWords";
import LanguageToggle from "@/styles/components/LanguageToggle";
import LayoutSim from "@/styles/components/LayoutSim";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function PracticeAnalysis() {
  const [transcript, setTranscript] = useState(null);
  const [videoSrc, setVideoSrc] = useState(null); // New state for video source URL
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching the most recent transcription
        const { data: transcriptData, error: transcriptError } = await supabase
          .from("transcriptions")
          .select("text, video_id")
          .order("created_at", { ascending: false })
          .limit(1);

        if (transcriptError) {
          console.error("Error fetching transcription:", transcriptError);
          throw transcriptError;
        }

        if (transcriptData && transcriptData.length > 0) {
          setTranscript(transcriptData[0].text);
          const videoUrl = transcriptData[0].video_id; // Directly use video_id as the URL

          if (!videoUrl) {
            console.error("No video_id in transcription data.");
            setError("No video URL found in transcription data.");
            return;
          }

          console.log("Fetched video URL: ", videoUrl); // Debugging statement

          setVideoSrc(videoUrl); // Set videoSrc with the full URL from the database

          // Set loading to false after data is fetched
          setLoading(false);
        } else {
          setTranscript("No transcript available.");
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setError("Error fetching transcript.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
                <LanguageToggle />
              </Flex>

              <Flex gap="2.5rem" alignItems="flex-start" px={4}>
                {/* Left Column with Overview and Response Sections */}
                <VStack
                  flex="0.55"
                  spacing={4}
                  alignItems="stretch"
                  width="50%"
                >
                  {/* Overview Section */}
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
                    <Text
                      fontWeight="bold"
                      mb={2}
                      fontSize={{ base: "xxs", lg: "xs", "2xl": "sm" }}
                      color="brand.nightBlack"
                    >
                      QUESTION 1
                    </Text>
                    <Text fontSize="xxs" mb={4} color="brand.nightBlack">
                      Can you describe a time when you were faced with an
                      emergency situation and had to make a quick decision? How
                      did you prioritize tasks, and what steps did you take to
                      ensure the best possible outcome for the patient?
                    </Text>
                  </Box>

                  {/* Styled Blue Bottom Area Positioned as Layered Section */}
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
                      {transcript ? (
                        <HighlightFillerWords answer={transcript} />
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
                      <p>Loading...</p>
                    ) : error ? (
                      <p>Error: {error}</p>
                    ) : (
                      <>
                        <VideoPlayer width="100%" height="100%" />
                      </>
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
                          Prioritizing Critical Tasks
                        </Text>
                        <Text fontSize="xxxs" color="brand.nightBlack">
                          Ask how to prioritize patient care in a crisis.
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
