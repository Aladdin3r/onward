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

export default function Home() {
    const router = useRouter();

    // Button action function
    const handleSignUp = () => {
        router.push('/signup'); // Navigate to the sign-up page
    };

    return (
        <Box position="relative" minH="100vh">
            {/* Background Gradient */}
            <Box
                bgGradient="linear(to-b, #CBD5FF, #FFFFFF)"
                position="absolute"
                top={0}
                left={0}
                width="100%"
                height="100%"
                zIndex={0}
            />

            {/* Main Content */}
            <Box position="relative" zIndex={1}>
                {/* Hero Section */}
                <TopNav />

                <Flex
                    p={3}
                    width="100%"
                    mb={0}
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                    gap="2rem"
                >
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
                <Box p={40} textAlign="center" borderRadius="md" boxShadow="lg" maxW="90%" mx="auto">
                    <Heading fontFamily="heading" fontSize="5xl" mb={20} mt={-20}>What We Offer</Heading>
                    <Flex justify="center" gap={20} mb={30}>
                        {/* Offer boxes */}
                    </Flex>
                </Box>

                {/* FAQ Section */}
                <Box p={20} borderRadius="md" boxShadow="lg" maxW="90%" mx="auto">
                    <Heading fontFamily="heading" fontSize="3xl" textAlign="left" mb={4}>FAQs</Heading>
                    <Text fontFamily="body" fontSize="s" textAlign="left" mb={8}>
                        Find answers to about our nursing interview preparation
                    </Text>
                    <Accordion allowToggle>
                        {/* FAQ items */}
                    </Accordion>
                </Box>
            </Box>
        </Box>
    );
}
