import React, { useEffect, useRef } from 'react';
import { Flex, Box, Text, Heading } from "@chakra-ui/react";
import Uppy from '@uppy/core';
import { DragDrop } from '@uppy/react';
import { FilePdf } from '@phosphor-icons/react';

import '@uppy/core/dist/style.min.css';
import '@uppy/drag-drop/dist/style.min.css';
import { Brandy } from '@phosphor-icons/react';

export default function UploadFile({ fileType, uploadedFiles, setUploadedFiles, onFileUpload }) {
    const uppyRef = useRef(
        new Uppy({
            restrictions: {
                maxNumberOfFiles: 3,
                allowedFileTypes: ['image/*', 'application/pdf'],
            },
        })
    );

    useEffect(() => {
        const handleFileAdded = (file) => {
            // Check if the file is already uploaded
            const isFileAlreadyUploaded = uploadedFiles.some((uploadedFile) => uploadedFile.name === file.name);
            if (!isFileAlreadyUploaded) {
                const newFile = { name: file.name, size: file.size };
                setUploadedFiles((prevFiles) => [...prevFiles, newFile]); // Update state with file details
                onFileUpload(newFile); // Call the parent function to update uploaded files in the dashboard
            } else {
                // Optionally, you can show a message that the file is already uploaded
                console.log(`${file.name} is already uploaded.`);
            }
        };

        uppyRef.current.on('file-added', handleFileAdded);

        // Cleanup function
        return () => {
            uppyRef.current.off('file-added', handleFileAdded); // Remove the listener on unmount
            if (uppyRef.current && typeof uppyRef.current.close === 'function') {
                uppyRef.current.close();
            }
        };
    }, [uploadedFiles, onFileUpload, setUploadedFiles]);

    return (
        <>
        <Flex flexDir={"row"}
            width={'50rem'}
            justifyContent={"space-between"}
        >
            <Box width={"23rem"} height={"30rem"}>
                <Heading as='h2' size='md' padding={4}>
                    Upload Resume
                </Heading>
                <Flex 
                    flexDirection="column" 
                    overflowX="hidden" 
                    maxW="50rem"  
                    mx="auto" 
                    bg="brand.pureWhite" 
                    p={6}
                    borderWidth="1px"
                    borderRadius="lg" 
                    boxShadow="md"
                >
                    <DragDrop 
                        id='resume'
                        uppy={uppyRef.current} 
                        width="100%" 
                        height="8rem" // Adjust height to make the component more compact
                        locale={{
                            strings: {
                                dropHereOr: 'Drop here or %{browse}',
                                browse: 'browse',
                            },
                        }}
                    />
                    <Flex flexDirection="column" mt={4}>
                        <Flex justifyContent={"center"}>
                            <Text fontSize={'13pt'} fontWeight={'semibold'}>Default Resume:</Text>
                            <span><Text ml={"6rem"} p={1}>View All</Text></span>
                        </Flex>
                        {/* uploaded files list */}
                        <Box>
                           <Flex bg={"brand.blueberryCreme"} borderRadius={"10px"} padding={2} m={1}><Box pr={2}><FilePdf size={24}/></Box><Text>ResumeUpdatedJuly.pdf</Text></Flex>
                           <Flex bg={"brand.blueberryCreme"} borderRadius={"10px"} padding={2} m={1}><Box pr={2}><FilePdf size={24}/></Box><Text>CoverLetter(2024).pdf</Text></Flex>
                           <Flex bg={"brand.blueberryCreme"} borderRadius={"10px"} padding={2} m={1}><Box pr={2}><FilePdf size={24}/></Box><Text>Resume-VGH.pdf</Text></Flex>
                        </Box>
                    </Flex>
                </Flex>
            </Box>

            <Box width={"22rem"} height={"30rem"}>
                <Heading as='h2' size='md' padding={4}>
                    Upload Job Posting
                </Heading>

                <Flex 
                    flexDirection="column"
                    overflowX="hidden" 
                    maxW="50rem"  
                    mx="auto" 
                    bg="brand.pureWhite" 
                    p={6}
                    borderWidth="1px"
                    borderRadius="lg" 
                    boxShadow="md"
                >
                    <DragDrop 
                        id='job-post'
                        uppy={uppyRef.current} 
                        width="100%" 
                        height="8rem" // Adjust height to make the component more compact
                        locale={{
                            strings: {
                                dropHereOr: 'Drop here or %{browse}',
                                browse: 'browse',
                            },
                        }}
                    />
                    <Flex flexDirection="column" mt={4}>
                        <Flex justifyContent={"center"}>
                            <Text fontSize={'13pt'} fontWeight={'semibold'}>Default Job Posting:</Text>
                            <span><Text ml={"5rem"}>View All</Text></span>
                        </Flex>
                        {/* uplaoded files list */}
                        <Box>
                        <Flex bg={"brand.blueberryCreme"} borderRadius={"10px"} padding={2} m={1}><Box pr={2}><FilePdf size={24}/></Box><Text>VancouverClinicalNurse.pdf</Text></Flex>
                        <Flex bg={"brand.blueberryCreme"} borderRadius={"10px"} padding={2} m={1}><Box pr={2}><FilePdf size={24}/></Box><Text>Vancouver General Hospital.pdf</Text></Flex>
                        <Flex bg={"brand.blueberryCreme"} borderRadius={"10px"} padding={2} m={1}><Box pr={2}><FilePdf size={24}/></Box><Text>BCIT Health Services.pdf</Text></Flex>
                        </Box>
                    </Flex>
                </Flex>
            </Box>
        </Flex>
        </>

        
    );
}
