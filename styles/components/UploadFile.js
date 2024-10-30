import React, { useEffect, useRef, useState } from 'react';
import { Flex, Box, Text } from "@chakra-ui/react";
import Uppy from '@uppy/core';
import { DragDrop } from '@uppy/react';

import '@uppy/core/dist/style.min.css';
import '@uppy/drag-drop/dist/style.min.css';

export default function UploadFile({ fileType }) {
    const [selectedFile, setSelectedFile] = useState(null);

    const uppyRef = useRef(new Uppy({
        restrictions: {
            maxNumberOfFiles: 3,
            allowedFileTypes: ['image/*', 'application/pdf'], // Adjust file types as needed
        },
    }));

    useEffect(() => {
        // Listen for file added event
        uppyRef.current.on('file-added', (file) => {
            setSelectedFile(file.name); // Update state with the file name
        });

        // Cleanup function
        return () => {
            if (uppyRef.current && typeof uppyRef.current.close === 'function') {
                uppyRef.current.close();
            }
        };
    }, []);

    return (
        <Flex 
            flexDirection="column" 
            overflowX="hidden" 
            maxW="50rem"   
            bg="brand.pureWhite" 
            px="200px"
            py="80px"
            borderWidth="1px"
            borderRadius="lg" 
            boxShadow="md"
        >
            <DragDrop 
                uppy={uppyRef.current} 
                width="18rem" 
                height="10rem" // Adjust height to make the component more compact
                locale={{
                    strings: {
                        dropHereOr: 'Drop here or %{browse}',
                        browse: 'browse',
                    },
                }}
            />
            <Flex flexDirection="column" mt={3}>
                <Box>
                    <Text fontWeight="bold">Default Resume</Text>
                </Box>
                <Box mt={2}>
                    {selectedFile ? (
                        <Text>{selectedFile}</Text> // Display selected file name here
                    ) : (
                        <Text color="gray.500">No file chosen</Text> // Placeholder text when no file is selected
                    )}
                </Box>
            </Flex>
        </Flex>
    );
}
