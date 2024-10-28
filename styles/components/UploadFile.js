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
        <Flex flexDirection={"column"} width={{ base: "100%", md: "47.5rem" }} height={"28rem"} bg={"brand.pureWhite"} p={9}>
            <DragDrop id="drag-drop" height={"12rem"} width={"42rem"}
                uppy={uppyRef.current} // Pass the Uppy instance from the ref
                locale={{
                    strings: {
                        dropHereOr: 'Drop here or %{browse}',
                        browse: 'browse',
                    },
                }}
            />
            <Flex flexDirection={"column"}>
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
