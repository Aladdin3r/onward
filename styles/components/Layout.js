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
    <Flex width="100vw" bg="brand.frostWhite">
      {/* Sidebar */}
      <Box
        as="nav"
        position="fixed"
        height="100vh"
        bg="white"
        zIndex="1000"

        width={{ base: "18rem", xl: "18rem", "2xl": "0" }}
      >
        <SideNavBar activeVariant={activeVariant} bottomVariants={bottomVariants} />
      </Box>

      {/* Main Content Area */}
      <Box
        flex="1"
        ml={{ base: "18rem", xl: "19rem", "2xl": "0" }}
        overflowX="hidden"
      >
        {showTopNav && <AppTopNav title={pageTitle} />}
        
        {/* Main content */}
        <Box
          minH="100vh"
          width={{ base: "calc(100vw - 18rem)", "2xl": "100vw" }}
          bg="brand.frostWhite"
          pt={pageTitle ? "72px" : "0"}
          overflowX="hidden"
        >
          <Flex justifyContent="center">
            <main>{children}</main>

          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}
