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

    useEffect(() => {
        const fetchUploadedFiles = async () => {
            const { data, error } = await supabase.storage.from(bucketName).list('uploads/');

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
                title: 'Deletion Failed.',
                description: deleteError.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        setUploadedFilesState((prevFiles) => prevFiles.filter(file => file.name !== fileName));
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
        <Flex flexDir={"row"} width={'100%'} alignItems={"space-between"} mb={6} >
            <Box width={"40rem"} height={"30rem"}>
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
