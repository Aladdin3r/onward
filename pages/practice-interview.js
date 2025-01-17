import Head from "next/head";
import { Heading, Box, Flex, Button, Text } from "@chakra-ui/react";
import ProgressBar from "@/styles/components/ProgressBar";
import Footer from "@/styles/components/Footer";
import { useRouter } from "next/router";
import Layout from "@/styles/components/Layout";
import FileUpload from "@/styles/components/FileUpload";
import { supabase } from '@/lib/supabaseClient';
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function PracticeInterview() {
  const [uploadedFiles, setUploadedFiles] = useState({ resumes: [], jobPosts: [] });
  const [selectedFiles, setSelectedFiles] = useState({ resumes: [], jobPosts: [] });
  const router = useRouter();

    const handleNextClick = async () => {
        // save file selection to local storage
        const storedFiles = JSON.stringify(selectedFiles);
        localStorage.setItem("selectedFiles", storedFiles);
        
       // ensure user select a resume and job post file
        if (!selectedFiles.resumes.length || !selectedFiles.jobPosts.length) {
            alert("Please select one resume and one job post to get a tailored analysis for you!");
            return; // Prevent navigation
        }

        router.push("/practice-interview-filter");
        
    };

    // remember last file selection
    useEffect(() => {
      const savedSelections = JSON.parse(localStorage.getItem("selectedFiles"));
      if (savedSelections) {
          console.log("Restored selections from local storage:", savedSelections);
          setSelectedFiles(savedSelections); 
      }
  }, []);
  
  

    // handle file selection
    const handleFileSelect = (file, type) => {
        try {
            console.log("File and Type received:", file, type);
    
            setSelectedFiles((prev) => {
                const updatedSelection = { ...prev };
                const fileType = type === "resume" ? "resumes" : "jobPosts";
    
                console.log("Current Selection:", updatedSelection[fileType]);
                updatedSelection[fileType] = [{ id: file.id, name: file.name }];
    
                // Allow only one file per type
                updatedSelection[fileType] = [{ id: file.name, name: file.name }];
    
                // Persist to localStorage
                localStorage.setItem("selectedFiles", JSON.stringify(updatedSelection));
                console.log("LocalStorage Selection:", JSON.parse(localStorage.getItem("selectedFiles")));
    
                return updatedSelection;
            });
        } catch (error) {
            console.error("Error in handleFileSelect:", error);
        }
    };  

    // handle file uplaod
    const sessionId = Date.now(); // Generate a unique session ID at the start of the session

    const handleResponseUpload = async (file, questionId) => {
      console.log(`Response file uploaded:`, file);
    
      try {
        
        const bucketName = "onward-responses"; 
        const filePath = `uploads/${sessionId}/response-${questionId}-${file.name}`; // Group by session and question
        console.log(`Uploading to bucket: ${bucketName}, path: ${filePath}`);
    
        // Upload the response file to Supabase
        const { data, error } = await supabase.storage
          .from(bucketName)
          .upload(filePath, file, { upsert: true });
    
        if (error) {
          console.error("Error uploading response file:", error.message);
          return;
        }
    
        // Generate the public URL for the uploaded response
        const publicURL = supabase.storage.from(bucketName).getPublicUrl(filePath).publicUrl;
        console.log("Public URL:", publicURL);
    
        // Update state or return the public URL for further use
        setUploadedFiles((prevFiles) => [
          ...prevFiles,
          { sessionId, questionId, name: file.name, url: publicURL },
        ]);
    
      } catch (err) {
        console.error("Upload failed:", err.message);
      }
  };
    
  const handleDeleteFile = async (fileId, type) => {
    console.log("delete stuff");
    const bucketName = type === 'resume' ? 'onward-resume' : 'onward-job-posting';
    const filePath = `uploads/${fileId}`;
    
    try {
      const { error } = await supabase.storage.from(bucketName).remove([filePath]);
  
      if (error) {
        console.error("Error deleting file from Supabase:", error.message);
        return;
      }

      console.log(`File ${fileId} deleted successfully from ${bucketName}`);
  
      // update the UI 
      setUploadedFiles((prevFiles) => {
        const updatedFiles = { ...prevFiles };
        const fileType = type === 'resume' ? 'resumes' : 'jobPosts';
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
        <meta name="description" content="Onward is an AI-powered personal interview coach designed to help nurses, particularly those new to the Canadian healthcare system, excel in job interviews." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout showTopNav={true} pageTitle="Practice">
        <Flex 
          flexDirection="column"
          height="86vh"
          width="100%"
        >
          <ProgressBar activeStep={0}/>
          <Flex 
            ml={{ xl: "8", "2xl": "10" }}
            columnGap={{lg: "3rem", "2xl": "5rem" }}
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

            {/* Job Posting upload */}
            <FileUpload
                title="Upload Job Posting"
                fileType="job-posting"
                bucketName="onward-job-posting"
                onFileUpload={(newFile) => console.log("Uploaded File:", newFile)}
                selectedFiles={selectedFiles.jobPosts}
                handleFileSelect={(file) => handleFileSelect(file, "jobPost")}
            />
          </Flex>

          {/* next button */}
          <Flex 
            flexDirection={"row"} 
            justify={"flex-end"} 
            mt={"auto"}
            mb="20px"
          >
            <Button 
              bg={"brand.blushPink"} 
              size="xs"
              py={"1.5rem"} px={"5rem"} 
              width={{ base: "8rem", "2xl":"12rem"}} 
              height={{ base: "2rem", "2xl":"2.5rem"}} 
              color={"white"} 
              boxShadow={"md"} 
              onClick={handleNextClick}
              _hover={{
                bg: "white",
                color: "brand.blushPink",
                border: "1px",
                boxShadow:"md"
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
