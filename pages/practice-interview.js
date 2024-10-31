import Head from "next/head";
import styles from "@/styles/Home.module.css";
import "@/styles/theme";
import { Heading, Flex, Button } from "@chakra-ui/react";
import ProgressBar from "@/styles/components/ProgressBar";
import Footer from "@/styles/components/Footer";
import { useRouter } from "next/router"; // Import useRouter
import UploadFile from "@/styles/components/UploadFile";
import Layout from "@/styles/components/Layout";
import { useState } from "react";

export default function PracticeInterview() {
  const [uploadedFiles, setUploadedFiles] = useState([]); // State to manage uploaded files
  const router = useRouter();

  const handleNextClick = () => {
    router.push({
      pathname: "/practice-interview-filter",
    });
  };

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
        <title>Practice Interview — Onward</title>
        <meta
          name="description"
          content="Onward is an AI-powered personal interview coach designed to help nurses, particularly those new to the Canadian healthcare system, excel in job interviews."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout showTopNav={true} title="Practice Interview">
        <div className={styles.page} style={{ position: "relative" }}>
          <Flex
            flexDirection={"column"}
            width="100%"
            height="100vh"
            overflowX="hidden"
            maxW={{ base: "100%", md: "1200px", lg: "1920px" }}
            mx="auto"
          >
            <ProgressBar />
            <Flex flexDirection={"row"} gap={50} align={"center"}>
              <Flex flexDirection={"column"}>
                <Heading as="h2" size="md" mb={3}>
                  Upload Resume
                </Heading>
                <UploadFile
                  fileType="resume"
                  uploadedFiles={uploadedFiles}
                  setUploadedFiles={setUploadedFiles}
                  onFileUpload={handleFileUpload}
                />
              </Flex>
              <Flex flexDirection={"column"}>
                <Heading as="h2" size="md" mb={3}>
                  Upload Job Posting
                </Heading>
                <UploadFile
                  fileType="resume"
                  uploadedFiles={uploadedFiles}
                  setUploadedFiles={setUploadedFiles}
                  onFileUpload={handleFileUpload}
                />
              </Flex>
            </Flex>
            <Flex
              flexDirection={"row"}
              justify={"space-between"}
              mx={"5rem"}
              my={"1rem"}
            >
              <Button size="xxs" onClick={handleNextClick}>
                Next
              </Button>
            </Flex>
          </Flex>
          <Footer />
        </div>
      </Layout>
    </>
  );
}
