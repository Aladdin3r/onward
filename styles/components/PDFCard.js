import { Box, Image, Text } from '@chakra-ui/react'

export default function PDFCard({ title, size}) {
    return (
        <Box p={3} w="25vw" h="65px" bg="gray.50" borderRadius="md" borderWidth="1px" display="flex" alignItems="center">
                  <Image src="/images/PDF-icon.svg" alt="PDF Icon" width="32px" style={{ marginRight: '8px' }} />
                    <Text fontSize="xs" flex="1">{title}</Text>
                    <Text fontSize="xxs" color="gray.500">{size}</Text>
                  </Box>
    )
 }