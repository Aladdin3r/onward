import { Box, Text } from '@chakra-ui/react';
import { useState } from 'react';

export default function MyResumesCard({ uploadedFiles = [] }) { 


    return (
        <Box 
            w={{ base: "32rem", lg:"14rem", xl: "30rem", "2xl":"38rem" }}
            h={{ base: "60%", lg: "100%", xl: "18rem", "2xl":"24rem" }}
            borderRadius="15px" 
            overflow="hidden"
            boxShadow="md"
            backgroundColor="brand.pureWhite"
            px={{ base: "4", xl: "10", "2xl":"12" }}
            py={{ base: "4", xl: "6" }}
            display="flex"
            flexDirection="column"
        >
            <Text 
                fontSize={{ base: "xs", lg: "xxs", xl: "sm", "2xl":"md" }}
                fontWeight="bold" 
                mb={2}
                >
                    My Resumes:
                </Text>
                <Box>
                {uploadedFiles.map((file) => (
                    <Box key={file.id} display="flex" justifyContent="space-between">
                        <Text>{file.name}</Text>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
