import { 
  Box, 
  Flex, 
  Heading, 
  Text, 
  Stack, 
  Button, 
  Accordion, 
  AccordionItem, 
  AccordionButton, 
  AccordionPanel, 
  AccordionIcon 
} from "@chakra-ui/react";
import Layout from "@/styles/components/Layout";
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const handleSignUp = () => router.push('/signup');

  return (
    <Layout>
      {/* Hero Section */}
      <Box bgGradient="linear(to-r, blue.300, pink.300)" color="white" p={10} textAlign="center">
        <Heading fontSize="4xl" fontWeight="bold" mb={4}>
          <Text as="span" color="blue.500">UNLOCK </Text>
          <Text as="span" color="black">YOUR </Text>
          <Text as="span" color="pink.500">NURSING INTERVIEW </Text>
          <Text as="span">POTENTIAL TODAY.</Text>
        </Heading>
        <Text fontSize="lg" mb={6}>
          Our nursing interview prep services equip you with the skills and confidence to excel. With tailored advice and guidance, you’ll stand out in your interviews.
        </Text>
        <Button colorScheme="pink" size="lg" onClick={handleSignUp}>Sign Up</Button>
      </Box>

      {/* What We Offer Section */}
      <Box p={10} textAlign="center">
        <Heading fontSize="3xl" mb={8}>What We Offer</Heading>
        <Flex justify="center" gap={6} wrap="wrap">
          {[
            { title: "Personalized Coaching for Your Success", text: "Receive AI coaching sessions tailored to your unique needs." },
            { title: "Mock Interviews to Build Your Confidence", text: "Participate in realistic mock interviews to refine your skills." },
            { title: "Performance Feedback for Your Empowerment", text: "Receive personalized feedback to refine your responses and improve your performance." }
          ].map((item, index) => (
            <Stack key={index} width="300px" borderRadius="md" boxShadow="md" p={6} textAlign="center">
              <Heading fontSize="xl" mb={4}>{item.title}</Heading>
              <Text>{item.text}</Text>
            </Stack>
          ))}
        </Flex>
      </Box>

      {/* FAQ Section */}
      <Box bg="gray.100" p={10}>
        <Heading fontSize="3xl" textAlign="center" mb={8}>FAQs</Heading>
        <Accordion allowToggle maxW="600px" mx="auto">
          {[
            { question: "What is Onward?", answer: "Onward is an AI-powered personal interview coach designed for nurses to enhance their job interview skills." },
            { question: "Who is this for?", answer: "This service is designed for nurses, especially those new to the Canadian healthcare system." },
            { question: "Do you keep my data and audio files?", answer: "Yes, we securely store data as per our privacy policy to enhance your interview coaching experience." },
            { question: "Why did we make this site?", answer: "Onward aims to empower nurses by providing interview preparation tools tailored to their needs." }
          ].map((item, index) => (
            <AccordionItem key={index}>
              <AccordionButton>
                <Box flex="1" textAlign="left">{item.question}</Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>{item.answer}</AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
    </Layout>
  );
}
