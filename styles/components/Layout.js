import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SideNavBar } from "@/styles/components/SideNav"; 
import AppTopNav from "@/styles/components/AppTopNav";
import { Box, Flex } from "@chakra-ui/react";

const variants = {
  default: "/",
  variant2: "/",
  variant3: "/practice",
  variant4: "/",
};

export default function Layout({ children }) {
  const router = useRouter(); 
  const [activeVariant, setActiveVariant] = useState("default");

  // Update active link based on the URL
  useEffect(() => {
    const currentPath = router.pathname;
    const foundVariant = Object.keys(variants).find(
      (key) => variants[key] === currentPath
    );
    setActiveVariant(foundVariant || "default");
  }, [router.pathname]);

  return (
    <Flex width="100%" height="100vh" overflow="hidden" bg="brand.frostWhite">
      {/* Sidebar */}
      <Box 
        as="nav" 
        position="fixed" 
        height="100vh" 
        bg="white" 
        zIndex="1000"
      >      
        <SideNavBar activeVariant={activeVariant} />
      </Box>
      
      {/* main content area */}
      <Box flex="1" marginLeft="72">
        <AppTopNav title="Practice Overview" />
        
        {/* interview app content */}
        <Box 
          minH="100vh" 
          maxWidth={{ base: "100%", md: "1200px" }}
          mx="auto"
          bg="brand.frostWhite"
        >
          <Flex justify="center">
            <main>{children}</main>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}
