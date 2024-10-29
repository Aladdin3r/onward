import Head from "next/head";
import "@/styles/theme";
import "@phosphor-icons/web/light";
import "@phosphor-icons/web/bold";
import { Box, Avatar, Text, VStack, HStack, Button, Heading, Divider, Link, SimpleGrid } from "@chakra-ui/react";
import TopNav from "@/styles/components/TopNav";
import Layout from "@/styles/components/Layout";
import Footer from "@/styles/components/Footer";
import { SideNavBar } from "@/styles/components/SideNav";

export default function User() {
  return (
    <>
      <Head>
        <title>User</title>
        <meta name="description" content="Onward is an AI-powered personal interview coach designed to help nurses, particularly those new to the Canadian healthcare system, excel in job interviews." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <TopNav />
        {/* Wrapping SideNavBar and main content in a flex container */}
        <Layout>

          {/* Main content area */}
          <Box flex="1" p={6} maxW="1200px" mx="auto">
            {/* User Profile Header */}
            <Box bg="white" shadow="sm" borderRadius="lg" p={5} mb={5}>
              <HStack spacing={5}>
                <Avatar size="xl" name="Jane Doe" src="/path-to-avatar.jpg" />
                <VStack align="start" spacing={1}>
                  <Text fontWeight="bold" fontSize="2xl">Jane Doe</Text>
                  <Text color="gray.500">@Janedoe123</Text>
                </VStack>
                <Button size="sm" variant="outline" ml="auto">Edit</Button>
              </HStack>
            </Box>

            {/* Personal Information Section */}
            <Box bg="white" shadow="sm" borderRadius="lg" p={5} mb={5}>
              <HStack justifyContent="space-between">
                <Heading size="md">Personal Information</Heading>
                <Button size="sm" variant="outline">Edit</Button>
              </HStack>
              <Divider my={4} />
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <VStack align="start">
                  <Text fontWeight="bold">First Name:</Text>
                  <Text>Jane</Text>
                </VStack>
                <VStack align="start">
                  <Text fontWeight="bold">Last Name:</Text>
                  <Text>Doe</Text>
                </VStack>
                <VStack align="start">
                  <Text fontWeight="bold">Email Address:</Text>
                  <Text>testing@gmail.com</Text>
                </VStack>
                <VStack align="start">
                  <Text fontWeight="bold">Phone Number:</Text>
                  <Text>(778)-574-7154</Text>
                </VStack>
              </SimpleGrid>
            </Box>

            {/* Resumes and Job Postings Section */}
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
              {/* My Resumes Section */}
              <Box bg="white" shadow="sm" borderRadius="lg" p={5}>
                <Heading size="md" mb={3}>My Resumes</Heading>
                <Text fontSize="sm" color="gray.500" mb={3}>Default</Text>
                <VStack align="start" spacing={3}>
                  <Box p={3} w="100%" bg="gray.50" borderRadius="md" borderWidth="1px" display="flex" alignItems="center">
                    <Text color="red.500" fontWeight="bold" mr={2}>PDF</Text>
                    <Text flex="1">Resume for Burnaby</Text>
                    <Text fontSize="sm" color="gray.500">94 KB of 94 KB</Text>
                  </Box>
                  <Box p={3} w="100%" bg="gray.50" borderRadius="md" borderWidth="1px" display="flex" alignItems="center">
                    <Text color="red.500" fontWeight="bold" mr={2}>PDF</Text>
                    <Text flex="1">Resume for Burnaby</Text>
                    <Text fontSize="sm" color="gray.500">94 KB of 94 KB</Text>
                  </Box>
                </VStack>
                <Link color="pink.500" fontSize="sm" mt={3} display="inline-block">View All</Link>
              </Box>

              {/* My Job Postings Section */}
              <Box bg="white" shadow="sm" borderRadius="lg" p={5}>
                <Heading size="md" mb={3}>My Job Postings</Heading>
                <Text fontSize="sm" color="gray.500" mb={3}>Default</Text>
                <VStack align="start" spacing={3}>
                  <Box p={3} w="100%" bg="gray.50" borderRadius="md" borderWidth="1px" display="flex" alignItems="center">
                    <Text color="red.500" fontWeight="bold" mr={2}>PDF</Text>
                    <Text flex="1">Resume for Burnaby</Text>
                    <Text fontSize="sm" color="gray.500">94 KB of 94 KB</Text>
                  </Box>
                  <Box p={3} w="100%" bg="gray.50" borderRadius="md" borderWidth="1px" display="flex" alignItems="center">
                    <Text color="red.500" fontWeight="bold" mr={2}>PDF</Text>
                    <Text flex="1">Resume for Burnaby</Text>
                    <Text fontSize="sm" color="gray.500">94 KB of 94 KB</Text>
                  </Box>
                </VStack>
                <Link color="pink.500" fontSize="sm" mt={3} display="inline-block">View All</Link>
              </Box>
            </SimpleGrid>
          </Box>
        </Layout>
        <Footer />
      </div>
    </>
  );
}
