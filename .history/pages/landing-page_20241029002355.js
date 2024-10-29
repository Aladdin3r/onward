// LandingPage.js

import { Box, Flex, Heading, Text, Button, VStack, Image, useBreakpointValue } from "@chakra-ui/react";
import React from "react";

const LandingPage = () => {
  const heroTextSize = useBreakpointValue({ base: "2xl", md: "4xl", lg: "6xl" });
  const subTextSize = useBreakpointValue({ base: "md", md: "lg", lg: "xl" });
  
  return (
    <Box w="100%" h="100vh" bg="gray.50">
      {/* Hero Section */}
      <Flex
        direction="column"
        align="center"
        justify="center"
        bgImage="url('/path-to-hero-image.jpg')"
        bgSize="cover"
        bgPosition="center"
        height="100vh"
        textAlign="center"
        p={4}
      >
        <Heading as="h1" fontSize={heroTextSize} color="white">
          Welcome to Our Platform
        </Heading>
        <Text fontSize={subTextSize} color="gray.200" mt={4}>
          Simplifying Practice Management for Modern Clinics
        </Text>
        <Button mt={8} colorScheme="teal" size="lg">
          Get Started
        </Button>
      </Flex>

      {/* Features Section */}
      <Box py={16} px={8} bg="white">
        <Heading as="h2" fontSize="4xl" textAlign="center" mb={8}>
          Our Features
        </Heading>
        <Flex
          wrap="wrap"
          justify="space-around"
          maxW="1200px"
          mx="auto"
        >
          <Feature
            title="Analytics"
            description="Gain insights with detailed reports and analytics."
            icon="/icons/analytics-icon.png"
          />
          <Feature
            title="Scheduling"
            description="Efficient scheduling for patients and staff."
            icon="/icons/scheduling-icon.png"
          />
          <Feature
            title="Billing"
            description="Streamline billing processes and reduce errors."
            icon="/icons/billing-icon.png"
          />
        </Flex>
      </Box>

      {/* Call to Action Section */}
      <Flex
        direction="column"
        align="center"
        bg="teal.600"
        color="white"
        py={16}
        px={8}
      >
        <Heading as="h2" fontSize="3xl">
          Ready to Transform Your Practice?
        </Heading>
        <Text fontSize="xl" mt={4} textAlign="center" maxW="800px">
          Join our community of practitioners who are taking control of their practice management.
        </Text>
        <Button mt={8} colorScheme="whiteAlpha" size="lg">
          Sign Up Now
        </Button>
      </Flex>
    </Box>
  );
};

// Feature Component
const Feature = ({ title, description, icon }) => (
  <VStack
    w="300px"
    p={8}
    borderRadius="md"
    bg="gray.100"
    boxShadow="lg"
    m={4}
    align="center"
    textAlign="center"
  >
    <Image src={icon} alt={`${title} icon`} boxSize="60px" mb={4} />
    <Heading as="h3" fontSize="xl">{title}</Heading>
    <Text fontSize="md" color="gray.600">{description}</Text>
  </VStack>
);

export default LandingPage;
