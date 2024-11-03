import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SideNavBar } from "@/styles/components/SideNav"; 
import AppTopNav from "@/styles/components/AppTopNav";
import { Box, Flex } from "@chakra-ui/react";
import { User, Gear } from "@phosphor-icons/react";

export default function Layout({ children, pageTitle, showTopNav }) {
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
        <SideNavBar activeVariant={activeVariant} bottomVariants={bottomVariants} />
      </Box>
      
      {/* Main content area */}
      <Box flex="1" marginLeft="200px"> {/* Match sidebar width */}
        {showTopNav && <AppTopNav title={pageTitle} />}
        
        {/* Main content */}
        <Box 
          minH="100vh" 
          maxWidth="100%" // Allow full width
          bg="brand.frostWhite"
          pt={pageTitle ? "72px" : "0"} 
          overflowY="auto"
        >
          <Flex justify="center">
            <Box width="100%" maxWidth="1200px" marginX="auto"> {/* Centered box for content */}
              <main>{children}</main>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}
