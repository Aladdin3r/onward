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

export default function Home() {
  const [uploadedFiles, setUploadedFiles] = useState([]); // State to manage uploaded files
  const { isOpen: isStartPracticingOpen, onOpen: onStartPracticingOpen, onClose: onStartPracticingClose } = useDisclosure();
  const { isOpen: isViewAllOpen, onOpen: onViewAllOpen, onClose: onViewAllClose } = useDisclosure();
  const router = useRouter();

  const handleFileUpload = (file) => {
    setUploadedFiles((prevFiles) => {
      const isFileExist = prevFiles.some(uploadedFile => uploadedFile.name === file.name);
      return isFileExist ? prevFiles : [...prevFiles, file];
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
      
      <Layout showTopNav={false} title="">
        <Flex 
          className={styles.page}
          flexDirection="row"
          maxWidth={{ base: "container.sm", md: "container.md", lg: "container.lg", xl: "container.xl", "2xl": "container.2xl" }}
          mx="auto"
          px={{ base: 4, md: 6 }}
        >
          <main className={styles.main}>
            <Flex flexDir="column">
              
              <Box mt={9} mx={3}>
                <Heading 
                  fontFamily="heading"
                  color="black"
                  fontWeight="bold"
                  fontSize={{ base: "md", md: "md", lg: "lg", "2xl": "xl" }}
                  zIndex={10}
                >
                  <span style={{ color: "#EA4A7D" }}>Welcome back,</span> Onwarder!
                </Heading>

                {/* Cards Row */}
                <Flex justifyContent="space-between" gap={6} mt={7} flexWrap="wrap">
                  <Card borderRadius="15px" boxShadow="md" flex="1" minW="250px">
                    <CardBody>
                      <Stack spacing={4} align="center">
                        <DashboardCard />
                      </Stack>
                    </CardBody>
                  </Card>

                  <Card borderRadius="15px" boxShadow="md" flex="1" minW="250px">
                    <CardBody>
                      <MyResumesCard uploadedFiles={uploadedFiles} />
                    </CardBody>
                  </Card>
                </Flex>

                {/* History Container */}
                <Box mt={7}>
                  <Card 
                    width="100%" 
                    maxW="78vw"
                    borderRadius="15px" 
                    boxShadow="md"
                  >
                    <CardBody>
                      <HistoryContainer />
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
