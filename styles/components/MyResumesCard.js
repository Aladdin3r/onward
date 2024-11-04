import { Box, Text } from '@chakra-ui/react';
import PDFCard from './PDFCard'; 

export default function MyResumesCard({ uploadedFiles = [] }) { 
    return (
        <Box 
            w={{ base: "30.5rem", lg:"18rem", xl: "34rem", "2xl":"41rem" }}
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
