import Head from "next/head";
import styles from "@/styles/Home.module.css";
import "@/styles/theme";
import { Heading, Box, Flex, Text, Button, Container } from "@chakra-ui/react";
import TopNav from "@/styles/components/TopNav";
import { SideNavBar } from "@/styles/components/SideNav";
import VideoPlayer from "@/styles/components/VideoPlayer";
import { useRouter } from 'next/router';

export default function MockInterviewStart() {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Mock Interview — Onward</title>
                <meta name="description" content="Onward is an AI-powered personal interview coach designed to help nurses, particularly those new to the Canadian healthcare system, excel in job interviews." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles.page}>
                {/* Top Navigation */}
                <TopNav />

                {/* Main Layout with Sidebar and Content */}
                <Flex>
                    {/* Sidebar */}
                    <Box width="17.1875rem" bg="gray.100" minH="100vh">
                        <SideNavBar activeVariant="variant2" />
                    </Box>

                    {/* Main Content Area */}
                    <Box flex="1" pl={6} pr={16} py={8} bg="white" maxW="1200px" ml="17.1875rem">
                        {/* Page Title aligned to the left */}
                        <Heading as="h1" size="lg" mb={8} textAlign="left">
                            Mock Interview
                        </Heading>

                        {/* Flex container for Video Player and CTA, aligned to the left */}
                        <Flex align="flex-start" w="100%" mt={95}>
                            {/* Video Player */}
                            <Box flex="1" maxW="60%" mr={8}>
                                <VideoPlayer
                                    title="Interview Playback"
                                    thumbnail="/images/smiling-girl.png"
                                />
                            </Box>

                            {/* Call to Action Box */}
                            <Box flex="0.3" textAlign="center">
                                <Text fontSize="md" fontWeight="bold" mt={16} mb={4}>Ready to Join?</Text>
                                <Button
                                    bg="brand.blushPink"
                                    color="white"
                                    size="md"
                                    px={10}
                                    py={7}
                                    onClick={() => router.push('/mock-interview-start')}
                                >
                                    Start Interview
                                </Button>
                            </Box>
                        </Flex>
                    </Box>
                </Flex>
            </div>
        </>
    );
}
