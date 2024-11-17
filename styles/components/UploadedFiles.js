import { Flex, Box, Text } from "@chakra-ui/react";
import PDFCard from "./PDFCard";

export default function UploadedFiles({ files = [], selectedFiles = [], handleDeleteFile, handleFileSelect, type }) {
    return (
        <Flex flexDirection="column" mt={4}>
            <Text fontSize={'13pt'} fontWeight={'semibold'} mb={2}>Uploaded Files:</Text>
            {files.length === 0 ? (
                <Text>No files uploaded yet.</Text>
            ) : (
                <Box>
                    {files.map((file) => (
                        <Flex
                            key={file.id}
                            alignItems="center"
                            mb={2}
                            onClick={() => {
                                console.log('Attempting to call handleFileSelect...');
                                handleFileSelect(file, type); // Call handleFileSelect with proper arguments
                            }}
                        >
                            <PDFCard
                                file={file} // Pass the entire file object to the PDFCard component
                                title={file.name}
                                size={`${(file.size / 1024).toFixed(1)} KB`}
                                handleDeleteFile={handleDeleteFile}
                                isSelected={selectedFiles.includes(file.id)}
                            />
                        </Flex>
                    ))}
                </Box>
            )}
        </Flex>
    );
}
