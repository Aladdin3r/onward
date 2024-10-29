import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SideNavBar } from "@/styles/components/SideNav"; 
import AppTopNav from "@/styles/components/AppTopNav";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { ChalkboardTeacher, ClockCounterClockwise, UserSound, Presentation, User, Gear } from "@phosphor-icons/react";

export default function Layout({ children, pageTitle, showTopNav}) {
  const router = useRouter(); 
  const [activeVariant, setActiveVariant] = useState("default");

  const variants = {
    default: "/",
    variant2: "/mock-interview",
    variant3: "/practice-interview",
    variant4: "/history",
  };

  const bottomVariants = {
    account: {
      label: "Account",
      icon: <User size={18} />,
      path: "/user"
    },
    settings: {
      label: "Settings",
      icon: <Gear size={18} />,
      path: "/settings"
    },
    signOut: {
      label: "Sign Out",
      icon: null,
      path: "/landing-page"
    }
  };


  // Update active link based on the URL
  useEffect(() => {
    const currentPath = router.pathname;
    const foundVariant = Object.keys(variants).find(
      (key) => variants[key] === currentPath || 
                (Array.isArray(variants[key]) && variants[key].some(p => currentPath.startsWith(p)))
    );
    setActiveVariant(foundVariant || "default");
  }, [router.pathname]);

  return (
    <Flex maxW="1920px" height="100vh" overflow="hidden" bg="brand.frostWhite">
      {/* Sidebar */}
      <Box 
        as="nav" 
        position="fixed" 
        height="100vh" 
        width="280px"
        bg="white" 
        zIndex="1000"
        overflowY="auto"
      >      
        <SideNavBar activeVariant={activeVariant} bottomVariants={bottomVariants}/>
      </Box>
      
      {/* main content area */}
      <Box flex="1" marginLeft="72">
      {showTopNav && <AppTopNav title={pageTitle} />}
        
        {/* Main content */}
        <Box 
          minH="100vh" 
          maxWidth={{ base: "100%", md: "1200px" }}
          mx="auto"
          bg="brand.frostWhite"
          px={4}
          pt={title ? "72px" : "0"} 
        >
          <Flex justify="center">
            <main>{children}</main>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}
