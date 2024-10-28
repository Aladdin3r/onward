import { Box, Text, VStack, Button, HStack } from "@chakra-ui/react";
import Image from "next/image";

export default function ImprovementSteps() {
  const steps = [
    {
      title: "Reduce Filler Words",
      description: "Limit filler words for clearer, more confident responses.",
      alert: true,
    },
    {
      title: "Highlight Relevant Experiences",
      description: "Emphasize skills that align with the job requirements.",
      alert: true,
    },
    {
      title: "Ask Insightful Questions",
      description: "Show interest by preparing thoughtful questions.",
      alert: false,
    },
  ];

  return (
    <Box
      p="6"
      bg="white"
      boxShadow="md"
      maxW="lrg"
      minH="400px"
      mt=""
      border="1px" 
      borderColor="#E6EAF2" 
      borderRadius="md" 
      mr=''
    >
      <Text fontSize="20px" fontWeight="semibold" color="#4B00B5" mb="6">
        Steps to Improve Your Interview
      </Text>

      <VStack align="start" spacing="10">
        {steps.map((step, index) => (
          <HStack key={index} align="start" spacing="3">
            <Image
              src="/stepsIcon.png"
              alt="Step Icon"
              width={49} 
              height={49}
            />

            <Box>
              <Text fontWeight="semibold" color="gray.800">
                {step.title}
                {/* {step.alert && (
                  <Text as="span" color="red.500" ml="1">
                    {" "}⚠️
                  </Text>
                )} */}
              </Text>
              <Text color="gray.600" fontSize="16px" fontWeight="light">
                {step.description}
              </Text>
            </Box>
          </HStack>
        ))}
      </VStack>

      <Button
        mt="6"
        bg="#EA4A7D"
        color='#FFFFFF'
        width="100%"
        fontWeight="semibold"
        fontSize={14}
        borderRadius="full"
      >
        View Detailed Analysis
      </Button>
    </Box>
  );
}
