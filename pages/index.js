import Head from "next/head";
import styles from "@/styles/Home.module.css";
import "@/styles/theme";
import { Heading, Box, CardBody, Text, Stack, Card, Link, Flex } from "@chakra-ui/react";
import TopNav from "@/styles/components/TopNav";
import { SideNavBar } from "@/styles/components/SideNav";
import Footer from "@/styles/components/Footer";
import Popup from "@/styles/components/Popup.js";
import ViewAllPopup from "@/styles/components/ViewAllPopup"; // Import the new ViewAllPopup component
import { useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router'; // Import useRouter
import Layout from "@/styles/components/Layout";
import { useState, useEffect } from "react";

export default function Home() {
  const { isOpen: isStartPracticingOpen, onOpen: onStartPracticingOpen, onClose: onStartPracticingClose } = useDisclosure();
  const { isOpen: isViewAllOpen, onOpen: onViewAllOpen, onClose: onViewAllClose } = useDisclosure();
  const router = useRouter(); // Initialize the router

  // Button action functions
  const handleMockInterview = () => {
    router.push('/mock-interview'); // Navigate to the mock interview page
    onStartPracticingClose(); // Close the popup after action
  };

  const handlePracticeInterview = () => {
    router.push('/practice-interview'); // Navigate to the practice interview page
    onStartPracticingClose(); // Close the popup after action
  };

  return (
    <>
      <Head>
        <title>Onward</title>
        <meta name="description" content="Onward is an AI-powered personal interview coach designed to help nurses, particularly those new to the Canadian healthcare system, excel in job interviews." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout showTopNav={false} title={''}>

        <Flex className={`${styles.page}`} flexDirection="row">
          <main className={styles.main} style={{ position: "relative" }} >

            {/* flexbox for main content + footer, shifted right to account for sidebar */}
            <Flex flexDir={"column"}> 
            <Box className="content" m={6} >
              <Heading fontFamily="heading" color="black" fontWeight="bold" fontSize="32pt" zIndex={10} position="relative">
                <span style={{ color: "#EA4A7D" }}>Welcome back,</span> Onwarder!
              </Heading>

              <Box display="flex" justifyContent="space-between" gap={6} mt={7}>
                <Card width="50vw" borderRadius="15px" boxShadow="md">
                  <CardBody>
                    <Stack spacing={4} align="center">
                      <Text fontFamily="heading" fontSize="sm" fontWeight="bold" textAlign="center">
                        Ready to take the next step?
                      </Text>
                      <Text fontFamily="body" textAlign="center" maxW="50%" mb={4}>
                        Whether you're preparing for your first interview or refining your skills, we're here to help you succeed. Your next opportunity is just a practice session away. Are you ready to start practicing for your upcoming nursing interview?
                        <span style={{ fontWeight: "bold" }}><br />Let’s get you confident and prepared!</span>
                      </Text>
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
                      />
                    </Stack>
                  </CardBody>
                </Card>

                <Card width="15vw" borderRadius="15px" boxShadow="md">
                  <CardBody>
                    <Stack spacing={4} align="center">
                      <Text fontFamily="heading" fontSize="sm" fontWeight="bold" textAlign="center">
                        My Resumes
                      </Text>
                      <Box bg="brand.platinum" p={4} height="200px" overflowY="auto">
                        {/* Placeholder content for resumes */}
                        <Text>This is a placeholder for Resume 1</Text>
                        <Text>This is a placeholder for Resume 2</Text>
                        <Text>This is a placeholder for Resume 3</Text>
                        <Text>This is a placeholder for Resume 4</Text>
                        <Text>This is a placeholder for Resume 5</Text>
                      </Box>
                      <Link variant="underline" color="brand.blushPink" onClick={onViewAllOpen} cursor="pointer">View All</Link>
                      <ViewAllPopup isOpen={isViewAllOpen} onClose={onViewAllClose} heading="All Resumes" />
                    </Stack>
                  </CardBody>
                </Card>

                <Card width="15vw" borderRadius="15px" boxShadow="md">
                  <CardBody>
                    <Stack spacing={4} align="center">
                      <Text fontFamily="heading" fontSize="sm" fontWeight="bold" textAlign="center">
                        My Job Postings
                      </Text>
                      <Box bg="brand.platinum" p={4} height="200px" overflowY="auto">
                        {/* Placeholder content for job postings */}
                        <Text>This is a placeholder for Job Posting 1</Text>
                        <Text>This is a placeholder for Job Posting 2</Text>
                        <Text>This is a placeholder for Job Posting 3</Text>
                        <Text>This is a placeholder for Job Posting 4</Text>
                        <Text>This is a placeholder for Job Posting 5</Text>
                      </Box>
                      <Link variant="underline" color="brand.blushPink" onClick={onViewAllOpen} cursor="pointer">View All</Link>
                      <ViewAllPopup isOpen={isViewAllOpen} onClose={onViewAllClose} heading="All Job Postings" />
                    </Stack>
                  </CardBody>
                </Card>
              </Box>

              {/* New row for the last card */}
              <Box display="flex" justifyContent="space-between" gap={6} mt={7}>
                <Card width="40vw" borderRadius="15px" boxShadow="md">
                  <CardBody>
                    <Stack spacing={4} align="center">
                      <Text fontFamily="heading" fontSize="md" fontWeight="bold" textAlign="center">
                        Check out how much you've grown!
                      </Text>
                      <Box bg="brand.platinum" p={4} height="500px" width="90%" overflowY="auto"></Box>
                    </Stack>
                  </CardBody>
                </Card>
                <Card width="40vw" borderRadius="15px" boxShadow="md">
                  <CardBody>
                    <Stack spacing={4} align="center">
                      <Text fontFamily="heading" fontSize="sm" fontWeight="bold" textAlign="center">
                        Ready to take the next step?
                      </Text>
                      <Box bg="brand.platinum" p={4} height="500px" width="90%" overflowY="auto">
                        <Text>This is a placeholder for Job Posting 1</Text>
                        <Text>This is a placeholder for Job Posting 2</Text>
                        <Text>This is a placeholder for Job Posting 3</Text>
                        <Text>This is a placeholder for Job Posting 4</Text>
                        <Text>This is a placeholder for Job Posting 5</Text>
                      </Box>
                      <Link variant="underline" color="brand.blushPink" onClick={onViewAllOpen} cursor="pointer">View All</Link>
                      <ViewAllPopup isOpen={isViewAllOpen} onClose={onViewAllClose} heading="All Job Postings" />
                    </Stack>
                  </CardBody>
                </Card>
              </Box>
            </Box>
            <Footer />
            </Flex>
          </main>
        </Flex>
      </Layout>
    </>
  );
}
