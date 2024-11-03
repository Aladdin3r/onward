import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import PDFCard from './PDFCard'; 

export default function MyResumesCard({ uploadedFiles = [] }) { // default to an empty array
    return (
        <Box width="30vw">
            <Text fontWeight="bold" mb={2}>My Resumes:</Text>
            {uploadedFiles.length > 0 ? (
                uploadedFiles.map((file, index) => (
                    <PDFCard 
                        key={index} 
                        title={file.name} 
                        size={`${(file.size / 1024).toFixed(2)} KB`} 
                    />
                ))
            ) : (
                <Text color="gray.500">No resumes uploaded</Text>
            )}
        </Box>
    );
}
