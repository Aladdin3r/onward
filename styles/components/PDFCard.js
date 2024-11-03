import { Box, Flex, Image, Text, CloseButton } from '@chakra-ui/react'

export default function PDFCard({ title, size, handleDeleteFile}) {
  
    return (
        <Flex p={3} w="21.5vw" h="65px" bg="brand.blueberryCreme" borderRadius="md" borderWidth="1px" alignItems="center">
          <Box>
            <Image src="/images/PDF-icon.svg" alt="PDF Icon" width="32px" style={{ marginRight: '8px' }} />
          </Box>
          <Box>
            <Text fontSize="12pt" flex="1">{title}</Text>
            <Text fontSize="12pt" color="gray.500">{size}</Text>
          </Box>
          <Box alignSelf={"flex-start"} ml={"5rem"}>
            <CloseButton 
              aria-label="Delete file" 
              size="sm" 
              onClick={() => handleDeleteFile(title)} />
          </Box>
        </Flex>
    )
 }