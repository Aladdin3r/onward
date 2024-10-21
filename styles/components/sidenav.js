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
} from "@phosphor-icons/react";

const variants = {
  default: {
    label: "Dashboard",
    icon: <ChalkboardTeacher size={32} />,
  },
  variant2: {
    label: "Mock Interview",
    icon: <UserSound size={32} />,
  },
  variant3: {
    label: "History",
    icon: <ClockCounterClockwise size={32} />,
  },
  variant4: {
    label: "History",
    icon: <ChalkboardTeacher size={32} />,
  },
};

export const SideNavBar = ({ property1 }) => {
  return (
    <Box
      bg="brand.blueberryCreme"
      height="1080px"
      width="275px"
      position="relative"
      p={4}
    >
      <VStack align="flex-start" spacing={6}>
        {Object.keys(variants).map((variant, index) => (
          <Flex
            key={variant}
            align="center"
            position="relative"
            cursor="pointer"
            width="100%"
            _hover={{
              bg: "brand.blushPink", // Hover background
              color: "brand.frostWhite",
              transform: "translateY(-2px)",
              borderRadius: "md",
              transition: "background-color 0.3s, transform 0.3s",
            }}
            bg={property1 === variant ? "brand.blushPink" : "none"} // Active state
            p={3} // Padding for hover area
            borderRadius="md" // Rounded corners
          >
            {property1 === variant && (
              <Box
                bg="#EA4A7D" // Blush Pink color
                borderRadius="26px 0 0 26px"
                height="52px"
                width="255px"
                position="absolute"
                left="20px"
                top={`${32 + index * 76}px`} // Adjust top position based on index
                zIndex={1}
              />
            )}
            <Box position="absolute" left="20px">
              {variants[variant].icon}
            </Box>
            <Text
              position="absolute"
              left="66px"
              fontFamily="var(--bold-body-p-font-family)"
              fontSize="var(--bold-body-p-font-size)"
              fontWeight="var(--bold-body-p-font-weight)"
              top="3px"
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
