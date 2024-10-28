// VideoWQuestionCard molecule component
import { Box, VStack } from "@chakra-ui/react";

// combines these atom components
import VideoPlayer from "@/styles/components/VideoPlayer";
import ArrowControls from "@/styles/components/ArrowControls";
import QuestionCard from "@/styles/components/QuestionCard";
import QuestionProgressIndicator from "@/styles/components/QuestionProgressIndicator";

const VideoWQuestionCard = ({
    // default props
  questionNumber = 1,
  questionText = "Here is the question text from the interview.",
  totalSteps = 5,
  currentStep = 1,
  onPrev,
  onNext,
  onExpand,
  videoSrc = "/images/smiling-girl.png",  
}) => {
  return (
    <VStack
      spacing={4}
      align="stretch"
      maxW="734px"
      mx="auto"
      p={4}
      boxShadow="lg"
      borderRadius="lg"
      bg="white"
    >
      {/* Video Player */}
      <VideoPlayer 
        videoSrc={videoSrc} 
        thumbnail="/images/smiling-girl.png" 
        // duration={duration} 
    />

      {/* Question Card */}
      <QuestionCard questionNumber={questionNumber} questionText={questionText} />

      {/* Progress Indicator */}
      <QuestionProgressIndicator totalSteps={totalSteps} currentStep={currentStep} />

      {/* Arrow Controls */}
      <ArrowControls onPrev={onPrev} onNext={onNext} onExpand={onExpand} />
    </VStack>
  );
};

export default VideoWQuestionCard;
