import { Box, Image, Flex, Button } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Popup from "./Popup";

export default function DashboardCard() {
  const { isOpen: isStartPracticingOpen, onOpen: onStartPracticingOpen, onClose: onStartPracticingClose } = useDisclosure();
  const { isOpen: isViewAllOpen, onOpen: onViewAllOpen, onClose: onViewAllClose } = useDisclosure();
  const router = useRouter(); // Initialize the router

  // Button action functions
  const handleMockInterview = () => {
    router.push('/mock-interview'); // Navigate to the mock interview page
    onStartPracticingClose(); // Close the popup after action
  };

  const handlePracticeInterview = () => {
    router.push('/practice-interview'); // Navigate to the practice interview page
    onStartPracticingClose(); // Close the popup after action
  };
  return (
    <Box>
      <Flex bg="#F3F6FF" minW="750px" minH="435px" borderRadius="16" overflow="hidden">
        
        
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          p="6"
          width="60%"
        >
          <Image
            src="/images/dashboard-img.png"
            alt="Dashboard Start Card"
            width="411.47px"
            height="230.42px"
          />
          {/* <Button
            mt="2"
            bg="#EA4A7D"
            color="#FFFFFF"
            width="100%"
            maxW="302px"
            fontWeight="semibold"
            fontSize="16px"
            borderRadius="full"
            px="6"
            mb="6"
          >
            Start Practicing
          </Button> */}
          <Popup 
                        title="Start Practicing!" 
                        heading="Select an Interview Type:" 
                        content1="Practice a realistic interview scenario in a simulated environment."
                        button1Text="Mock Interview" 
                        button1Action={handleMockInterview}  // Navigate to the mock interview page
                        content2="Focus on refining your answers and building confidence" 
                        button2Text="Practice Interview" 
                        button2Action={handlePracticeInterview} // Navigate to the practice interview page
                        isOpen={isStartPracticingOpen} 
                        onOpen={onStartPracticingOpen} 
                        onClose={onStartPracticingClose} 
                      />
        </Flex>

       
        <Flex
          alignItems="flex-end"  
          justifyContent="center"
          width="40%"
          // p="6"
        >
          <Image
            src="/images/nurse-img.png"
            alt="Nurse Image"
            width="300px"
            height="328px"
            objectFit="cover"
          />
        </Flex>
      </Flex>
    </Box>
  );
}
