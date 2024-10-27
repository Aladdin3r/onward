// import {
//     Box, 
//     Flex, 
//     Text,
//     useColorModeValue,
// } from "@chakra-ui/react";
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";

export default function Footer() {
    const bgColor = useColorModeValue('brand.frostWhite', 'gray.800');
    const textColor = useColorModeValue('gray.800', 'gray.200');

    return (
        <Box bg={bgColor} py={1} position="relative" bottom={0} width="100%">
            <Flex alignItems={'center'} justifyContent="center">
                <Text color={textColor}>© Onward 2024</Text>
            </Flex>
        </Box>
    );
}