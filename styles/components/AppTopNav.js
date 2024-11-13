import { Box } from '@chakra-ui/react';

export default function AppTopNav({ title, logo }) {

    return (
        <Box 
            id="app-top-nav" 
            px={0}
            borderBottom="1px solid #E6EAF2"
            bg="#ffffff"
        >
            {/* <Box color="brand.nightBlack" fontSize={{ base: 'sm', md: 'lg' }} display="flex" mt={{ base: '5', md: '8', xl:"10" }}>
                {logo && (
                    <Image src={logo} alt="Logo" boxSize="2rem" mr={2} />
                )}
            </Box> */}
            <Box color="brand.nightBlack" 
            fontSize={{ base: 'xs', md: '16pt', xl:"md" }}
            fontWeight="semibold"  
            pl="2em" 
            alignItems="center" 
            display="flex"
            my={{ base: '2.5', md: '4', xl:"5" }}

            >  
                <h2>{title}</h2>
                
            </Box>
        </Box>
    );
}
