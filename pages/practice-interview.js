import Head from "next/head";
import { Flex, Button, VStack, Box, Text, Heading } from "@chakra-ui/react";
import Layout from "@/styles/components/Layout";

// Fetch questions dynamically during build time
export async function getStaticProps() {
  let questions = [];

  try {
    // Replace this URL with the actual API or data source
    const res = await fetch("https://api.roughlyai.com/ttfiles/api/questions");
    if (!res.ok) throw new Error("Failed to fetch questions");
    questions = await res.json();
  } catch (error) {
    console.error("Error fetching questions:", error.message);
    questions = []; // Fallback to empty array if fetching fails
  }

  return {
    props: {
      questions, // Pass questions as a prop
    },
    revalidate: 10, // Optional: Revalidate every 10 seconds
  };
}

export default function PracticeInterview({ questions }) {
  const handleNextClick = () => {
    console.log("Next button clicked");
    // Replace this with routing logic for testing or the next step
  };

  return (
    <>
      <Head>
        <title>Practice Interview — Onward</title>
        <meta name="description" content="Onward AI-powered interview coach." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout showTopNav={true} pageTitle="Practice">
        <Flex flexDirection="column" height="86vh" width="100%">
          <Flex mt="3em" flexDirection="column" alignItems="center">
            <div>Placeholder for File Upload 1</div>
            <div>Placeholder for File Upload 2</div>
          </Flex>

          {/* Displaying fetched questions if available */}
          <VStack spacing={4} align="start" p={8}>
            <Heading as="h2" size="lg">
              Practice Interview Questions
            </Heading>
            {questions.length > 0 ? (
              questions.map((question, index) => (
                <Box key={index} p={4} borderWidth="1px" borderRadius="md">
                  <Text>{question.text}</Text>
                </Box>
              ))
            ) : (
              <Text>No questions available at the moment. Please try again later.</Text>
            )}
          </VStack>

          <Flex flexDirection="row" justify="flex-end" mt="auto" mb="20px">
            <Button
              bg="brand.blushPink"
              size="xs"
              py="1.5rem"
              px="5rem"
              color="white"
              boxShadow="md"
              onClick={handleNextClick}
              _hover={{
                bg: "white",
                color: "brand.blushPink",
                border: "1px",
                boxShadow: "md",
              }}
            >
              Next
            </Button>
          </Flex>
        </Flex>
      </Layout>
    </>
  );
}
