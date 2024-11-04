import { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Box, Flex, Text, VStack, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ChalkboardTeacher, ClockCounterClockwise, UserSound, Presentation, User, Gear } from "@phosphor-icons/react";

// Define each variant and associated icon, label, and path(s)
const variants = {
  default: {
    label: "Dashboard",
    icon: <UserSound size={32} />,
    path: "/"
  },
  variant2: {
    label: "Mock Interview",
    icon: <ChalkboardTeacher size={32} />,
    path: "/mock-interview"
  },
  variant3: {
    label: "Practice Interview",
    icon: <Presentation size={32} />,
    path: [
      "/practice-interview",
      "/practice-interview-filter",
      "/practice-interview-questions",
      "/practice-interview-answer",
      "/practice"
    ]
  },
  variant4: {
    label: "History",
    icon: <ClockCounterClockwise size={32} />,
    path: "/history"
  },
};

// Define the bottom section items with default values
const defaultBottomVariants = {
  account: {
    label: "Account",
    icon: <User size={18} />,
    path: "/account"
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

// Main SideNavBar component
export const SideNavBar = ({ activeVariant, bottomVariants = defaultBottomVariants }) => {
  const router = useRouter();
  
  const isPathActive = (paths) => {
    if (Array.isArray(paths)) {
      return paths.includes(router.pathname);
    }
    return paths === router.pathname;
  };

  return (
    <Flex
      bg="brand.blueberryCreme"
      height="100vh"
      width="18rem"
      position="fixed"
      flexDir="column"
      overflow="hidden"
    >
      {/* logo box */}
      <Box
        width={{ md: "60%", lg: "70%", xl:"85%", "2xl": "90%" }}
        fontSize={{ base: 'sm', md: 'md' }}  
        align="center"
        mx="auto"
        mt={5}
      >
        <Link href="/">
          <Image src="logo.svg" alt="Onward Logo" style={{ padding: "0.6rem" }} width="100%" />
        </Link>
      </Box>

      {/* nav menu */}
      <Box mt="3rem" flex="1" overflow="hidden">
        <VStack align="flex-start" spacing={2} width="100%" ml={{ base: "0", md: "8%", lg: "10%", xl:"10%", "2xl":"10%" }}>
          {variants && Object.keys(variants).map((variant) => {
            const isActive = isPathActive(variants[variant].path);
            return (
              <Link href={Array.isArray(variants[variant].path) ? variants[variant].path[0] : variants[variant].path} key={variant} passHref>
                <Flex
                  align="center"
                  cursor="pointer"
                  width="280px"
                  bg={isActive ? "brand.blushPink" : "none"} // Active background
                  color={isActive ? "brand.frostWhite" : "initial"} // Active text color
                  p={3}
                  borderLeftRadius="26px"
                  transition="transform 0.5s ease-in-out, background-color 0.4s, color 0.4s"
                  _hover={{
                    bg: "brand.blushPink",
                    color: "brand.frostWhite",
                    borderRadius: "26px 0 0 26px",
                    transition: "background-color 0.3s, transform 0.3s",
                  }}
                >
                  <Box mr={4}>
                    {variants[variant].icon}
                  </Box>
                  <Text 
                    fontFamily="body" 
                    fontSize={{ base: "0", md: "10pt", lg: "xxxs", xl:"xxs", "2xl":"xs" }}
                    fontWeight="bold">
                    {variants[variant].label}
                  </Text>
                </Flex>
              </Link>
            );
          })}
        </VStack>
      </Box>

      {/* bottom section for account, settings, and sign Out Links */}
      <Box mb={3} width="100%">
        <VStack width="100%" align="flex-start" ml={7}>
        {Object.keys(bottomVariants).map((variant) => {
            const isActive = activeVariant === variant;
            return (
              <Link
                href={bottomVariants[variant].path}
                key={variant}
                passHref
              >
                <Flex
                  cursor="pointer"
                  align={"center"}
                  width="100%"
                  maxWidth="200px"
                  height="2rem"
                  pl="1rem"
                  bg={isActive ? "brand.pastelBlue" : "none"} // Active background
                  color={isActive ? "brand.nightBlack" : "initial"} // Active text color
                  borderRadius="sm"
                  pr="1.5rem"
                  gap={1}
                  transition="transform 0.3s ease-in-out, background-color 0.3s, color 0.3s"
                  _hover={{
                    color: "brand.nightBlack",
                    textDecoration: 'underline',
                    transition: "background-color 0.3s, transform 0.3s",
                  }}
                >
                  
                  <Box>
                    {bottomVariants[variant].icon}
                  </Box>
                  <Text 
                    fontFamily="body" 
                    fontSize={{ base: "0", md: "10pt", lg: "xxxs", xl:"xxxs", "2xl":"xxs" }}
                    fontWeight="semiBold" 
                    textAlign="left"
                    textDecoration={variant === 'signOut' ? 'underline' : 'none'}
                  >
                    {bottomVariants[variant].label}
                  </Text>
                </Flex>
              </Link>
            );
          })}
        </VStack>
      </Box>
    </Flex>
  );
};

SideNavBar.propTypes = {
  activeVariant: PropTypes.oneOf(["variant4", "variant2", "variant3", "default"]),
};

SideNavBar.defaultProps = {
  bottomVariants: {},
};
