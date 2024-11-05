import Head from "next/head";
import { Heading, Box, Flex } from "@chakra-ui/react";
import HistoryContainer from "@/styles/components/HistoryContainer";
import MyResumesCard from "@/styles/components/MyResumesCard";
import Footer from "@/styles/components/Footer";
import Layout from "@/styles/components/Layout";
import DashboardCard from "@/styles/components/DashBoardStartCard";
import { useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from "react";


export default function Home({ uploadedResumeFiles }) {

  const router = useRouter();

  // const handleFileUpload = (file) => {
  //   setUploadedFiles((prevFiles) => {
  //     const isFileExist = prevFiles.some(uploadedFile => uploadedFile.name === file.name);
  //     return isFileExist ? prevFiles : [...prevFiles, file];
  //   });
  // };

  // const handleDeleteFile = (fileToDelete) => {
  //   setUploadedFiles((prevFiles) => prevFiles.filter(file => file !== fileToDelete));
  // };

  console.log(uploadedResumeFiles);


  return (
    <>
      <Head>
        <title>Onward</title>
        <meta name="description" content="Onward is an AI-powered personal interview coach designed to help nurses, particularly those new to the Canadian healthcare system, excel in job interviews." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Layout showTopNav={false} title="">
        <Flex 
          flexDirection="column" 
          minH="100%" 
          p={3} 
          mt={3}
        >
          <Heading 
            fontFamily="heading"
            color="black"
            fontWeight="bold"
            fontSize={{ base: "md", md: "md", lg: "lg", "2xl": "xl" }}
            zIndex={10}
            mb={4}
          >
            <span style={{ color: "#EA4A7D" }}>Welcome back,</span> Onwarder!
          </Heading>

          {/* Cards Row */}
          <Flex 
            flexDirection={{ base: "column", lg: "row"}}
            justifyContent={"space-between"}
            flex="1" mt={3} 
            alignItems="stretch"
            gap={3}
          >
            {/* Left Card */}
            <Box>
              <DashboardCard />
            </Box>

            {/* Right Card */}
            <Box>
              <MyResumesCard uploadedFiles={uploadedResumeFiles}/>
            </Box>
          </Flex>

          {/* History Container */}
          <Box 
            flex="0 0 90%"
            mt={3} 
          >
            <HistoryContainer />
          </Box>
        </Flex>
      </Layout>
    </>
  );
}
