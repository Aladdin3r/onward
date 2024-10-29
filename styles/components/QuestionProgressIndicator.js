// QuestionProgressIndicator component

import { Box, HStack, Stack } from "@chakra-ui/react";


const QuestionProgressIndicator = ({ totalSteps = 5, currentStep = 0 }) => {
  return (
    <HStack>
      {/* Wrapper for the white backdrop with shadow */}
      <Box
        width={`${(totalSteps * 24) + ((totalSteps - 1) * 18)}px`} // adjust width based on number of indicators and spacing
        height="20px"
        borderRadius="full"
        bg="white"
        boxShadow="md"
      >
        <HStack spacing={2} align="center" justify="center" position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <Box
              key={index}
              width="24px"
              height="8px"
              borderRadius="full"
              bg={index === currentStep ? "brand.pastelBlue" : "brand.blueberryCreme"}
              boxShadow={index === currentStep ? "sm" : "none"}
            />
          ))}
        </HStack>
      </Box>
    </HStack>
  );
};

export default QuestionProgressIndicator;
