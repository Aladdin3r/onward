'use client';
import { Box } from '@chakra-ui/react';

export default function AppTopNav({ title }) {
    return (
        <Box 
            id="app-top-nav" 
            bg=""
            px={4} 
            borderBottom="1px solid #E6EAF2"
        >
            <Box color="brand.nightBlack" fontSize={{ base: 'md', md: 'lg' }} height={"4rem"}>
                <h2>{title}</h2>
            </Box>
        </Box>
    );
}