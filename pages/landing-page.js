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
import TopNav from "@/styles/components/TopNav";
import { useRouter } from 'next/router';
import Footer from "@/styles/components/Footer";
import Link from "next/link";

export default function Home() {
    const router = useRouter();

    // Button action function
    const handleSignUp = () => {
        router.push('/sign-up'); // Navigate to the sign-up page
    };

    return (
        <Box
            bgGradient="linear(to-b, #CBD5FF 30%, #FFFFFF 60%, #FFFFFF 100%)"
            minH="100vh"

        >
            {/* Navigation */}

            <TopNav />

            {/* Content */}

            <Flex
                p={3}
                width="100%"
                mb={0}
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                gap="2rem"
            >

                {/* Hero Section */}

                <Flex flexDirection="column" zIndex={1} ml="20">
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
                    <Box>
                        <Link href="/sign-up" passHref>
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
                            onClick={handleSignUp}
                        >
                            Sign Up
                        </Button>
                        </Link>
                    </Box>

                </Flex>

                <Box width="100%" flex align="right">
                    <Image
                        src="/images/ipad-nurse.png"
                        alt="IPad Nurse"
                        width="95%"
                        height="auto"
                        objectFit="cover"
                        ml={-15}
                        pr={45}
                    />
                </Box>
            </Flex>

            {/* What We Offer Section */}

            <Box p={40} textAlign="center" borderRadius="md" maxW="90%" mx="auto" bg={"white"} padding={0} mt={-3}>
                <Heading fontFamily="heading" fontSize="5xl" mb={20} align="left" pt={100} pr={100} pl={100}>
                    <Text as="span" color="black">Empowering </Text>
                    <Text as="span" color="pink.500">immigrant </Text>
                    <Text as="span" color="pink.500">nurses </Text>
                    <Text color="black">to achieve job success with AI-driven</Text>
                    <Text color="black">interview coaching.</Text>
                </Heading>

                <Box width="100%" align="right" pr={100}>
                    <Image
                        src="/images/landing-page-nurses-together.png"
                        alt="Nurses Together"
                        width="45%"
                        height="auto"
                        objectFit="cover"
                        align="right"
                    />
                </Box>
                

                <Box bg="pink.500" maxW="100%" h={300} color="#FFFFFF" display="flex" alignItems="center" justifyContent="center">
                    <Text 
                        align="center"
                        fontFamily="body"
                        maxW="75%"
                        fontSize="md">
                            <Text fontWeight="bold" as="span">Onward</Text> 
                                is an AI-powered personal interview coach specifically designed to help nurses entering the Canadian healthcare system. We help nurses excel in job interviews and effectively showcase their qualifications.
                            </Text>
                </Box>

                <Flex justify="center" gap={20} mb={30} direction="column">

                    {/* Upload Resume and Job Posting */}

                    <Flex position="relative" alignItems="left" justifyContent="left" p={10}>
                        <Stack
                            width="1070px"
                            height="448px"
                            borderRadius="md"
                            bg="#CBD5FF"
                            p={6}
                            alignItems="center"
                            justifyContent="center"
                            position="relative"
                            zIndex={1}
                        >
                            <Heading
                                width="80%"
                                fontFamily="heading"
                                fontSize="2xl"
                                textAlign="left"
                                maxW="80%"
                            >
                                UPLOAD RESUME <br/>& JOB POSTING
                            </Heading>
                            <Text
                                fontFamily="body"
                                fontSize="sm"
                                textAlign="left"
                                maxW="80%"
                            >
                                Upload personal resumes and job postings to prepare for specific interviews. This feature helps you customize your practice based on the role you’re applying for, as well as allows you to keep your application materials organized and accessible whenever you need them.
                            </Text>
                        </Stack>
                        <Box
                            position="absolute"
                            top="200"
                            right="10"
                            zIndex={2}
                            width="100%"
                            align="right"
                        >
                            <Image
                            src="/images/upload-resume-job-posting.png"
                            alt="Nurses Together"
                            height="auto"
                            objectFit="cover"
                            width="40%"
                            />
                        </Box>
                    </Flex>

                    {/* Receive tailored interview questions */}

                    <Flex position="relative" alignItems="right" justifyContent="right" p={5}>
                        <Stack
                            width="1070px"
                            height="448px"
                            borderRadius="md"
                            bg="#CBD5FF"
                            p={6}
                            alignItems="center"
                            justifyContent="center"
                            position="relative"
                            zIndex={1}
                        >
                            <Heading
                                width="80%"
                                fontFamily="heading"
                                fontSize="2xl"
                                textAlign="left"
                                maxW="80%"
                            >
                                RECEIVE TAILORED  <br/>INTERVIEW QUESTIONS
                            </Heading>
                            <Text
                                fontFamily="body"
                                fontSize="sm"
                                textAlign="left"
                                maxW="80%"
                            >
                                Tailoring the experience to your needs such as selecting the type of questions and the number of questions, allowing you to focus on the areas where you need the most practice.
                            </Text>
                        </Stack>
                        <Box
                            position="absolute"
                            top="250"
                            left="10"
                            zIndex={3}
                            width="100%"
                            align="left"
                        >
                            <Image
                            src="/images/tailored-interview-question-2.png"
                            alt="Nurses Together"
                            height="auto"
                            objectFit="cover"
                            width="40%"
                            />
                        </Box>
                        <Box
                            position="absolute"
                            top="150"
                            left="5"
                            zIndex={2}
                            width="100%"
                            align="left"
                        >
                            <Image
                            src="/images/tailored-interview-question-1.png"
                            alt="Nurses Together"
                            height="auto"
                            objectFit="cover"
                            width="35%"
                            />
                        </Box>
                    </Flex>

                    {/* Practice with text or speech */}

                    <Flex position="relative" alignItems="left" justifyContent="left" p={10}>
                        <Stack
                            width="1070px"
                            height="448px"
                            borderRadius="md"
                            bg="#CBD5FF"
                            p={6}
                            alignItems="center"
                            justifyContent="center"
                            position="relative"
                            zIndex={1}
                        >
                            <Heading
                                width="80%"
                                fontFamily="heading"
                                fontSize="2xl"
                                textAlign="left"
                                maxW="80%"
                            >
                                PRACTICE WITH  <br/>TEXT OR SPEECH
                            </Heading>
                            <Text
                                fontFamily="body"
                                fontSize="sm"
                                textAlign="left"
                                maxW="80%"
                            >
                                If you prefer writing, you can type your responses to reflect on your wording and clarity. If you want to work on your speaking skills, you can select the speech option and get real-time feedback on your pronunciation and delivery.
                            </Text>
                        </Stack>
                        <Box
                            position="absolute"
                            top="50"
                            right="100"
                            zIndex={3}
                            width="100%"
                            align="right"
                        >
                            <Image
                            src="/images/practice-with-text-or-speech-video-camera.png"
                            alt="Nurses Together"
                            height="auto"
                            objectFit="cover"
                            width="25%"
                            />
                        </Box>
                        <Box
                            position="absolute"
                            top="300"
                            right="10"
                            zIndex={2}
                            width="100%"
                            align="right"
                        >
                            <Image
                            src="/images/practice-with-text-or-speech-text.png"
                            alt="Nurses Together"
                            height="auto"
                            objectFit="cover"
                            width="43%"
                            />
                        </Box>
                    </Flex>

                    {/* get instant feedback */}

                    <Flex position="relative" alignItems="right" justifyContent="right" p={10}>
                        <Stack
                            width="1070px"
                            height="448px"
                            borderRadius="md"
                            bg="#CBD5FF"
                            p={6}
                            alignItems="center"
                            justifyContent="center"
                            position="relative"
                            zIndex={1}
                        >
                            <Heading
                                width="80%"
                                fontFamily="heading"
                                fontSize="2xl"
                                textAlign="left"
                                maxW="80%"
                            >
                                GET INSTANT FEEDBACK
                            </Heading>
                            <Text
                                fontFamily="body"
                                fontSize="sm"
                                textAlign="left"
                                maxW="80%"
                            >
                                Receive constructive feedback on your interview performance. Our AI analyzes your responses and provides insights to help you improve for a more prepared and self-assured approach to real interviews.
                            </Text>
                        </Stack>
                        <Box
                            position="absolute"
                            left="10"
                            zIndex={2}
                            width="100%"
                            align="left"
                        >
                            <Image
                            src="/images/get-instant-feedback.png"
                            alt="Nurses Together"
                            height="auto"
                            objectFit="cover"
                            width="35%"
                            />
                        </Box>
                    </Flex>
                </Flex>
            </Box>

            {/* FAQ Section */}
            <Box p={20} borderRadius="md" boxShadow="lg" maxW="90%" mx="auto" bg={"white"} mt={10}>
                <Heading fontFamily="heading" fontSize="3xl" textAlign="left" mb={4}>FAQs</Heading>
                <Text fontFamily="body" fontSize="s" textAlign="left" mb={8}>
                    Find answers to about our nursing interview preparation
                </Text>
                <Accordion allowToggle>
                    <AccordionItem>
                        <h2>
                            <AccordionButton
                                sx={{
                                    borderBottom: '2px solid #92A8FF', // Change color here
                                    _expanded: { bg: 'blue.100' }, // Optional: Change background when expanded
                                }}
                            >
                                <Box as="span" flex="1" textAlign="left" fontFamily="heading">What is Onward?</Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} fontFamily="body" sx={{ borderColor: '#92A8FF' }}>
                            Onward is an AI-powered personal interview coach designed for nurses to enhance their job interview skills.
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <h2>
                            <AccordionButton
                                sx={{
                                    borderBottom: '2px solid #92A8FF',
                                }}
                            >
                                <Box as="span" flex="1" textAlign="left" fontFamily="heading">Who is this for?</Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} fontFamily="body" sx={{ borderColor: '#92A8FF' }}>
                            This service is designed for nurses, especially those new to the Canadian healthcare system.
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <h2>
                            <AccordionButton
                                sx={{
                                    borderBottom: '2px solid #92A8FF',
                                }}
                            >
                                <Box as="span" flex="1" textAlign="left" fontFamily="heading">Do you keep my data and audio files?</Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} fontFamily="body" sx={{ borderColor: '#92A8FF' }}>
                            Yes, we securely store data as per our privacy policy to enhance your interview coaching experience.
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <h2>
                            <AccordionButton
                                sx={{
                                    borderBottom: '2px solid #92A8FF',
                                }}
                            >
                                <Box as="span" flex="1" textAlign="left" fontFamily="heading">Why did we make this site?</Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} fontFamily="body" sx={{ borderColor: '#92A8FF' }}>
                            Onward aims to empower nurses by providing interview preparation tools tailored to their needs.
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </Box>
            <Footer />

        </Box>

    );
}
