import Head from "next/head";
import { useState } from "react";
import "@/styles/theme";
import "@phosphor-icons/web/light";
import "@phosphor-icons/web/bold";
import { Box, Avatar, Text, VStack, HStack, Button, Heading, Divider, Link, SimpleGrid } from "@chakra-ui/react";
import TopNav from "@/styles/components/TopNav";
import Layout from "@/styles/components/Layout";
import MyResumesCard from "@/styles/components/MyResumesCard";
import Footer from "@/styles/components/Footer";
import { SideNavBar } from "@/styles/components/SideNav";
import PDFCard from "@/styles/components/PDFCard";
import MyJobPostingsCard from "@/styles/components/MyJobPostingsCard";

export default function User() {
  const [uploadedFiles, setUploadedFiles] = useState([]); // State to manage uploaded files
  const handleFileUpload = (file) => {
    setUploadedFiles((prevFiles) => {
      // Check if the file is already in the array
      const isFileExist = prevFiles.some(uploadedFile => uploadedFile.name === file.name);
      if (!isFileExist) {
        return [...prevFiles, file]; // Only add if it doesn't exist
      }
      return prevFiles; // Return existing state if file already exists
    });
  };
  return (
    <>
      <Head>
        <title>Onward</title>
        <meta name="description" content="Onward is an AI-powered personal interview coach designed to help nurses, particularly those new to the Canadian healthcare system, excel in job interviews." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {/* Wrapping SideNavBar and main content in a flex container */}
        <Layout showTopNav={true} pageTitle="Profile">

          {/* Main content area */}
          <Box flex="1" p={6} minW="1350px" mx="auto" >
            {/* User Profile Header */}
            <Box bg="white" shadow="sm" borderRadius="lg" p={5} mb={5}>
              <HStack spacing={5}>
                {/* Avatar with edit button overlay */}
                <Box position="relative" display="inline-block" bg="brand.platnium">
                  <Avatar size="xl" name="Jane Doe" src="/practice-analysis-images/videoPlaceholder.jpg" />
                  <Box
                    position="absolute"
                    top="0"
                    right="0"
                    w="24px"
                    h="24px"
                    bg="white"
                    borderRadius="full"
                    border="2px solid white"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    boxShadow="md"
                  />
                </Box>

                {/* User Info */}
                <VStack align="start" spacing={1}>
                  <Text fontWeight="bold" fontSize="2xl">Jane Doe</Text>
                  <Text color="gray.500">@Janedoe123</Text>
                </VStack>
              </HStack>
            </Box>

            {/* Personal Information Section */}
            <Box bg="white" shadow="sm" borderRadius="lg" p={5} mb={5}>
              <HStack justifyContent="space-between">
                <Heading size="md">Personal Information</Heading>
                <Button fontSize="xs" variant="xsSecondary">Edit</Button>
              </HStack>
              <Divider my={4} />
              <SimpleGrid columns={{ base: 1, md: 2 }} gridTemplateColumns={{ base: "1fr", md: "1fr 2fr" }}>
                <VStack align="start">
                  <Text fontWeight="bold">First Name:</Text>
                  <Text>Jane</Text>
                  <Text fontWeight="bold" mt={5}>Email Address:</Text>
                  <Text>testing@gmail.com</Text>
                </VStack>
                <Box> 
                  <VStack align="left">
                    <Text fontWeight="bold">Last Name:</Text>
                    <Text>Doe</Text>
                    <Text fontWeight="bold" mt={5}>Phone Number:</Text>
                    <Text>(778)-574-7154</Text>
                  </VStack>
                </Box>
              </SimpleGrid>
            </Box>

            {/* Resumes and Job Postings Section */}
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
              {/* My Resumes Section */}
              {/* <Box bg="white" shadow="sm" borderRadius="lg" p={5} display="flex" flexDirection="column"> */}
                <MyResumesCard uploadedFiles={uploadedFiles} /> {/* Pass uploaded files to MyResumesCard */}
              {/* </Box> */}
              {/* My Job Postings Section */}
              {/* <Box bg="white" shadow="sm" borderRadius="lg" p={5} display="flex" flexDirection="column"> */}
                <MyJobPostingsCard uploadedFiles={uploadedFiles} />
              {/* </Box> */}
            </SimpleGrid>
          </Box>
        </Layout>
      </div>
    </>
  );
}
