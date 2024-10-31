import Head from "next/head";
import styles from "@/styles/Home.module.css";
import "@/styles/theme";
import { Heading, Box, CardBody, Stack, Card, Flex } from "@chakra-ui/react";
import HistoryContainer from "@/styles/components/HistoryContainer";
import MyResumesCard from "@/styles/components/MyResumesCard";
import Footer from "@/styles/components/Footer";
import Layout from "@/styles/components/Layout";
import DashboardCard from "@/styles/components/DashBoardStartCard";
import { useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from "react";
import PracticeInterview from "./practice-interview";

export default function Home() {
  const [uploadedFiles, setUploadedFiles] = useState([]); // State to manage uploaded files
  const { isOpen: isStartPracticingOpen, onOpen: onStartPracticingOpen, onClose: onStartPracticingClose } = useDisclosure();
  const { isOpen: isViewAllOpen, onOpen: onViewAllOpen, onClose: onViewAllClose } = useDisclosure();
  const router = useRouter();

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
      <Layout showTopNav={false}>
        <Flex className={`${styles.page}`} flexDirection="row">
          <main className={styles.main} style={{ position: "relative" }}>
            <Flex flexDir={"column"}> 
              <Box className="content" m={6} >
                <Heading fontFamily="heading" color="black" fontWeight="bold" fontSize="32pt" zIndex={10} position="relative">
                  <span style={{ color: "#EA4A7D" }}>Welcome back,</span> Onwarder!
                </Heading>

                <Box display="flex" justifyContent="space-between" gap={6} mt={7}>
                  <Card width="50vw" borderRadius="15px" boxShadow="md">
                    <CardBody>
                      <Stack spacing={4} align="center">
                        <DashboardCard />
                      </Stack>
                    </CardBody>
                  </Card>

                  <Card width="26vw" borderRadius="15px" boxShadow="md">
                    <CardBody>
                      <MyResumesCard uploadedFiles={uploadedFiles} /> {/* Pass uploaded files to MyResumesCard */}
                    </CardBody>
                  </Card>
                </Box>

                <Box display="flex" justifyContent="space-between" mt={7}>
                  <Card width="78vw" borderRadius="15px" boxShadow="md">
                    <HistoryContainer />
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
