import Head from "next/head";
import styles from "@/styles/Home.module.css";
import "@/styles/theme";
import { Heading, Box, Image, Text, Stack, Card, Link, Divider, Flex } from "@chakra-ui/react";
import TopNav from "@/styles/components/TopNav";
import { SideNavBar } from "@/styles/components/SideNav";
import ChakraButton from "@/styles/components/ChakraButton";
import Footer from "@/styles/components/Footer";
import Popup from "@/styles/components/Popup.js";
import ViewAllPopup from "@/styles/components/ViewAllPopup"; // Import the new ViewAllPopup component
import { useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router'; // Import useRouter

export default function PracticeInterview() {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Practice Interview — Onward</title>
                <meta name="description" content="Onward is an AI-powered personal interview coach designed to help nurses, particularly those new to the Canadian healthcare system, excel in job interviews." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={`${styles.page}`}>
                <TopNav />
                <main style={{ display: 'flex' }}> {/* Use flexbox for layout */}
                    <SideNavBar activeVariant="variant3" /> {/* Highlight Practice Interview */}
                    <Flex flexDirection="column" gap={5}>
                        <Box className="content"> {/* Flex-grow to take remaining space */}
                            <Heading fontFamily="heading" fontSize="24pt" color="black" m={4}>
                                Practice Interview
                            </Heading>
                            <Divider width="100%"/>
                        </Box>
                        <Box display="flex" justifyContent="space-between" gap={5} mt={40} ml={10}>
                            <Stack>
                                <Box>
                                    <Image  src="/video.png"/>
                                </Box>
                                <Box>
                                    <ChakraButton  variant="mdPrimary">Start Interview</ChakraButton>
                                </Box>
                            </Stack>
                        </Box>
                    </Flex>

                </main>
                <Footer />
            </div>
        </>
    );
}
