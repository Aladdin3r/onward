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
   <Flex width="100vw" height="100vh"overflowX="hidden">

    {/* Sidebar */}
    <Box as="nav" width="72">      
        <SideNavBar activeVariant={activeVariant} />
    </Box>
    
    {/* Main content area */}
    <Flex direction="column" flex="1"> 
      <Box>
        <AppTopNav title="Practice Overview" />
      </Box>

      {/* container for interview app content */}
      <Box pl={"72px"} minH={"100vh"} bg={"brand.frostWhite"}>
        <main>{children}</main>
      </Box>
    </Flex>
    </Flex>
    </>
  );
}