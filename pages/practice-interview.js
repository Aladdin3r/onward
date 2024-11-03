import Head from "next/head";
import styles from "@/styles/Home.module.css";
import "@/styles/theme";
import { Heading, Box, Flex, Button, Text } from "@chakra-ui/react";
import ProgressBar from "@/styles/components/ProgressBar";
import Footer from "@/styles/components/Footer";
import { useRouter } from "next/router"; 
import Layout from "@/styles/components/Layout";
import FileUpload from "@/styles/components/FileUpload";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

// uploads & deletes fine, but currently can't upload same file again, need to fix same file checking logic 

export default function PracticeInterview() {
    const [uploadedResumeFiles, setUploadedResumeFiles] = useState([]);
    const [uploadedJobPostFiles, setUploadedJobPostFiles] = useState([]);

    const router = useRouter();

    const handleNextClick = (e) => {
        e.preventDefault();
        router.push('/practice-interview-filter');
    };

    const handleResumeUpload = async (file) => {
        console.log("Resume file uploaded:", file);
        const uniqueId = uuidv4(); 
        const fileWithId = { id: uniqueId, name: file.name }; // Create an object with id and name
    
        setUploadedResumeFiles((prevFiles) => {
           
            if (!prevFiles.find((f) => f.name === file.name)) {
                return [...prevFiles, fileWithId]; 
            }
            return prevFiles;
        });
        const extractedText = await extractDataFromFile(file);
        console.log("Extracted Resume Text:", extractedText);
    };

    const handleJobPostUpload = async (file) => {
        console.log("Job post file uploaded:", file);

        const uniqueId = uuidv4();
        const fileWithId = { id: uniqueId, name: file.name }; 
    
        setUploadedJobPostFiles((prevFiles) => {
          
            if (!prevFiles.find((f) => f.name === file.name)) {
                return [...prevFiles, fileWithId]; 
            }
            return prevFiles; 
        });

        const extractedText = await extractDataFromFile(file); 
        console.log("Extracted Job Posting Text:", extractedText);
    };

    const extractDataFromFile = async (file) => {
        try {
            const response = await fetch('/api/parse-pdf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    file: {
                        data: await file.arrayBuffer(),
                        name: file.name,
                    },
                }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            return result.text; // return the extracted text
        } catch (error) {
            console.error("Error extracting data from file:", error);
        }
    };

    const handleDeleteFile = (fileName) => {
        setUploadedFiles((prevFiles) => prevFiles.filter(file => file.name !== fileName));
    };

    const handleDeleteResumeFile = (fileId) => {
        setUploadedResumeFiles((prevFiles) => prevFiles.filter((f) => f.id !== fileId));
    };

    const handleDeleteJobPostFile = (fileId) => {
        setUploadedJobPostFiles((prevFiles) => prevFiles.filter((f) => f.id !== fileId));
    };

    const [currentStep, setCurrentStep] = useState(0);

    return (
        <>
             <Head>
                <title>Practice Interview — Onward</title>
                <meta name="description" content="Onward is an AI-powered personal interview coach designed to help nurses, particularly those new to the Canadian healthcare system, excel in job interviews." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <div className={styles.page} style={{ position: "relative" }}>
                    <Flex 
                        flexDirection={"column"} 
                        width="100%" 
                        height="100vh" 
                        maxW={{ base: "100%", md: "1200px", lg: "1920px" }} 
                        mx="auto"
                    >
                        <ProgressBar currentStep={1}/>
                        <Flex gap={"5rem"} mt={"3rem"}>
                            {/* Resume Upload */}
                            <FileUpload 
                                title="Upload Resume"
                                fileType="resume"
                                uploadedFiles={uploadedResumeFiles}
                                setUploadedFiles={setUploadedResumeFiles}
                                onFileUpload={handleResumeUpload}
                                bucketName="onward-resume"
                            />
                            
                            {/* Job Posting upload */}
                            <FileUpload 
                                title="Upload Job Posting"
                                fileType="job-posting"
                                uploadedFiles={uploadedJobPostFiles}
                                setUploadedFiles={setUploadedJobPostFiles}
                                onFileUpload={handleJobPostUpload}
                                bucketName="onward-job-posting"
                            />
                        </Flex>

                        {/* bottom buttons */}
                        <Flex flexDirection={"row"} justify={"flex-end"} mt={"auto"} mb={"3rem"}>
                            <Button bg={"brand.blushPink"} size="xs" color={"white"} py={"1.5rem"} px={"5rem"} 
                                onClick={handleNextClick}
                                _hover={{
                                    bg: "white",
                                    color: "brand.blushPink"
                                }}
                            >
                                Next
                            </Button>
                        </Flex>
                    </Flex>
                    </div>
            </Layout>
        </>
    )
}
