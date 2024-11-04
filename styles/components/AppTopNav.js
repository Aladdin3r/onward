import { Box } from '@chakra-ui/react';

export default function AppTopNav({ title, logo }) {

    return (
        <Box 
            id="app-top-nav" 
            px={4}
            pl={"90px"} 
            borderBottom="1px solid #E6EAF2"
        >
        <Box color="brand.nightBlack" fontSize={{ base: 'md', md: 'lg' }} height={"1.6rem"} display="flex" alignItems="center">
            {logo && (
                <Image src={logo} alt="Logo" boxSize="2rem" mr={2} />
            )}
        </Box>
        <Box color="brand.nightBlack" fontSize={{ base: 'md', md: 'lg' }} height={"4rem"}>
            <h2>{title}</h2>
            
        </Box>
        </Box>
    );
}
