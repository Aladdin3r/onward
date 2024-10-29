import { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Box, Flex, Text, VStack, Image } from "@chakra-ui/react";
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
    path: "/"
  }
};

// Main SideNavBar component
export const SideNavBar = ({ activeVariant, bottomVariants = defaultBottomVariants }) => {
  return (
    <Flex
      bg="brand.blueberryCreme"
      height="100vh"
      width="280px"
      position="fixed"
      flexDir="column"
    >
      {/* logo box */}
      <Box fontSize={{ base: 'sm', md: 'md' }} mt="1rem">
        <Link href="/">
          <Image src="logo.svg" alt="Onward Logo" style={{ padding: "0.6rem" }} width="100%" />
        </Link>
      </Box>

      {/* nav menu */}
      <Box mt="1.5rem" overflow="hidden">
        <VStack align="flex-start" spacing={2} width="100%" ml="10%">
          {variants && Object.keys(variants).map((variant) => {
            const isActive = activeVariant === variant;
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
                  <Box pl={isActive ? "5rem" : 0} mr={4}>
                    {variants[variant].icon}
                  </Box>
                  <Text fontFamily="body" fontSize="18px" fontWeight="bold">
                    {variants[variant].label}
                  </Text>
                </Flex>
              </Link>
            );
          })}
        </VStack>
      </Box>

      {/* Bottom Section for Account, Settings, and Sign Out Links */}
      <Box mb={2} mt="13rem" width="100%">
        <VStack width="100%" align="flex-end">
          {bottomVariants && Object.keys(bottomVariants).map((variant) => {
            const isActive = activeVariant === variant;
            return (
              <Link
                href={bottomVariants[variant].path}
                key={variant}
                passHref
              >
                <Flex
                  align="center"
                  cursor="pointer"
                  width="100%"
                  height="1.3rem"
                  bg={isActive ? "brand.blushPink" : "none"} // Active background
                  color={isActive ? "brand.frostWhite" : "initial"} // Active text color
                  borderRadius="md"
                  pr="1.5rem"
                  transition="transform 0.3s ease-in-out, background-color 0.3s, color 0.3s"
                  _hover={{
                    color: "brand.blushPink",
                    borderRadius: "26px 0 0 26px",
                    transition: "background-color 0.3s, transform 0.3s",
                  }}
                >
                  <Box mr={3}>
                    {bottomVariants[variant].icon}
                  </Box>
                  <Text fontFamily="body" fontSize="18px" fontWeight="regular" textAlign="left"
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
  bottomVariants: PropTypes.object, // Define bottomVariants as an optional object
};
