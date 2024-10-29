// components/VideoQuestion.js
import { Box, Text, VStack, Button } from "@chakra-ui/react";

export default function VideoQuestion() {
  return (
    <Box bg="white" p="4" borderRadius="md" boxShadow="sm">
      {/* Placeholder for video */}
      <Box h="200px" bg="gray.300" borderRadius="md" mb="4" />
      <Text fontWeight="bold">QUESTION 1</Text>
      <Text mt="2" fontSize="sm">
        Can you walk me through a situation where you had to collaborate with an interdisciplinary team?
      </Text>

      {/* Navigation buttons */}
      <VStack mt="4" spacing="2" direction="row" align="center">
        <Button colorScheme="blue" size="sm">Previous</Button>
        <Button colorScheme="blue" size="sm">Next</Button>
      </VStack>
    </Box>
  );
}
