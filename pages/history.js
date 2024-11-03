import Head from "next/head";
import styles from "@/styles/Home.module.css";
import "@/styles/theme";
import { Heading, Box, Flex, Divider, Text } from "@chakra-ui/react";
import Layout from "@/styles/components/Layout";
import { useRouter } from 'next/router';

export default function PracticeInterview() {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>History — Onward</title>
                <meta name="description" content="Onward is an AI-powered personal interview coach designed to help nurses, particularly those new to the Canadian healthcare system, excel in job interviews." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout showTopNav={true} pageTitle={"History"}>
                <Flex 
                    flexDirection="column" 
                    width="100%" 
                    height="100%" 
                    overflowY="auto" 
                    p={4}
                    mx="auto"
                >
                    {/* First Card: Practice Interview */}
                    <Flex flexDirection="column" alignItems="center" mb={6}>
                        <Box
                            width="90%"
                            maxWidth="800px" // Set a max width for better responsiveness
                            height={{ base: "auto", md: "300px", lg: "400px" }}
                            bg="white"
                            boxShadow="0px 0px 10px rgba(0, 0, 0, 0.10)"
                            borderRadius="15px"
                            p={{ base: 4, md: 6 }}
                        >
                            <Heading size="lg" mb={2}>
                                Practice Interview
                            </Heading>
                            <Divider mb={4} />
                            <Text>Oct. 20th, 2024</Text>
                            <Flex 
                                width="100%"
                                justifyContent="flex-start"
                                alignItems="center"
                                gap={4} 
                                mt={4} 
                            >
                                <Box 
                                    width="150px" 
                                    height="110px" 
                                    position="relative"
                                >
                                    <img 
                                        style={{ 
                                            width: "100%", 
                                            height: "100%", 
                                            position: 'absolute', 
                                            left: 0, 
                                            top: 0 
                                        }} 
                                        src="video-picture.png" 
                                        alt="Placeholder" 
                                    />
                                    <Box 
                                        width="100%" 
                                        height="100%" 
                                        position="absolute" 
                                        background="rgba(0, 0, 0, 0.40)" 
                                        borderRadius="15px" 
                                    />
                                    <Box 
                                        width="30px" 
                                        height="30px" 
                                        position="absolute" 
                                        left="85%" 
                                        top="35%"
                                    >
                                        <Box 
                                            width="100%" 
                                            height="100%" 
                                            background="black" 
                                            opacity="0.60" 
                                            borderRadius="9999px" 
                                        />
                                    </Box>
                                </Box>
                                
                                <Flex 
                                    flexDirection="column" 
                                    justifyContent="flex-start" 
                                    alignItems="flex-start" 
                                    gap={2} 
                                >
                                    <Text 
                                        fontSize="20px" 
                                        fontFamily="body" 
                                        fontWeight="700"
                                    >
                                        Name: <br />
                                        <Text 
                                            as="span" 
                                            fontWeight="400"
                                            lineHeight="27px" 
                                            fontSize="20px"
                                        >
                                            Burnaby General Practice Interview
                                        </Text>
                                    </Text>
                                    <Text 
                                        fontSize="20px" 
                                        fontFamily="DM Sans" 
                                        fontWeight="700"
                                    >
                                        Length: 
                                        <Text 
                                            as="span" 
                                            fontWeight="400" 
                                            lineHeight="27px" 
                                            fontSize="20px"
                                        >
                                            8:53
                                        </Text>
                                    </Text>
                                </Flex>
                            </Flex>
                        </Box>
                    </Flex>

                    {/* Second Card: Mock Interview */}
                    <Flex flexDirection="column" alignItems="center">
                        <Box
                            width="90%"
                            maxWidth="800px" // Set a max width for better responsiveness
                            height={{ base: "auto", md: "300px", lg: "400px" }}
                            bg="white"
                            boxShadow="0px 0px 10px rgba(0, 0, 0, 0.10)"
                            borderRadius="15px"
                            p={{ base: 4, md: 6 }}
                        >
                            <Heading size="lg" mb={2}>
                                Mock Interview
                            </Heading>
                            <Divider mb={4} />
                            <Text>Oct. 20th, 2024</Text>
                            <Flex 
                                width="100%"
                                justifyContent="flex-start"
                                alignItems="center"
                                gap={4} 
                                mt={4} 
                            >
                                <Box 
                                    width="200px" 
                                    height="110px" 
                                    position="relative"
                                >
                                    <img 
                                        style={{ 
                                            width: "100%", 
                                            height: "100%", 
                                            position: 'absolute', 
                                            left: 0, 
                                            top: 0 
                                        }} 
                                        src="video-picture.png" 
                                        alt="Placeholder" 
                                    />
                                    <Box 
                                        width="100%" 
                                        height="100%" 
                                        position="absolute" 
                                        background="rgba(0, 0, 0, 0.40)" 
                                        borderRadius="15px" 
                                    />
                                    <Box 
                                        width="30px" 
                                        height="30px" 
                                        position="absolute" 
                                        left="85%" 
                                        top="35%"
                                    >
                                        <Box 
                                            width="100%" 
                                            height="100%" 
                                            background="black" 
                                            opacity="0.60" 
                                            borderRadius="9999px" 
                                        />
                                    </Box>
                                </Box>
                                
                                <Flex 
                                    flexDirection="column" 
                                    justifyContent="flex-start" 
                                    alignItems="flex-start" 
                                    gap={2} 
                                >
                                    <Text 
                                        fontSize="20px" 
                                        fontFamily="body" 
                                        fontWeight="700"
                                    >
                                        Name: <br />
                                        <Text 
                                            as="span" 
                                            fontWeight="400"
                                            lineHeight="27px" 
                                            fontSize="20px"
                                        >
                                            Burnaby General Practice Interview
                                        </Text>
                                    </Text>
                                    <Text 
                                        fontSize="20px" 
                                        fontFamily="DM Sans" 
                                        fontWeight="700"
                                    >
                                        Length: 
                                        <Text 
                                            as="span" 
                                            fontWeight="400" 
                                            lineHeight="27px" 
                                            fontSize="20px"
                                        >
                                            8:53
                                        </Text>
                                    </Text>
                                </Flex>
                            </Flex>
                        </Box>
                    </Flex>
                </Flex>
            </Layout>
        </>
    )
}
