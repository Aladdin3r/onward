import { Box, Image, Text } from '@chakra-ui/react'

export default function PDFCard({ title, size}) {
    return (
        <Box p={3} w="21.5vw" h="65px" bg="gray.50" borderRadius="md" borderWidth="1px" display="flex" alignItems="center">
                  <Image src="/images/PDF-icon.svg" alt="PDF Icon" width="32px" style={{ marginRight: '8px' }} />
                    <Text fontSize="12pt" flex="1">{title}</Text>
                    <Text fontSize="12pt" color="gray.500">{size}</Text>
                  </Box>
    )
 }