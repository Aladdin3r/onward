import React, { useEffect, useRef, useState } from 'react';
import { Flex, Box, Heading, useToast } from "@chakra-ui/react";
import { DragDrop } from '@uppy/react';
import '@uppy/core/dist/style.min.css';
import '@uppy/drag-drop/dist/style.min.css';
import StatusBar from '@uppy/status-bar';
import UploadedFiles from './UploadedFiles';
import Uppy from '@uppy/core';
import { supabase } from '@/lib/supabaseClient';
import { v4 as uuidv4 } from 'uuid';

export default function FileUpload({
    title,
    fileType,
    initialUploadedFiles = [],
    onFileUpload,
    bucketName,
    handleFileSelect,
    selectedFiles,
}) {
    const [uploadedFiles, setUploadedFiles] = useState(initialUploadedFiles);
    const toast = useToast();

    const uppy = useRef(
        new Uppy({
            restrictions: {
                maxNumberOfFiles: 3,
                allowedFileTypes: ['application/pdf', 'application/msword'],
            },
        })
    );

    // Fetch uploaded files from Supabase
    useEffect(() => {
        const fetchUploadedFiles = async () => {
            const { data, error } = await supabase.storage
                .from(bucketName)
                .list('uploads/');

            if (error) {
                console.error('Error fetching files:', error.message);
                return;
            }

            const files = data.map(file => ({
                id: uuidv4(),
                name: file.name,
                size: file.metadata?.size || 0,
            }));
            setUploadedFiles(files);
        };

        fetchUploadedFiles();
    }, [bucketName]);

    // Handle file-added event
    useEffect(() => {
        const handleFileAdded = async (file) => {
            if (uploadedFiles.some((uploadedFile) => uploadedFile.name === file.name)) {
                toast({
                    title: 'File Already Uploaded.',
                    description: `${file.name} has already been uploaded.`,
                    status: 'info',
                    duration: 3000,
                    isClosable: true,
                });
                return;
            }

            try {
                // Upload file to Supabase
                const { error: uploadError } = await supabase.storage
                    .from(bucketName)
                    .upload(`uploads/${file.name}`, file.data, {
                        cacheControl: '3600',
                        upsert: true,
                    });

                if (uploadError) throw new Error(uploadError.message);

                // Get the file's public URL
                const { publicURL, error: urlError } = await supabase.storage
                    .from(bucketName)
                    .getPublicUrl(`uploads/${file.name}`);

                if (urlError) throw new Error(urlError.message);

                const newFile = { id: uuidv4(), name: file.name, size: file.size, url: publicURL };
                setUploadedFiles((prevFiles) => [...prevFiles, newFile]);
                onFileUpload(newFile);

                toast({
                    title: 'Upload Successful.',
                    description: `${file.name} has been uploaded.`,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            } catch (error) {
                console.error('Error uploading file:', error.message);
                toast({
                    title: 'Upload Failed.',
                    description: error.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        };

        uppy.current.on('file-added', handleFileAdded);

        return () => {
            uppy.current.off('file-added', handleFileAdded);
        };
    }, [uploadedFiles, bucketName, onFileUpload, toast]);

    // Handle file deletion
    const handleDeleteFile = async (fileName) => {
        try {
            const { error } = await supabase.storage
                .from(bucketName)
                .remove([`uploads/${fileName}`]);

            if (error) throw new Error(error.message);

            setUploadedFiles((prevFiles) => prevFiles.filter(file => file.name !== fileName));

            toast({
                title: 'Delete Successful.',
                description: `${fileName} has been deleted.`,
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Error deleting file:', error.message);
            toast({
                title: 'Failed To Delete.',
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Flex 
            flexDir="row" 
            width="100%" 
            alignItems="space-between" 
            mb="2rem"
        >
            <Box 
                width={{ base: "30rem", lg: "38rem", "2xl": "42rem" }}
                height={{ base: "25rem", "2xl": "35rem" }}
            >
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
                    <Heading 
                        fontSize={{ base: "xxs", xl: "16pt" }} 
                        pb={4}
                    >
                        {title}
                    </Heading>
                    <DragDrop
                        id={fileType}
                        uppy={uppy.current}
                        width="100%"
                        height="9rem"
                        locale={{
                            strings: {
                                dropHereOr: 'Drop file here or %{browse}',
                                browse: 'browse',
                            },
                        }}
                    />
                    <UploadedFiles 
                        files={uploadedFiles} 
                        handleDeleteFile={handleDeleteFile} 
                        selectedFiles={selectedFiles} 
                        handleFileSelect={handleFileSelect}    
                    />
                </Flex>
            </Box>
        </Flex>
    );
}
