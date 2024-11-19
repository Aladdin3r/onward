import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SideNavBar } from "@/styles/components/SideNav"; 
import AppTopNav from "@/styles/components/AppTopNav";
import { Box, Flex } from "@chakra-ui/react";
import { User, Gear } from "@phosphor-icons/react";
import Footer from "./Footer";

export default function Layout({ children, pageTitle, showTopNav }) {
  const router = useRouter(); 
  const [activeVariant, setActiveVariant] = useState("default");

  const variants = {
    default: "/",
    variant2: "/mock-interview",
    variant3: "/practice",
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

  useEffect(() => {
    const currentPath = router.pathname;
    const foundVariant = Object.keys(variants).find(
      (key) =>
        variants[key] === currentPath ||
        (Array.isArray(variants[key]) && variants[key].some((p) => currentPath.startsWith(p)))
    );
    setActiveVariant(foundVariant || "default");
  }, [router.pathname]);

  return (
    <Flex 
      maxW="1920px"
      mx="auto"
      minHeight="100vh"
      flexDirection="column"
      bg="brand.frostWhite"
    >
      {/* Sidebar */}
      <Box
        as="nav"
        position="fixed"
        height="100vh"
        zIndex="1000"
        width={{ base: "14rem", sm: "14rem", xl: "18rem", "2xl": "18rem" }}
      >
        <SideNavBar activeVariant={activeVariant} bottomVariants={bottomVariants}/>
      </Box>

      {/* Main Content Area */}
      <Box
        flex="1"
        ml={{md: "14rem", lg:"19rem"}}
        overflowX="hidden"
        display="flex"
        flexDirection="column"
      >
        {showTopNav && <AppTopNav title={pageTitle} />}
        
        {/* Main content */}
        <Box
          flex="1"
          bg="brand.frostWhite"
          px={{ base: "7", xl: "8", "2xl": "16" }}
          display={"flex"}
          justifyContent={{ base: "center", xl: "space-evenly" }} 
        >
          {children}
        </Box>

        {/* Footer */}
        {/* <Footer /> */}
      </Box>
    </Flex>
  );
}
