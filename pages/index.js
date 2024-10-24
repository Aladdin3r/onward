import Head from "next/head";
import styles from "@/styles/Home.module.css";
import "@/styles/theme";
import "@phosphor-icons/web/light";
import "@phosphor-icons/web/bold";
import { Heading, Box, CardBody, Text, Stack, Card, Link, Flex } from "@chakra-ui/react";
import { Button as ChakraButton } from "@chakra-ui/react";
import TopNav from "@/styles/components/topnav";
import { SideNavBar } from "@/styles/components/sidenav";
import Footer from "@/styles/components/footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Onward</title>
        <meta
          name="description"
          content="Onward is an AI-powered personal interview coach designed to help nurses, particularly those new to the Canadian healthcare system, excel in job interviews."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${styles.page}`}>
        <TopNav />
        <main className={styles.main} style={{ position: "relative" }}>
          <SideNavBar property1="default" />
          <Box className="content" m={8}>
            <Heading
              fontFamily="heading"
              color="black"
              fontWeight="bold"
              fontSize="32pt"
              zIndex={10}
              position="relative"
            >
              <span style={{ color: "#EA4A7D" }}>Welcome back,</span> Onwarder!
            </Heading>

            {/* Wrapping the first three cards in a flex container */}
            <Box display="flex" justifyContent="space-between" gap={6} mt={7}>
              <Card width="50vw" borderRadius="15px" boxShadow="md">
                <CardBody>
                  <Stack spacing={4} align="center">
                    <Text
                      fontFamily="heading"
                      fontSize="sm"
                      fontWeight="bold"
                      textAlign="center"
                    >
                      Ready to take the next step?
                    </Text>
                    <Text fontFamily="body" textAlign="center" maxW="50%" mb={4}>
                    Whether you're preparing for your first interview or refining your skills, we're here to help you succeed. Your next opportunity is just a practice session away. Are you ready to start practicing for your upcoming nursing interview?
                    <span style={{ fontWeight: "bold" }}><br/>Let’s get you confident and prepared!</span>
                    </Text>
                    <ChakraButton variant="mdPrimary" p={3} position="relative">
                      <Text display="flex" p={2} fontSize="24px">
                        Start Practicing!
                      </Text>
                    </ChakraButton>
                  </Stack>
                </CardBody>
              </Card>

              <Card width="15vw" borderRadius="15px" boxShadow="md">
                <CardBody>
                  <Stack spacing={4} align="center">
                    <Text
                      fontFamily="heading"
                      fontSize="sm"
                      fontWeight="bold"
                      textAlign="center"
                    >
                      My Resumes
                    </Text>
                    <Box
                      bg="brand.platinum"
                      p={4}
                      height="200px" // Set a fixed height for the scrollable area
                      overflowY="auto" // Enable vertical scrolling
                    >
                      {/* Placeholder content */}
                      <Text>This is a placeholder for Resume 1</Text>
                      <Text>This is a placeholder for Resume 2</Text>
                      <Text>This is a placeholder for Resume 3</Text>
                      <Text>This is a placeholder for Resume 4</Text>
                      <Text>This is a placeholder for Resume 5</Text>
                      <Text>This is a placeholder for Resume 1</Text>
                      <Text>This is a placeholder for Resume 2</Text>
                      <Text>This is a placeholder for Resume 3</Text>
                      <Text>This is a placeholder for Resume 4</Text>
                      <Text>This is a placeholder for Resume 5</Text>
                    </Box>
                    <Link variant="underline" color="brand.blushPink" href="#">View All</Link>
                  </Stack>
                </CardBody>
              </Card>

              <Card width="15vw" borderRadius="15px" boxShadow="md">
                <CardBody>
                  <Stack spacing={4} align="center">
                    <Text
                      fontFamily="heading"
                      fontSize="sm"
                      fontWeight="bold"
                      textAlign="center"
                    >
                      My Job Postings
                    </Text>
                    <Box
                      bg="brand.platinum"
                      p={4}
                      height="200px" // Set a fixed height for the scrollable area
                      overflowY="auto" // Enable vertical scrolling
                    >
                      {/* Placeholder content */}
                      <Text>This is a placeholder for Job Posting 1</Text>
                      <Text>This is a placeholder for Job Posting 2</Text>
                      <Text>This is a placeholder for Job Posting 3</Text>
                      <Text>This is a placeholder for Job Posting 4</Text>
                      <Text>This is a placeholder for Job Posting 5</Text>
                      <Text>This is a placeholder for Job Posting 1</Text>
                      <Text>This is a placeholder for Job Posting 2</Text>
                      <Text>This is a placeholder for Job Posting 3</Text>
                      <Text>This is a placeholder for Job Posting 4</Text>
                      <Text>This is a placeholder for Job Posting 5</Text>
                    </Box>
                    <Link variant="underline" color="brand.blushPink" href="#">View All</Link>
                  </Stack>
                </CardBody>
              </Card>
            </Box>

            {/* New row for the last card */}
            <Box display="flex" justifyContent="space-between" gap={6} mt={7}>
              <Card width="40vw" borderRadius="15px" boxShadow="md">
                <CardBody>
                  <Stack spacing={4} align="center">
                    <Text
                      fontFamily="heading"
                      fontSize="md"
                      fontWeight="bold"
                      textAlign="center"
                    >
                      Check out how much you've grown!
                    </Text>
                    <Box
                      bg="brand.platinum"
                      p={4}
                      height="500px" 
                      width="90%"
                      overflowY="auto" // Enable vertical scrolling
                    ></Box>
                    
                  </Stack>
                </CardBody>
              </Card>
              <Card width="40vw" borderRadius="15px" boxShadow="md">
                <CardBody>
                  <Stack spacing={4} align="center">
                    <Text
                      fontFamily="heading"
                      fontSize="sm"
                      fontWeight="bold"
                      textAlign="center"
                    >
                      Ready to take the next step?
                    </Text>
                    <Box
                      bg="brand.platinum"
                      p={4}
                      height="500px" 
                      width="90%"
                      overflowY="auto" // Enable vertical scrolling
                    >
                      <Text>This is a placeholder for Job Posting 1</Text>
                      <Text>This is a placeholder for Job Posting 2</Text>
                      <Text>This is a placeholder for Job Posting 3</Text>
                      <Text>This is a placeholder for Job Posting 4</Text>
                      <Text>This is a placeholder for Job Posting 5</Text>
                      <Text>This is a placeholder for Job Posting 1</Text>
                      <Text>This is a placeholder for Job Posting 2</Text>
                      <Text>This is a placeholder for Job Posting 3</Text>
                      <Text>This is a placeholder for Job Posting 4</Text>
                      <Text>This is a placeholder for Job Posting 5</Text>
                      <Text>This is a placeholder for Job Posting 1</Text>
                      <Text>This is a placeholder for Job Posting 2</Text>
                      <Text>This is a placeholder for Job Posting 3</Text>
                      <Text>This is a placeholder for Job Posting 4</Text>
                      <Text>This is a placeholder for Job Posting 5</Text>
                      <Text>This is a placeholder for Job Posting 1</Text>
                      <Text>This is a placeholder for Job Posting 2</Text>
                      <Text>This is a placeholder for Job Posting 3</Text>
                      <Text>This is a placeholder for Job Posting 4</Text>
                      <Text>This is a placeholder for Job Posting 5</Text>
                    </Box>
                    <Link variant="underline" color="brand.blushPink" href="#">View All</Link>
                  </Stack>
                </CardBody>
              </Card>
            </Box>
          </Box>
        </main>
        <Footer />
      </div>
    </>
  );
}
