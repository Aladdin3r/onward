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
        <Box
            bgGradient="linear(to-b, #CBD5FF, #FFFFFF)"
            minH="100vh"
        >
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

            {/* Other sections continue here... */}
        </Box>
    );
}
