import { Box } from "@chakra-ui/react";

const Header = () => {
    return (
        <Box 
            as="header" 
            bg="white" 
            height="60px"  // Adjust height as needed
            position="fixed" 
            top="0" 
            left="250px" // Adjust according to the width of your sidebar
            right="0"
            zIndex="1000" // To ensure it's above other content
            display="flex" 
            alignItems="center" 
            paddingLeft="16px" // Adjust for some left padding
        >
            <h1 style={{ margin: 0 }}>Your Header Title</h1>
        </Box>
    );
};

export default Header;