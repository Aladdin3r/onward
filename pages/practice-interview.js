import Head from "next/head";
import styles from "@/styles/Home.module.css";
import "@/styles/theme";
import { Heading, Box, Flex, Button, Text } from "@chakra-ui/react";
import ProgressBar from "@/styles/components/ProgressBar";
import Footer from "@/styles/components/Footer";
import { useRouter } from "next/router";
import Layout from "@/styles/components/Layout";
import FileUpload from "@/styles/components/FileUpload";
import { supabase } from '@/lib/supabaseClient';
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function PracticeInterview() {
    const [uploadedFiles, setUploadedFiles] = useState({ resumes: [], jobPosts: [] });
    const router = useRouter();

    const handleNextClick = (e) => {
        e.preventDefault();
        router.push('/practice-interview-filter');
    };

    const handleFileUpload = async (file, type) => {
        console.log(`${type} file uploaded:`, file);
        try {
            const bucketName = type === 'resume' ? 'onward-resume' : 'onward-job-posting';
            const filePath = `uploads/${file.name}`; 
            
            // Upload to Supabase and get the URL
            const { data, error } = await supabase.storage
              .from(bucketName)
              .upload(filePath, file, { upsert: true });
        
            if (error) {
              console.error("Error uploading file:", error.message);
              return;
            }
        
            const publicURL = supabase.storage.from(bucketName).getPublicUrl(filePath).publicURL;
            console.log(publicURL);  

            setUploadedFiles((prevFiles) => {
                const updatedFiles = { ...prevFiles };
                const fileType = type === 'resume' ? 'resumes' : 'jobPosts';

                updatedFiles[fileType] = [...updatedFiles[fileType], { id: filePath, url: publicURL }];
                return updatedFiles;
            });
        } catch (err) {
            console.error("Upload failed:", err.message);
        }
    };
    

    const handleDeleteFile = async (fileId, type) => {
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
            <Layout showTopNav={true} pageTitle="Practice Interview">
                <div className={styles.page} style={{ position: "relative" }}>
                    <Flex 
                        flexDirection={"column"} 
                        width="100%" 
                        maxW={{ base: "100%", md: "1200px", lg: "1920px" }} 
                        minH={{ base: "100vh", xl: "72vh", "2xl":"80vh" }} 
                        mx="auto"
                        flexGrow={1} 
                    >
                        <ProgressBar currentStep={1}/>
                        <Flex 
                            ml={{ base: "3", lg: "5", xl: "8", "2xl": "10" }}
                            columnGap={{lg: "3rem", "2xl": "5rem" }}
                            flexDirection={{ base: "column", xl: "row" }} 
                        >
                            {/* Resume Upload */}
                            <FileUpload 
                                title="Upload Resume"
                                fileType="resume"
                                uploadedFiles={uploadedFiles?.resumes || []} 
                                setUploadedFiles={(files) => setUploadedFiles(prev => ({ ...prev, resumes: files }))}
                                onFileUpload={(file) => handleFileUpload(file, 'resume')}
                                bucketName="onward-resume"
                                onDeleteFile={(fileId) => handleDeleteFile(fileId, 'resume')}
                            />
                            
                            {/* Job Posting upload */}
                            <FileUpload 
                                title="Upload Job Posting"
                                fileType="job-posting"
                                uploadedFiles={uploadedFiles?.jobPosts || []}
                                setUploadedFiles={(files) => setUploadedFiles(prev => ({ ...prev, jobPosts: files }))}
                                onFileUpload={(file) => handleFileUpload(file, 'job-posting')}
                                bucketName="onward-job-posting"
                                onDeleteFile={(fileId) => handleDeleteFile(fileId, 'job-posting')}
                            />
                        </Flex>
                    </Flex>
                    {/* Next Button */}
                    <Flex 
                        flexDirection={"row"} 
                        justify={"flex-end"} 
                        mt="auto"
                    >
                        <Button 
                            bg={"brand.blushPink"} 
                            size={{ base: "xxs", "2xl":"sm"}} 
                            py={"1.5rem"} px={"4rem"} 
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
                </div>
            </Layout>
        </>
    );
}
