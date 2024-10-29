import { Box, Flex, Heading, Text, Stack, Button, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from "@chakra-ui/react";
import Layout from "@/styles/components/Layout";
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  // Button action function
  const handleSignUp = () => {
    router.push('/signup'); // Navigate to the sign-up page
  };

  return (
    <Layout>
      {/* Hero Section */}
      <Box bgGradient="linear(to-r, blue.300, pink.300)" color="white" p={10} textAlign="center">
        <Heading fontFamily="heading" fontSize="4xl" fontWeight="bold" mb={4}>
          <Text as="span" color="blue.500">UNLOCK </Text>
          <Text as="span" color="black">YOUR </Text>
          <Text as="span" color="pink.500">NURSING INTERVIEW </Text>
          <Text as="span">POTENTIAL TODAY.</Text>
        </Heading>
        <Text fontFamily="body" fontSize="lg" mb={6}>
          Our nursing interview prep services are designed to equip you with the skills and confidence needed to excel. With tailored advice and guidance, you’ll stand out in your interviews.
        </Text>
        <Button colorScheme="pink" size="lg" onClick={handleSignUp}>Sign Up</Button>
      </Box>

      {/* What We Offer Section */}
      <Box p={10} textAlign="center">
        <Heading fontFamily="heading" fontSize="3xl" mb={8}>What We Offer</Heading>
        <Flex justify="center" gap={6}>
          <Stack width="300px" borderRadius="md" boxShadow="md" p={6} textAlign="center">
            <Heading fontFamily="heading" fontSize="xl" mb={4}>Personalized Coaching for Your Success</Heading>
            <Text fontFamily="body">
              Receive AI coaching sessions tailored to your unique needs.
            </Text>
          </Stack>
          <Stack width="300px" borderRadius="md" boxShadow="md" p={6} textAlign="center">
            <Heading fontFamily="heading" fontSize="xl" mb={4}>Mock Interviews to Build Your Confidence</Heading>
            <Text fontFamily="body">
              Participate in realistic mock interviews to refine your skills.
            </Text>
          </Stack>
          <Stack width="300px" borderRadius="md" boxShadow="md" p={6} textAlign="center">
            <Heading fontFamily="heading" fontSize="xl" mb={4}>Performance Feedback for Your Empowerment</Heading>
            <Text fontFamily="body">
              Receive personalized feedback to refine your responses and improve your performance.
            </Text>
          </Stack>
        </Flex>
      </Box>

    F
      <Box bg="gray.100" p={10}>
        <Heading fontFamily="heading" fontSize="3xl" textAlign="center" mb={8}>FAQs</Heading>
        <Accordion allowToggle maxW="600px" mx="auto">
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left" fontFamily="heading">What is Onward?</Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} fontFamily="body">
              Onward is an AI-powered personal interview coach designed for nurses to enhance their job interview skills.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left" fontFamily="heading">Who is this for?</Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} fontFamily="body">
              This service is designed for nurses, especially those new to the Canadian healthcare system.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left" fontFamily="heading">Do you keep my data and audio files?</Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} fontFamily="body">
              Yes, we securely store data as per our privacy policy to enhance your interview coaching experience.
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left" fontFamily="heading">Why did we make this site?</Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} fontFamily="body">
              Onward aims to empower nurses by providing interview preparation tools tailored to their needs.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </Layout>
  );
}
