import React, { useEffect, useRef } from 'react';
import { Flex, Box } from "@chakra-ui/react";
import Uppy from '@uppy/core';
import { DragDrop } from '@uppy/react';

import '@uppy/core/dist/style.min.css';
import '@uppy/drag-drop/dist/style.min.css';

export default function UploadFile({ fileType }) {
    const uppyRef = useRef(new Uppy({
        restrictions: {
            maxNumberOfFiles: 3,
            allowedFileTypes: ['image/*', 'application/pdf'], // Adjust file types as needed
        },
    }));

    // the uppy.close is giving me issues 

    // useEffect(() => {
    //     // Clean up the Uppy instance on unmount
    //     return () => {
    //         uppyRef.current.close();
    //     };
    // }, []);

    // Need to figure out how to differentiate RESUME vs JOB POST

    return (
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
                uppy={uppyRef.current} 
                width="100%" 
                height="12rem" // Adjust height to make the component more compact
                locale={{
                    strings: {
                        dropHereOr: 'Drop here or %{browse}',
                        browse: 'browse',
                    },
                }}
            />
            <Flex flexDirection="column" mt={4}>
                <Box>
                    <p>Default Resume</p>
                </Box>
                <Box>
                    Resume list
                </Box>
            </Flex>
        </Flex>
    );
}
