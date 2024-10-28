// QuestionCard component

{
    /* USE CASES - adjust question number, and questionText
      <QuestionCard
        questionNumber={1}
        questionText="Can you walk me through a situation where you had to collaborate with the interdisciplinary team during a code blue to ensure timely administration of ACLS protocols and coordinate care post-resuscitation, including any challenges with the EMR documentation?"
      />
  
      <QuestionCard
        questionNumber={2}
        questionText="Can you describe a time when you were faced with an emergency situation and had to make a quick decision? How did you prioritize tasks, and what steps did you take to ensure the best possible outcome for the patient?"
      /> */
  }
  
  import { Box, Text } from "@chakra-ui/react";
  
  // placeholder QUESTION # and Text
  const QuestionCard = ({
    questionNumber = 1,
    questionText = "Here is the question text from the interview",
  }) => {
    return (
      <Box position="relative" width="100%" maxW="600px">
        {/* Main Card Box */}
        <Box
          p={4}
          bg="white"
          borderRadius="lg"
          boxShadow="md"
          width="100%"
          mb={0}
          position="relative"
          zIndex={1}
        >
          <Text fontWeight="bold" fontSize="sm" mb={2}>
            QUESTION {questionNumber}
          </Text>
          <Text lineHeight="1.6" whiteSpace="normal">
            {questionText}
          </Text>
        </Box>
  
        {/* Bottom Accent Box */}
        <Box
          height="30px"
          bg="brand.blueberryCreme"
          borderRadius="0 0 8px 8px"
          boxShadow="md"
          mt="-10px" 
          mx="auto"
          zIndex={0} 
        />
        
      </Box>
    );
  };
  
  export default QuestionCard;
  