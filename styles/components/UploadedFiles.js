import { Heading, Box, Flex, Button, Text, IconButton } from "@chakra-ui/react";
import { FilePdf } from "@phosphor-icons/react";

export default function UploadedFiles({ files = [], onDeleteFile }) {
    return (
        <Flex flexDirection="column" mt={4}>
            <Text fontSize={'13pt'} fontWeight={'semibold'} mb={2}>Uploaded Files:</Text>
            {files.length === 0 ? (
                <Text>No files uploaded yet.</Text>
            ) : (
                <Box>
                    {files.map((file) => (
                        <Flex key={file.id} bg={"brand.blueberryCreme"} borderRadius={"10px"} padding={2} m={1} alignItems="center">
                            <Box pr={2}><FilePdf size={24} /></Box>
                            <Text flex="1">{file.name}</Text>
                            <IconButton
                                aria-label="Delete file"
                                icon={<span style={{ fontSize: '16px' }}>Del</span>}
                                onClick={() => onDeleteFile(file.id)}
                                variant="outline"
                                colorScheme="red"
                            />
                        </Flex>
                    ))}
                </Box>
            )}
        </Flex>
    );
}
