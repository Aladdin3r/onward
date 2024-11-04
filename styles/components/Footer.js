import { Box, Flex, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box 
      bg="brand.footerGrey" 
      py={1} 
      width="100%"
      mt={3}
    >
      <Flex alignItems="center" justifyContent="center">
        <Text color="brand.nightBlack">© Onward 2024</Text>
      </Flex>
    </Box>
  );
}
