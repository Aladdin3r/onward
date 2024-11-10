import React, { useEffect, useRef, useState } from 'react';
import { Flex, Box, Heading, useToast } from "@chakra-ui/react";
import { DragDrop } from '@uppy/react';
import '@uppy/core/dist/style.min.css';
import '@uppy/drag-drop/dist/style.min.css';
import UploadedFiles from './UploadedFiles';
import Uppy from '@uppy/core';
import { supabase } from '@/lib/supabaseClient';
import { v4 as uuidv4 } from 'uuid'; // to assign unique id to files

export default function FileUpload({ title, fileType, initialUploadedFiles, setUploadedFiles, onFileUpload, bucketName }) {
    const [uploadedFiles, setUploadedFilesState] = useState(initialUploadedFiles || []);
    const toast = useToast();
    const uppyRef = useRef(new Uppy({
        restrictions: {
            maxNumberOfFiles: 3,
            allowedFileTypes: ['application/pdf'],
        },
    }));

    // retrieve from local storage 
    useEffect(() => {
        const storedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
        setUploadedFilesState(storedFiles);
    }, []);

    // retrieve from supabase
    useEffect(() => {
        const fetchUploadedFiles = async () => {
            const { data, error } = await supabase.storage.from(bucketName).list('uploads/');

            console.log(data);

            if (error) {
                console.error('Error fetching files:', error.message);
            } else {
                const files = data.map(file => ({
                    id: uuidv4(),
                    name: file.name,
                }));
                setUploadedFilesState(files);
            }
        };

        fetchUploadedFiles();
    }, [bucketName]);

    // adding file to uppy
    useEffect(() => {
        const handleFileAdded = async (file) => {
            const isFileAlreadyUploaded = uploadedFiles.some((uploadedFile) => uploadedFile.name === file.name);
            if (!isFileAlreadyUploaded) {
                const newFile = { id: uuidv4(), name: file.name, size: file.size };
                setUploadedFilesState((prevFiles) => [...prevFiles, newFile]);
                onFileUpload(newFile);

                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from(bucketName)
                    .upload(`uploads/${file.name}`, file.data, {
                        cacheControl: '3600',
                        upsert: true,
                    });

                if (uploadError) {
                    console.error('Error uploading file:', uploadError.message);
                    toast({
                        title: 'Upload Failed.',
                        description: uploadError.message,
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    });
                } else {
                    console.log('File uploaded successfully:', uploadData);
                    toast({
                        title: 'Upload Successful.',
                        description: `${file.name} has been uploaded.`,
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    });
                }
            } else {
                console.log(`${file.name} is already uploaded.`);
                toast({
                    title: 'File Already Uploaded.',
                    description: `${file.name} has already been uploaded.`,
                    status: 'info',
                    duration: 3000,
                    isClosable: true,
                });
            }
        };

        uppyRef.current.on('file-added', handleFileAdded);

        return () => {
            uppyRef.current.off('file-added', handleFileAdded);
            if (uppyRef.current && typeof uppyRef.current.close === 'function') {
                uppyRef.current.close();
            }
        };
    }, [uploadedFiles, onFileUpload]);

    

    const handleDeleteFile = async (fileName) => {
        const { data: deleteData, error: deleteError } = await supabase.storage
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

        // updating local storage after delete
        const updatedFiles = uploadedFiles.filter(file => file.name !== fileName);
        setUploadedFilesState(updatedFiles);
        localStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles)); 
        console.log('File deleted successfully:', deleteData);
        toast({
            title: 'File Deleted.',
            description: `${fileName} has been deleted.`,
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
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
                <Heading 
                    fontSize={{ base: "xxs", md: "xxs", xl: "16pt" }} 
                    padding={4}
                >
                    {title}
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
                        id={fileType}
                        uppy={uppyRef.current} 
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
