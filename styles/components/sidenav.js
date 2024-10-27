import PropTypes from "prop-types";
import React from "react";
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
    icon: <UserSound size={30} />,
  },
  variant2: {
    label: "Mock Interview",
    icon: <ChalkboardTeacher size={30} />,
  },
  variant3: {
    label: "Practice Interview",
    icon: <Presentation size={30} />,
  },
  variant4: {
    label: "History",
    icon: <ClockCounterClockwise size={30} />,
  },
};

export const SideNavBar = ({ property1 }) => {
  return (
    <Box
      bg="brand.blueberryCreme"
      height="100vh"
      width="25vw"
      position="relative"
      pt={5}
      pl={2}
    >
      <VStack align="flex-start" spacing={6}>
        {Object.keys(variants).map((variant, index) => (
          <Flex
            key={variant}
            align="center"
            justify="center"
            position="relative"
            cursor="pointer"
            width="100%"
            bg={property1 === variant ? "brand.blushPink" : "none"} // Active state
            color={property1 === variant ? "brand.frostWhite" : "initial"} // Active color
            borderRadius={
              property1 === variant
                ? "26px 0 0 26px" // Match hover border-radius for active state
                : "md"
            } // Rounded corners
            p={5} // Padding for hover area
            _hover={
              property1 !== variant // Only apply hover effect if not active
                ? {
                    bg: "brand.blushPink", // Hover background
                    height: "54px",
                    color: "brand.frostWhite",
                    borderTopRightRadius: "0",
                    borderBottomRightRadius: "0",
                    borderBottomLeftRadius: "26px",
                    borderTopLeftRadius: "26px",
                    transition: "background-color 0.3s, transform 0.3s",
                  }
                : {}
            }
          >
            <Box position="absolute" left="20px">
              {variants[variant].icon}
            </Box>
            <Text
              position="absolute"
              left="60px"
              fontFamily="body"
              fontSize="17px"
              fontWeight="bold"
              top="7px"
            >
              {variants[variant].label}
            </Text>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
};

SideNavBar.propTypes = {
  property1: PropTypes.oneOf(["variant-4", "variant-2", "variant-3", "default"]),
};