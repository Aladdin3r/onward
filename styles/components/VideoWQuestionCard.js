import { Box, VStack } from "@chakra-ui/react";
// combines these atom components
import VideoPlayer from "@/styles/components/VideoPlayer";
import ArrowControls from "@/styles/components/ArrowControls";
import QuestionCard from "@/styles/components/QuestionCard";
import QuestionProgressIndicator from "@/styles/components/QuestionProgressIndicator";

const VideoWQuestionCard = ({
  // default props
  questionNumber = 1,
  questionText = "Can you walk me through a situation where you had to collaborate with the interdisciplinary team during a code blue?",
  totalSteps = 5,
  currentStep = 1,
  onPrev,
  onNext,
  onExpand,
  videoSrc = "/images/smiling-girl.png",  
}) => {
  return (
    <Box
      transform="scale(0.86)" // Scale down the entire component
      transformOrigin="bottom" // Scale from the top
      maxW="734px"
      mx="auto"
      p={2} // Reduced padding for smaller size
      boxShadow="md"
      borderRadius="md"      
      border="1px" 
      borderColor="#E6EAF2" 
      bg="white"
      overflow="hidden" // Prevent overflow
    >
      <VStack
        spacing={2} // Reduced spacing for a more compact look
        align="stretch"
      >
        {/* Video Player */}
        <VideoPlayer 
          videoSrc={videoSrc} 
          thumbnail="/images/smiling-girl.png" 
        />
        {/* Question Card */}
        <QuestionCard questionNumber={questionNumber} questionText={questionText} />
        {/* Progress Indicator */}
        <QuestionProgressIndicator totalSteps={totalSteps} currentStep={currentStep} />
        {/* Arrow Controls */}
        <ArrowControls onPrev={onPrev} onNext={onNext} onExpand={onExpand} />
      </VStack>
    </Box>
  );
};

export default VideoWQuestionCard;
