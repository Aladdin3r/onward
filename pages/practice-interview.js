import Head from "next/head";
import { Heading, Box, Flex, Button, Text } from "@chakra-ui/react";
import ProgressBar from "@/styles/components/ProgressBar";
import Footer from "@/styles/components/Footer";
import { useRouter } from "next/router";
import Layout from "@/styles/components/Layout";
import FileUpload from "@/styles/components/FileUpload";
import { supabase } from "@/lib/supabaseClient";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function PracticeInterview() {
  const [uploadedFiles, setUploadedFiles] = useState({ resumes: [], jobPosts: [] });
  const [selectedFiles, setSelectedFiles] = useState({ resumes: [], jobPosts: [] });
  const router = useRouter();

  const handleNextClick = async () => {
    // Ensure user selects a resume and job post file
    if (!selectedFiles.resumes.length || !selectedFiles.jobPosts.length) {
      alert("Please select one resume and one job post to get a tailored analysis for you!");
      return; // Prevent navigation
    }

    // Save file selection to local storage
    const storedFiles = JSON.stringify(selectedFiles);
    localStorage.setItem("selectedFiles", storedFiles);

    router.push("/practice-interview-filter");
  };

  // Restore last file selection from local storage
  useEffect(() => {
    const savedSelections = localStorage.getItem("selectedFiles");
    if (savedSelections) {
      const parsedSelections = JSON.parse(savedSelections);
      setSelectedFiles(parsedSelections);
    }
  }, []);

  // Handle file selection
  const handleFileSelect = (file, type) => {
    setSelectedFiles((prev) => {
      const updatedSelection = { ...prev };
      const fileType = type === "resume" ? "resumes" : "jobPosts";
      updatedSelection[fileType] = [{ id: file.name, name: file.name }];
      localStorage.setItem("selectedFiles", JSON.stringify(updatedSelection));
      return updatedSelection;
    });
  };

  // Handle file upload
  const sessionId = Date.now(); // Generate a unique session ID for the session
  const handleResponseUpload = async (file, questionId) => {
    try {
      const bucketName = "onward-responses";
      const filePath = `uploads/${sessionId}/response-${questionId}-${file.name}`;
      const { error } = await supabase.storage.from(bucketName).upload(filePath, file, { upsert: true });

      if (error) {
        console.error("Error uploading response file:", error.message);
        return;
      }

      const publicURL = supabase.storage.from(bucketName).getPublicUrl(filePath).publicUrl;
      setUploadedFiles((prevFiles) => [
        ...prevFiles,
        { sessionId, questionId, name: file.name, url: publicURL },
      ]);
    } catch (err) {
      console.error("Upload failed:", err.message);
    }
  };

  // Handle file deletion
  const handleDeleteFile = async (fileId, type) => {
    const bucketName = type === "resume" ? "onward-resume" : "onward-job-posting";
    const filePath = `uploads/${fileId}`;
    try {
      const { error } = await supabase.storage.from(bucketName).remove([filePath]);
      if (error) {
        console.error("Error deleting file from Supabase:", error.message);
        return;
      }
      setUploadedFiles((prevFiles) => {
        const updatedFiles = { ...prevFiles };
        const fileType = type === "resume" ? "resumes" : "jobPosts";
        updatedFiles[fileType] = updatedFiles[fileType].filter((file) => file.id !== fileId);
        return updatedFiles;
      });
    } catch (err) {
      console.error("Error deleting file:", err.message);
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

          {/* Next Button */}
          <Flex flexDirection="row" justify="flex-end" mt="auto" mb="20px">
            <Button
              bg="brand.blushPink"
              size="xs"
              py="1.5rem"
              px="5rem"
              width={{ base: "8rem", "2xl": "12rem" }}
              height={{ base: "2rem", "2xl": "2.5rem" }}
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
