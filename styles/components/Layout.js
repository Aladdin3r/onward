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
   <Flex>
      <SideNavBar activeVariant={activeVariant} />
      <Flex direction="column" flex="1"> 
        <Box>
          <AppTopNav title="Practice Overview" />
        </Box>
        <main>{children}</main>
      </Flex>
    </Flex>
    </>
  );
}