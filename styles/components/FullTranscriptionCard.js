import { Box, Text, VStack, Divider, HStack } from "@chakra-ui/react";

const TranscriptionComponent = () => {
  return (
    <Box mt={0} maxW="1086px" mx="auto">
    <Text fontWeight="semibold" fontSize="20px" mb={0} ml={1} bg="white" zIndex={1} position="relative" maxW="100%">
    Full Transcription
  </Text>
    <Box mt={2} maxW="1086px" mx="auto" border="1px" borderColor="#E6EAF2" borderRadius="md" boxShadow="md">
      <Box p={4} bg="white" borderRadius="md">
        <VStack spacing={4} align="stretch">
          <HStack spacing={4} align="flex-start">
            <Text fontWeight="bold" color="gray.600" minW="120px">
              Interviewer
            </Text>
            <Box>
              <Text color="#959595" fontSize="14px" fontWeight="normal" minW="80px">
                00:01:10.000
              </Text>
              <Text>
                Thank you for joining us today. To start, could you tell us a bit about your background and experience in nursing?
              </Text>
            </Box>
          </HStack>

          <Divider />

          <HStack spacing={4} align="flex-start">
            <Text fontWeight="bold" color="purple.500" minW="120px">
              You
            </Text>
            <Box>
              <Text color="#959595" fontSize="14px" fontWeight="normal" minW="80px">
                00:01:35.000
              </Text>
              <Text>
                Of course. I've been a registered nurse for about five years, primarily working in a hospital setting. I started my career in the <Text as="span" color="red.500" fontWeight="bold">medical–surgical unit</Text>, where I developed a strong foundation in patient care, clinical skills, and teamwork. Over the years, I've also worked in the emergency department, which has allowed me to enhance my critical thinking and adaptability, especially in high-pressure situations. I'm passionate about providing compassionate, patient-centered care and always strive to advocate for my patients' needs.
              </Text>
            </Box>
          </HStack>

          <Divider />

          <HStack spacing={4} align="flex-start">
            <Text fontWeight="bold" color="gray.600" minW="120px">
              Interviewer
            </Text>
            <Box>
              <Text color="#959595" fontSize="14px" fontWeight="normal" minW="80px">
                00:01:10.000
              </Text>
              <Text>
                Thank you for joining us today. To start, could you tell us a bit about your background and experience in nursing?
              </Text>
            </Box>
          </HStack>
        </VStack>
      </Box>
    </Box>
    </Box>
  );
};

export default TranscriptionComponent;
