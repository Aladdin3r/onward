import Head from "next/head";
import { Heading, Box, Flex, Button, Text } from "@chakra-ui/react";
import ProgressBar from "@/styles/components/ProgressBar";
import Footer from "@/styles/components/Footer";
import { useRouter } from "next/router";
import Layout from "@/styles/components/Layout";
import FileUpload from "@/styles/components/FileUpload";
import { supabase } from '@/lib/supabaseClient';
import { useState, useEffect } from "react";

export default function PracticeInterview({ questions }) {
  const [uploadedFiles, setUploadedFiles] = useState({ resumes: [], jobPosts: [] });
  const [selectedFiles, setSelectedFiles] = useState({ resumes: [], jobPosts: [] });
  const router = useRouter();

  const handleNextClick = () => {
    // Save file selection to local storage
    const storedFiles = JSON.stringify(selectedFiles);
    localStorage.setItem("selectedFiles", storedFiles);

    // Ensure user selects a resume and job post file
    if (!selectedFiles.resumes.length || !selectedFiles.jobPosts.length) {
      alert("Please select one resume and one job post to get a tailored analysis for you!");
      return; // Prevent navigation
    }

    router.push("/practice-interview-filter");
  };

  useEffect(() => {
    const savedSelections = JSON.parse(localStorage.getItem("selectedFiles"));
    if (savedSelections) {
      console.log("Restored selections from local storage:", savedSelections);
      setSelectedFiles(savedSelections);
    }
  }, []);

  const handleFileSelect = (file, type) => {
    try {
      setSelectedFiles((prev) => {
        const updatedSelection = { ...prev };
        const fileType = type === "resume" ? "resumes" : "jobPosts";

        // Allow only one file per type
        updatedSelection[fileType] = [{ id: file.name, name: file.name }];

        // Persist to localStorage
        localStorage.setItem("selectedFiles", JSON.stringify(updatedSelection));

        return updatedSelection;
      });
    } catch (error) {
      console.error("Error in handleFileSelect:", error);
    }
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
      <Layout showTopNav={true} pageTitle="Practice">
        <Flex flexDirection="column" height="86vh" width="100%">
          <ProgressBar activeStep={0} />
          <Flex
            ml={{ xl: "8", "2xl": "10" }}
            columnGap={{ lg: "3rem", "2xl": "5rem" }}
            flexDirection={{ base: "column", xl: "row" }}
            mt="3em"
            alignItems={{ base: "center", xl: "unset" }}
          >
            {/* Resume Upload */}
            <FileUpload
              title="Upload Resume"
              fileType="resume"
              bucketName="onward-resume"
              onFileUpload={(newFile) => console.log("Uploaded File:", newFile)}
              selectedFiles={selectedFiles.resumes}
              handleFileSelect={(file) => handleFileSelect(file, "resume")}
            />

            {/* Job Posting Upload */}
            <FileUpload
              title="Upload Job Posting"
              fileType="job-posting"
              bucketName="onward-job-posting"
              onFileUpload={(newFile) => console.log("Uploaded File:", newFile)}
              selectedFiles={selectedFiles.jobPosts}
              handleFileSelect={(file) => handleFileSelect(file, "jobPost")}
            />
          </Flex>

          {/* Questions Preview */}
          <Box mt="4" p="4" bg="brand.blueberryCreme" borderRadius="md" boxShadow="sm">
            <Heading size="md" mb="2">Interview Questions Preview</Heading>
            {questions && questions.length > 0 ? (
              questions.map((question, index) => (
                <Text key={index} fontSize="sm" mb="1">
                  {index + 1}. {question}
                </Text>
              ))
            ) : (
              <Text>No questions available</Text>
            )}
          </Box>

          {/* Next Button */}
          <Flex flexDirection={"row"} justify={"flex-end"} mt={"auto"} mb="20px">
            <Button
              bg={"brand.blushPink"}
              size="xs"
              py={"1.5rem"}
              px={"5rem"}
              width={{ base: "8rem", "2xl": "12rem" }}
              height={{ base: "2rem", "2xl": "2.5rem" }}
              color={"white"}
              boxShadow={"md"}
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

export async function getStaticProps() {
  // Simulate fetching questions
  const questions = [
    "Tell me about yourself.",
    "Why did you choose nursing as a profession?",
    "How do you handle a stressful situation with a patient?",
    "Describe a time you worked with a difficult team member.",
  ];

  return {
    props: { questions },
  };
}
