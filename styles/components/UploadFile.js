import React, { useEffect, useRef } from 'react';
import { Flex, Box, Text } from "@chakra-ui/react";
import Uppy from '@uppy/core';
import { DragDrop } from '@uppy/react';
import PDFCard from './PDFCard'; // Adjust the import according to your file structure

import '@uppy/core/dist/style.min.css';
import '@uppy/drag-drop/dist/style.min.css';

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
        <Flex 
            flexDirection="column" 
            overflowX="hidden" 
            maxW="50rem"   
            bg="brand.pureWhite" 
            px="100px"
            py="80px"
            borderWidth="1px"
            borderRadius="lg" 
            boxShadow="md"
        >
            <DragDrop 
                uppy={uppyRef.current} 
                width="18rem" 
                height="10rem"
                locale={{
                    strings: {
                        dropHereOr: 'Drop here or %{browse}',
                        browse: 'browse',
                    },
                }}
            />
            <Flex flexDirection="column" mt={3}>
                <Box>
                    <Text fontWeight="bold">Uploaded Files:</Text>
                </Box>
                <Box mt={2}>
                    {uploadedFiles.length > 0 ? (
                        uploadedFiles.map((file, index) => (
                            <PDFCard key={index} title={file.name} size={`${(file.size / 1024).toFixed(2)} KB`} />
                        ))
                    ) : (
                        <Text color="gray.500">No files uploaded</Text>
                    )}
                </Box>
            </Flex>
        </Flex>
    );
}
