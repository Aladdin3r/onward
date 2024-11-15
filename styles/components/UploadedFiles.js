import { Heading, Box, Flex, Text, IconButton } from "@chakra-ui/react";
import { FilePdf } from "@phosphor-icons/react";
import PDFCard from "./PDFCard";

export default function UploadedFiles({ files = [], handleDeleteFile }) {
    console.log("files", files);
    return (
        <Flex flexDirection="column" mt={4}>
            <Text fontSize={'13pt'} fontWeight={'semibold'} mb={2}>Uploaded Files:</Text>
            {files.length === 0 ? (
                <Text>No files uploaded yet.</Text>
            ) : (
                <Box>
                    {files.map((file) => (
                        <Flex key={file.id} alignItems="center" mb={2}>
                            <PDFCard title={file.name} size={`${(file.size / 1024).toFixed(1)} KB`} handleDeleteFile={handleDeleteFile}/>
                        </Flex>
                    ))}
                </Box>
            )}
        </Flex>
    );
}
