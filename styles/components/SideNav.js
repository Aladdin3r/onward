'use client';
import { useState } from "react";
import PropTypes from "prop-types";
import React from "react";
import Link from "next/link";
import {
  Box,
  Flex,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  ChalkboardTeacher,
  ClockCounterClockwise,
  UserSound,
  Presentation,
} from "@phosphor-icons/react";

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
    path: "/practice-interview"
  },
  variant4: {
    label: "History",
    icon: <ClockCounterClockwise size={32} />,
    path: "/history"
  },
};

export const SideNavBar = ({ activeVariant }) => {
  return (
    <Box
      bg="brand.blueberryCreme"
      height="100vh"
      width="280px"
      position="relative"
      pt={5}
      pl={3}
    >
      <VStack align="flex-start" spacing={6} width="100%">
        {Object.keys(variants).map((variant) => (
          <Link href={variants[variant].path} key={variant} passHref>
            <Flex
              align="center"
              cursor="pointer"
              width="100%"
              bg={activeVariant === variant ? "brand.blushPink" : "none"} // Active state background
              color={activeVariant === variant ? "brand.frostWhite" : "initial"} // Active text color
              borderRadius={
                activeVariant === variant
                  ? "26px 0 0 26px" // Rounded corners for active state
                  : "md"
              }
              p={4} // Padding for hover area
              _hover={{
                bg: "brand.blushPink", // Hover background
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
                fontSize="20px"
                fontWeight="bold"
              >
                {variants[variant].label}
              </Text>
            </Flex>
          </Link>
        ))}
      </VStack>
    </Box>
  );
};

SideNavBar.propTypes = {
  activeVariant: PropTypes.oneOf(["variant4", "variant2", "variant3", "default"]),
};
