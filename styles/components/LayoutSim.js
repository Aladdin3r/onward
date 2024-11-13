import { Box, Flex } from "@chakra-ui/react";
import TopNav from "@/styles/components/TopNav";
import Footer from "@/styles/components/Footer";

// Simulation Layout Wrapper - NO Sidebar
export default function Layout({ children, pageTitle, showTopNav }) {
  return (
    <Flex
      maxW="1920px"
      mx="auto"
      minHeight="100vh"
      flexDirection="column"
      bg="brand.frostWhite"
    >
      <Box
        position="sticky"
        top="0"
        zIndex="1000"
        width="100%"
        bg="brand.frostWhite"
      >
        <TopNav />
      </Box>

      {/* Main content area that scrolls and grows */}
      <Box
        flex="1"
        px={{ base: "7", xl: "8", "2xl": "16" }}
        overflowY="auto" 
      >
        {children}
      </Box>

      <Box width="100%" bg="brand.footerGrey">
        <Footer />
      </Box>
    </Flex>
  );
}
