import { Box, Image, Flex } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Popup from "./Popup";

export default function DashboardCard() {
  const { isOpen: isStartPracticingOpen, onOpen: onStartPracticingOpen, onClose: onStartPracticingClose } = useDisclosure();
  const router = useRouter(); // Initialize the router

  // Button action functions
  const handleMockInterview = () => {
    router.push('/mock-interview'); 
    onStartPracticingClose(); 
  };

  const handlePracticeInterview = () => {
    router.push('/practice-interview'); 
    onStartPracticingClose(); 
  };

  return (
      <Flex 
        bg="brand.blueberryCreme" 
        w={{ base: "32rem", lg:"25rem", xl: "33rem", "2xl":"53rem" }}
        h={{ base: "60%", lg: "100%", xl: "18rem", "2xl":"24rem" }}
        borderRadius="15px" 
        overflow="hidden"
        boxShadow="md"
      >
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          p={{ base: 2, md: 6 }}
          width={{ base: "60%", md: "50%", lg: "50%", xl: "60%", "2xl":"140%" }}

        >
          <Image
            src="/images/dashboard-img.png"
            alt="Dashboard Start Card"
            width="100%"
            height="auto"
            objectFit="contain" 
          />

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
            popupSize={{ base: "90%", md: "70%", lg: "50%" }}
          />
        </Flex>
        <Flex
          alignItems="flex-end"  
          justifyContent="center"
          width={{ base: "60%", md: "70%", lg: "120%", xl: "150%", "2xl":"100%" }}
          height="auto" 
        >
          <Image
            src="/images/nurse-img.png"
            alt="Nurse Image"
            width="100%"
            height="auto"
            z-index="999"
          />
        </Flex>
      </Flex>
  );
}
