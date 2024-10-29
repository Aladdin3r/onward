// LandingPage.js
import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  VStack,
  HStack,
  useBreakpointValue,
} from '@chakra-ui/react';

const LandingPage = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  return (
    <Box
      width="100%"
      maxW="1920px"
      minH="100vh"
      mx="auto"
      px={[4, 8, 16]}
      py={[8, 16]}
      bg="gray.50"
    >
      {/* Hero Section */}
      <Flex
        direction={isDesktop ? 'row' : 'column'}
        align="center"
        justify="space-between"
        py={16}
        px={[4, 8, 16]}
        bg="white"
        shadow="md"
        rounded="lg"
      >
        <VStack
          align={isDesktop ? 'flex-start' : 'center'}
          spacing={6}
          maxW={isDesktop ? '50%' : '100%'}
        >
          <Heading as="h1" fontSize={['3xl', '4xl', '5xl']} color="teal.600">
            Welcome to Our Service
          </Heading>
          <Text fontSize={['md', 'lg', 'xl']} color="gray.600">
            Discover solutions that help streamline your operations and empower
            your business.
          </Text>
          <Button
            colorScheme="teal"
            size="lg"
            px={8}
            py={6}
            rounded="full"
            fontSize={['md', 'lg']}
          >
            Get Started
          </Button>
        </VStack>

        {isDesktop && (
          <Image
            src="/path/to/hero-image.png"
            alt="Hero Image"
            maxW="50%"
            objectFit="cover"
            borderRadius="lg"
          />
        )}
      </Flex>

      {/* Features Section */}
      <Box mt={16} textAlign="center">
        <Heading as="h2" fontSize={['2xl', '3xl', '4xl']} mb={8} color="teal.600">
          Our Features
        </Heading>
        <Flex
          wrap="wrap"
          justify="center"
          gap={8}
          px={[4, 8, 16]}
        >
          {[1, 2, 3].map((feature) => (
            <Box
              key={feature}
              w={['100%', '45%', '30%']}
              p={6}
              bg="white"
              rounded="lg"
              shadow="md"
              textAlign="left"
            >
              <Heading as="h3" fontSize="2xl" color="teal.500">
                Feature {feature}
              </Heading>
              <Text mt={4} color="gray.600">
                Detailed description of the feature and how it benefits the
                user.
              </Text>
            </Box>
          ))}
        </Flex>
      </Box>

      {/* Call to Action Section */}
      <Box
        mt={16}
        py={16}
        bg="teal.600"
        color="white"
        textAlign="center"
        px={[4, 8, 16]}
      >
        <Heading as="h2" fontSize={['2xl', '3xl', '4xl']} mb={6}>
          Ready to Take the Next Step?
        </Heading>
        <Text fontSize={['md', 'lg']} mb={8}>
          Join us today and see the impact of optimized business solutions.
        </Text>
        <Button colorScheme="whiteAlpha" size="lg" px={8} py={6}>
          Contact Us
        </Button>
      </Box>
    </Box>
  );
};

export default LandingPage;
