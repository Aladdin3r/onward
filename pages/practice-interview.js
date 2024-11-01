import Head from "next/head";
import styles from "@/styles/Home.module.css";
import "@/styles/theme";
import { Heading, Box, Flex, Button, Text } from "@chakra-ui/react";
import ProgressBar from "@/styles/components/ProgressBar";
import Footer from "@/styles/components/Footer";
import { useRouter } from "next/router"; // Import useRouter
import Layout from "@/styles/components/Layout";
import ResumeUpload from "@/styles/components/ResumeUpload"
import JobPostUpload from "@/styles/components/JobPostUpload"
import UploadedFiles from "@/styles/components/UploadedFiles";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function PracticeInterview() {
    const [uploadedResumeFiles, setUploadedResumeFiles] = useState([]);
    const [uploadedJobPostFiles, setUploadedJobPostFiles] = useState([]);

    const router = useRouter();

    const handleNextClick = (e) => {
        e.preventDefault();
        router.push('/practice-interview-filter');
    };

    const handleResumeUpload = (file) => {
        console.log("Resume file uploaded:", file);
        const uniqueId = uuidv4(); 
        const fileWithId = { id: uniqueId, name: file.name }; // Create an object with id and name
    
        setUploadedResumeFiles((prevFiles) => {
           
            if (!prevFiles.find((f) => f.name === file.name)) {
                return [...prevFiles, fileWithId]; 
            }
            return prevFiles;
        });
    };

    const handleJobPostUpload = (file) => {
        console.log("Job post file uploaded:", file);

        const uniqueId = uuidv4();
        const fileWithId = { id: uniqueId, name: file.name }; 
    
        setUploadedJobPostFiles((prevFiles) => {
          
            if (!prevFiles.find((f) => f.name === file.name)) {
                return [...prevFiles, fileWithId]; 
            }
            return prevFiles; 
        });
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
                    <Flex flexDirection={"column"} 
                        width="100%" 
                        height="100vh" 
                        maxW={{ base: "100%", md: "1200px", lg: "1920px" }} 
                        mx="auto"
                    >
                        <ProgressBar currentStep={1}/>
                        {/* resume section */}
                        <ResumeUpload 
                            onFileUpload={handleResumeUpload} 
                            uploadedFiles={uploadedResumeFiles} 
                            setUploadedFiles={setUploadedResumeFiles}
                            key={uploadedResumeFiles.length} // adding unique key 
                        />
                        <UploadedFiles files={uploadedResumeFiles} onDeleteFile={handleDeleteResumeFile} />
                        

                        {/* job posting section */}
                        <JobPostUpload 
                            onFileUpload={handleJobPostUpload} 
                            uploadedFiles={uploadedJobPostFiles} 
                            setUploadedFiles={setUploadedJobPostFiles} 
                            key={uploadedJobPostFiles.length} // adding unique key 
                        />

                        <Flex flexDirection={"row"} justify={"flex-end"} mt={"10px"}>
                            <Button bg={"brand.blushPink"} size="xxs" width={"6rem"} color={"white"} p={2}
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
