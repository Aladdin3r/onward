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

export default function FileUpload({ title, fileType, initialUploadedFiles, setUploadedFiles, onFileUpload, bucketName, type }) {
    const [uploadedFiles, setUploadedFilesState] = useState(initialUploadedFiles || []);
    const toast = useToast();

    // create Uppy instance and pass necessary configurations
    const uppy = useRef(
        new Uppy({
            restrictions: {
                maxNumberOfFiles: 3,
                allowedFileTypes: ['application/pdf', 'application/msword'],
            },
        })
    );

    useEffect(() => {
        const fetchUploadedFiles = async () => {
            const { data, error } = await supabase.storage
                .from(bucketName)
                .list('uploads/');
            console.log("data", data);
            if (error) {
                console.error('Error fetching files:', error.message);
                return;
            }

            const files = data.map(file => ({
                id: uuidv4(),
                name: file.name,
                size: file.metadata.size,
            }));
            setUploadedFilesState(files);
        };

        fetchUploadedFiles();
    }, [bucketName]);

    useEffect(() => {
        // attach file-added event listener to Uppy instance
        const handleFileAdded = async (file) => {
            const isFileAlreadyUploaded = uploadedFiles.some((uploadedFile) => uploadedFile.name === file.name);
            if (!isFileAlreadyUploaded) {
                const newFile = { id: uuidv4(), name: file.name, size: file.size };

                try {
                    // upload file to Supabase
                    const { data: uploadData, error: uploadError } = await supabase.storage
                        .from(bucketName)
                        .upload(`uploads/${file.name}`, file.data, {
                            cacheControl: '3600',
                            upsert: true,
                        });

                    if (uploadError) {
                        throw new Error(uploadError.message);
                    }

                    // get the file's public URL
                    const { publicURL, error: urlError } = await supabase.storage
                        .from(bucketName)
                        .getPublicUrl(`uploads/${file.name}`);

                    if (urlError) {
                        throw new Error(urlError.message);
                    }

                    const uploadedFileWithUrl = { ...newFile, url: publicURL };
                    setUploadedFilesState(prevFiles => [...prevFiles, uploadedFileWithUrl]);
                    onFileUpload(uploadedFileWithUrl);

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
            } else {
                toast({
                    title: 'File Already Uploaded.',
                    description: `${file.name} has already been uploaded.`,
                    status: 'info',
                    duration: 3000,
                    isClosable: true,
                });
            }
        };

        uppy.current.on('file-added', handleFileAdded);

        // cleanup function 
        return () => {
            uppy.current.off('file-added', handleFileAdded);
        };
    }, [uploadedFiles, bucketName, toast, onFileUpload]);

    // handle file deletion
    const handleDeleteFile = async (fileName) => {
        const { error: deleteError } = await supabase.storage
            .from(bucketName)
            .remove([`uploads/${fileName}`]);

        if (deleteError) {
            console.error('Error deleting file:', deleteError.message);
            toast({
                title: 'Failed To Delete.',
                description: deleteError.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        toast({
            title: 'Delete successful.',
            description: `${fileName} has been deleted.`,
            status: 'success',
            duration: 3000,
            isClosable: true,
        });

        setUploadedFilesState((prevFiles) => prevFiles.filter(file => file.name !== fileName));
    };

    return (

        <Flex 
            flexDir={"row"} 
            width={'100%'} 
            alignItems={"space-between"} 
            mb={{ base: "2rem", md: "2rem" }} 
        >
            <Box 
                width={{ base: "30rem", md: "32rem", lg: "38rem", xl:"29rem", "2xl": "42rem" }} 
                height={{ base: "25rem",  lg: "30rem", "2xl": "35rem" }} 
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
                    fontSize={{ base: "xxs", md: "xxs", xl: "16pt" }} 
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
                    <UploadedFiles files={uploadedFiles} handleDeleteFile={handleDeleteFile} />
                </Flex>
            </Box>
        </Flex>
    );
}
