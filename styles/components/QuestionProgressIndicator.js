// QuestionProgressIndicator component
import { Box, HStack } from "@chakra-ui/react";
const QuestionProgressIndicator = ({ totalSteps = 5, currentStep = 0 }) => {
  return (
    <HStack spacing={2} align="center" justify="center" mt={2} mb={4}>
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
  );
};
export default QuestionProgressIndicator;

