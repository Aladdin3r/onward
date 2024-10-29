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
    AccordionIcon,
    Image
} from "@chakra-ui/react";
import Layout from "@/styles/components/Layout";
import TopNav from "@/styles/components/TopNav";
import AppTopNav from "@/styles/components/AppTopNav";
import { useRouter } from 'next/router';

export default function Home() {
    const router = useRouter();

    // Button action function
    const handleSignUp = () => {
        router.push('/signup'); // Navigate to the sign-up page
    };

    return (
        <>
            {/* Hero Section */}
            <TopNav />

            <Flex //hero card
                p={3}
                width="100%"
                mb={0}
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                gap="2rem"  // Adds a gap between text and image
            >

                <Flex //left text
                    flexDirection="column" zIndex={1}
                    ml="20"
                >
                    <Heading
                        fontFamily="heading"
                        fontSize="6xl"
                        fontWeight="bold"
                        width="88%"
                        mb={4}
                    >
                        <Text as="span" color="blue.500">UNLOCK </Text>
                        <Text as="span" color="black">YOUR </Text>
                        <Text as="span" color="pink.500">NURSING INTERVIEW </Text>
                        <Text as="span" color="black">POTENTIAL </Text>
                        <Text as="span" color="blue.500">TODAY</Text>
                        <Text as="span" color="black">. </Text>
                    </Heading>
                    <Text fontFamily="body" fontSize="x" color="black" mb={6} width="78%">
                        Our nursing interview prep services are designed to equip you with the skills and confidence needed to excel. With tailored advice and guidance, you’ll stand out in your interviews.
                    </Text>
                    <Button
                        mt="2"
                        bg="#EA4A7D"
                        color="#FFFFFF"
                        width="50%"
                        height="50px"
                        maxW="225px"
                        fontWeight="semibold"
                        fontSize="16px"
                        borderRadius="full"
                        px="6"
                        mb="6"
                    >
                        Sign Up
                    </Button>
                </Flex>

                <Box width="45%" flexShrink={0}>
                    <Image
                        src="/images/ipad-nurse.png"
                        alt="IPad Nurse"
                        width="100%"
                        height="auto"
                        objectFit="cover"

                    />
                </Box>

            </Flex>



            {/* What We Offer Section */}
            <Box p={10} textAlign="center"  borderRadius="md" boxShadow="lg" maxW="90%" mx="auto" >
                <Heading fontFamily="heading" fontSize="3xl" mb={8}>What We Offer</Heading>
                <Flex justify="center" gap={6}>
                    <Stack width="300px" borderRadius="md" boxShadow="md" p={6} textAlign="center" alignItems="center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M223.68,66.15,135.68,18h0a15.88,15.88,0,0,0-15.36,0l-88,48.17a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15ZM128,32h0l80.34,44L128,120,47.66,76ZM40,90l80,43.78v85.79L40,175.82Zm96,129.57V133.82L216,90v85.78Z"></path></svg>
                        <Heading fontFamily="heading" fontSize="xl" mb={4}>Personalized Coaching for Your Success</Heading>
                        <Text fontFamily="body">
                            Receive AI coaching sessions tailored to your unique needs.
                        </Text>
                    </Stack>
                    <Stack width="300px" borderRadius="md" boxShadow="md" p={6} textAlign="center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M223.68,66.15,135.68,18h0a15.88,15.88,0,0,0-15.36,0l-88,48.17a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15ZM128,32h0l80.34,44L128,120,47.66,76ZM40,90l80,43.78v85.79L40,175.82Zm96,129.57V133.82L216,90v85.78Z"></path></svg>
                        <Heading fontFamily="heading" fontSize="xl" mb={4}>Mock Interviews to Build Your Confidence</Heading>
                        <Text fontFamily="body">
                            Participate in realistic mock interviews to refine your skills.
                        </Text>
                    </Stack>
                    <Stack width="300px" borderRadius="md" boxShadow="md" p={6} textAlign="center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M223.68,66.15,135.68,18h0a15.88,15.88,0,0,0-15.36,0l-88,48.17a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15ZM128,32h0l80.34,44L128,120,47.66,76ZM40,90l80,43.78v85.79L40,175.82Zm96,129.57V133.82L216,90v85.78Z"></path></svg>
                        <Heading fontFamily="heading" fontSize="xl" mb={4}>Performance Feedback for Your Empowerment</Heading>
                        <Text fontFamily="body">
                            Receive personalized feedback to refine your responses and improve your performance.
                        </Text>
                    </Stack>
                </Flex>
            </Box>

            {/* FAQ Section */}
            <Box p={10} borderRadius="md" boxShadow="lg" maxW="90%" mx="auto">
                <Heading fontFamily="heading" fontSize="3xl" textAlign="left" mb={4}>FAQs</Heading>
                <Text fontFamily="body" fontSize="s" textAlign="left" mb={8}>
                    Find answers to about our nursing interview preperation
                </Text>
                <Accordion allowToggle>
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
        </>
    );
}
