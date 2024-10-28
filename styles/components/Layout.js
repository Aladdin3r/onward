// web-app layout with the sidebar and top bar layout

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

  // update active link based on the URL
  useEffect(() => {
    const currentPath = router.pathname;

    // matching it to variant prop
    const foundVariant = Object.keys(variants).find(
      (key) => variants[key] === currentPath
    );
    setActiveVariant(foundVariant || "default");
  }, [router.pathname]);

  return (
    <>
   <Flex 
      width="100%" 
      height="100vh" 
      overflowX="hidden"
   >
      {/* Sidebar */}
      <Box as="nav" width="72">      
          <SideNavBar activeVariant={activeVariant} />
      </Box>
      
      {/* Main content area */}
      <Box  flex="1" bg={"brand.frostWhite"}>
        <Box>
          <AppTopNav title="Practice Overview" />
        </Box>

        {/* container for interview app content */}
        <Box 
          minH={"100vh"} 
          maxWidth={{ base: "100%", md: "1200px" }}
          mx="auto" // Center the content
          bg={"brand.frostWhite"}
        >
          <Flex justify={"center"}>            
            <main>{children}</main>
          </Flex>
        </Box>
      </Box>
    </Flex>
    </>
  );
}