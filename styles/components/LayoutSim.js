import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SideNavBar } from "@/styles/components/SideNav"; 
import TopNav from "@/styles/components/TopNav";
import { Box, Flex } from "@chakra-ui/react";
import { User, Gear } from "@phosphor-icons/react";
import Footer from "./Footer";

// Simulation Layout Wrapper - NO Sidebar

export default function Layout({ children, pageTitle, showTopNav }) {
  const router = useRouter(); 
  const [activeVariant, setActiveVariant] = useState("default");

  return (
    <Flex 
      maxW="1920px"
      mx="auto"
      minHeight="100vh"
      flexDirection="column"
      bg="brand.frostWhite"
    >
      {/* Main Content Area */}
      <Box
        flex="1"
        overflowX="hidden"
        display="flex"
        flexDirection="column"
      >
        <TopNav/>
        
        {/* Main content */}
        <Box
          flex="1"
          bg="brand.frostWhite"
          px={{ base: "7", xl: "8", "2xl": "16" }}
        >
          {children}
        </Box>

        {/* Footer */}
        <Footer />
      </Box>
    </Flex>
  );
}
