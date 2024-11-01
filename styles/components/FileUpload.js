// components/FileUpload.js
import React, { useEffect, useRef } from 'react';
import { Flex, Box, Heading } from "@chakra-ui/react";
import { DragDrop } from '@uppy/react';
import '@uppy/core/dist/style.min.css';
import '@uppy/drag-drop/dist/style.min.css';
import UploadedFiles from './UploadedFiles';
import Uppy from '@uppy/core';
import { supabase } from '@/lib/supabaseClient';

export default function FileUpload({ title, fileType, uploadedFiles, setUploadedFiles, onFileUpload, bucketName }) {
    const uppyRef = useRef(new Uppy({
        restrictions: {
            maxNumberOfFiles: 3,
            allowedFileTypes: ['application/pdf'],
        },
    }));

    useEffect(() => {
        const handleFileAdded = async (file) => {
            if (!Array.isArray(uploadedFiles)) {
                console.error("uploadedFiles should be an array");
                return;
            }

            // Check if the file is already uploaded
            const isFileAlreadyUploaded = uploadedFiles.some((uploadedFile) => uploadedFile.name === file.name);
            if (!isFileAlreadyUploaded) {
                const newFile = { name: file.name, size: file.size };
                setUploadedFiles((prevFiles) => [...prevFiles, newFile]); 
                onFileUpload(newFile);

                // Upload file to Supabase
                const { data, error } = await supabase.storage
                    .from(bucketName) 
                    .upload(`uploads/${file.name}`, file.data, { // Ensure you're using file.data here
                        cacheControl: '3600',
                        upsert: true,
                    });

                if (error) {
                    console.error('Error uploading file:', error.message);
                } else {
                    console.log('File uploaded successfully:', data);
                }
            } else {
                console.log(`${file.name} is already uploaded.`);
            }
        };

        uppyRef.current.on('file-added', handleFileAdded);

        // Cleanup function
        return () => {
            uppyRef.current.off('file-added', handleFileAdded);
            if (uppyRef.current && typeof uppyRef.current.close === 'function') {
                uppyRef.current.close();
            }
        };
    }, [uploadedFiles, onFileUpload]); 

    const handleDeleteFile = (fileName) => {
        setUploadedFiles(uploadedFiles.filter(file => file.name !== fileName));
    };

    return (
        <Flex flexDir={"row"} width={'50rem'} justifyContent={"space-between"} mb={6}>
            <Box width={"48rem"} height={"30rem"}>
                <Heading as='h2' size='md' padding={4}>{title}</Heading>
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
                        id={fileType}
                        uppy={uppyRef.current} 
                        width="100%" 
                        height="8rem" 
                        locale={{
                            strings: {
                                dropHereOr: 'Drop here or %{browse}',
                                browse: 'browse',
                            },
                        }}
                    />
                    <UploadedFiles files={uploadedResumeFiles} onDeleteFile={handleDeleteResumeFile} />
                    <UploadedFiles files={uploadedJobPostFiles} onDeleteFile={handleDeleteJobPostFile} />
                </Flex>
            </Box>
        </Flex>
    );
}
