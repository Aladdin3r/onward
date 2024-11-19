import { Flex, Box, Text, CloseButton, Image } from "@chakra-ui/react";

export default function PDFCard({ title, size, isSelected, handleDeleteFile, handleFileSelect, file, type }) {

    console.log('PDFCard isSelected:', isSelected, 'for file:', file.name); 
    
  return (
      <Flex 
        p={4} w="100%" h="65px" 
        borderRadius="md" borderWidth="1px" 
        alignItems="center" 
        bgColor="brand.blueberryCreme"
        border={isSelected ? "2px" : 0}
        borderColor={isSelected ? "brand.confirmationGreen" : "none"}
        // boxShadow={isSelected ? "md" : "null"}
      >
          <Box>
              <Image src="/images/PDF-icon.svg" alt="PDF Icon" width="32px" style={{ marginRight: '8px' }} />
          </Box>
          <Box>
              <Text fontSize="12pt" flex="1">{title}</Text>
              <Text fontSize="12pt" color="gray.500">{size}</Text>
          </Box>
          <Box alignSelf={"flex-start"} ml="auto">
              <CloseButton
                  aria-label="Delete file"
                  size="sm"
                  onClick={() => handleDeleteFile(title)} />
          </Box>
      </Flex>
  )
}