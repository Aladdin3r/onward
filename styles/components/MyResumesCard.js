import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import PDFCard from './PDFCard'; // Ensure correct path to PDFCard

export default function MyResumesCard({ uploadedFiles }) {
    return (
        <Box>
            <Text fontWeight="bold" mb={2}>My Resumes:</Text>
            {uploadedFiles.length > 0 ? (
                uploadedFiles.map((file, index) => (
                    <PDFCard 
                        key={index} 
                        title={file.name} 
                        size={`${(file.size / 1024).toFixed(2)} KB`} // Convert size to KB
                    />
                ))
            ) : (
                <Text color="gray.500">No resumes uploaded</Text> // Placeholder when no files are uploaded
            )}
        </Box>
    );
}
