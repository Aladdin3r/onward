import React, { useState } from "react";
import { Button, Box, Flex, Text } from "@chakra-ui/react";
import { Info } from "@phosphor-icons/react";
import RecordCamera from "@/styles/components/Camera";
import { useRouter } from "next/router";
import nursingInterviewQuestions from "@/data/interviewQuestions";
import Layout from "@/styles/components/Layout";

export default function MockInterviewQuestionPage() {
  const router = useRouter();
  const [isInfoVisible, setInfoVisible] = useState(false);

  const getRandomQuestion = () => {
    const randomCategory =
      nursingInterviewQuestions[
        Math.floor(Math.random() * nursingInterviewQuestions.length)
      ];
    return randomCategory.questions[
      Math.floor(Math.random() * randomCategory.questions.length)
    ];
  };

  const startInterview = () => {
    const randomCategory =
      nursingInterviewQuestions[
        Math.floor(Math.random() * nursingInterviewQuestions.length)
      ];
    const randomQuestion =
      randomCategory.questions[
        Math.floor(Math.random() * randomCategory.questions.length)
      ];

    router.push({
      pathname: "/mock-interview-start",
      query: { question: randomQuestion },
    });
  };

  return (
    <>
      <Layout showTopNav={true} pageTitle="Mock Interview">
        <Flex
          direction="column" 
          align="center" 
          width="100%"
        >
          {/* Header Section */}
          <Flex direction="column" align="start" width="100%" p={6}>
            <Flex
              direction="row"
              align="center"
              width="100%"
              maxW="800px"
              mt={10}
              position="relative"
            >
              <Text fontSize="md" fontWeight="medium" textAlign="left">
                Welcome to the{" "}
                <Box as="span" fontWeight="extrabold">
                  Mock Interview!
                </Box>
              </Text>

              {/* Clickable Info Icon */}
              <Box
                ml={4}
                as="span"
                cursor="pointer"
                onClick={() => setInfoVisible(!isInfoVisible)}
              >
                <Info size={24} />
              </Box>

              {/* Info Popup */}
              {isInfoVisible && (
                <Box
                  position="absolute"
                  top="100%"
                  right={-10}
                  bg="white"
                  border="1px solid"
                  borderColor="gray.200"
                  boxShadow="lg"
                  borderRadius="md"
                  p={4}
                  mt={2}
                  zIndex="10"
                  maxW="600px"
                >
                  <Flex justify="space-between" align="center" mb={2}>
                    <Text fontSize="sm" fontWeight="semibold">
                      About Mock Interview
                    </Text>
                    {/* Close Icon */}
                    <Text
                      as="span"
                      cursor="pointer"
                      fontWeight="bold"
                      onClick={() => setInfoVisible(false)}
                    >
                      ✕
                    </Text>
                  </Flex>
                  <Text fontSize="xxs" color="gray.700" mb={2}>
                    This feature closely mimics a real-life healthcare interview to
                    help you prepare effectively. You’ll see each question only once
                    and respond by speaking aloud, rather than typing.
                  </Text>
                  <Text fontSize="xxs" color="gray.700" mb={2}>
                    <strong>Unlike Practice Interviews:</strong> Mock Interviews
                    don’t allow customization options, encouraging you to think on
                    your feet and practice answering naturally.
                  </Text>
                  {/* <Text fontSize="xxs" color="gray.700">
                    <strong>Interview Length:</strong> Typically lasts between <strong>20 to
                    60 minutes</strong>, adapting to your pace for a realistic experience.
                  </Text> */}
                </Box>
              )}
            </Flex>

            {/* Description */}
            <Text
              fontSize="sm"
              color="gray.600"
              textAlign="left"
              width="100%"
              mt={1}
              mb={5}
            >
              This feature closely mimics a real-life healthcare interview to help
              you prepare effectively.
            </Text>
          </Flex>

          <Flex
            bg="gray.50"
            // minH="90vh"
            align="center"
            justify="center"
            direction="column"
            gap={7}
          >
            {/* Video Section */}
            <Box
              position="relative"
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="400%"
              maxW="800px"
              mt={9}
            >
              <RecordCamera isRecordingEnabled={false}  isSaveEnabled={false} />
            </Box>

            {/* Button Section */}
            <Button
              bg="brand.blushPink"
              color="white"
              size="sm"
              px={10}
              py={9}
              onClick={startInterview}
              _hover={{
                bg: "white",
                color: "brand.blushPink",
                border: "1px",
                boxShadow: "md",
            }}
            >
              Start Interview
            </Button>
          </Flex>
        </Flex>
      </Layout>
    </>
  );
}