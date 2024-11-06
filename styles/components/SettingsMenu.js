// components/SettingsMenu.js
import { useState } from 'react';
import { Box, VStack, HStack, Text, Divider } from "@chakra-ui/react";
import { Gear, Globe, Cookie, ClipboardText, ThumbsUp, Phone, Question } from "@phosphor-icons/react";
import SettingsContent from './SettingsContent';

const MenuItem = ({ icon, label, isActive, onClick }) => (
  <VStack
    align="start"
    w="100%"
    onClick={onClick}
    cursor="pointer"
    p={2}
    borderRadius="md"
    _hover={{ bg: "gray.100" }}
    spacing={1}
  >
    <HStack spacing={3} w="100%" whiteSpace="nowrap">
      {icon}
      <Text fontWeight={isActive ? "bold" : "normal"} fontSize="16pt">{label}</Text>
      {isActive && <Box w="8px" h="8px" bg="pink.500" borderRadius="full" ml="auto" />}
    </HStack>
    <Divider />
  </VStack>
);

const SettingsMenu = () => {
  const [activeSection, setActiveSection] = useState("App Settings");

  return (
    <Box display="flex" justifyContent="center" p={12} bg="gray.50" minH="100vh">
      {/* Outer background container */}
      <Box
        w="50%"
        minW="900px"
        display="flex"
        justifyContent="space-between"
        p={8}
        bg="white"
        borderRadius="lg"
        shadow="md"
        border="1px solid"
        borderColor="gray.200"
        height={{ base: "auto", md: "70vh" }}
      >
        {/* Left-side menu */}
        <Box w="40%" minW="300px" maxW="320px" ml="10">
          {/* Main Settings Section */}
          <Box bg="white" shadow="sm" borderRadius="lg" p={4} mb={4} border="1px solid" borderColor="gray.200">
            <VStack align="stretch" spacing={3}>
              <MenuItem
                icon={<Gear size={20} />}
                label="App Settings"
                isActive={activeSection === "App Settings"}
                onClick={() => setActiveSection("App Settings")}
              />
              <MenuItem
                icon={<Globe size={20} />}
                label="Language"
                isActive={activeSection === "Language"}
                onClick={() => setActiveSection("Language")}
              />
              <MenuItem
                icon={<Gear size={20} />}
                label="AIMI's Settings"
                isActive={activeSection === "AIMI's Settings"}
                onClick={() => setActiveSection("AIMI's Settings")}
              />
              <MenuItem
                icon={<Cookie size={20} />}
                label="Privacy Policy"
                isActive={activeSection === "Privacy Policy"}
                onClick={() => setActiveSection("Privacy Policy")}
              />
              <MenuItem
                icon={<ClipboardText size={20} />}
                label="Terms & Conditions"
                isActive={activeSection === "Terms & Conditions"}
                onClick={() => setActiveSection("Terms & Conditions")}
              />
            </VStack>
          </Box>

          {/* Additional Section */}
          <Box bg="white" shadow="sm" borderRadius="lg" p={3} border="1px solid" borderColor="gray.200">
            <VStack align="stretch" spacing={3}>
              <MenuItem
                icon={<ThumbsUp size={20} />}
                label="Leave a Review!"
                isActive={activeSection === "Leave a Review!"}
                onClick={() => setActiveSection("Leave a Review!")}
              />
              <MenuItem
                icon={<Phone size={20} />}
                label="Contact us"
                isActive={activeSection === "Contact us"}
                onClick={() => setActiveSection("Contact us")}
              />
              <MenuItem
                icon={<Question size={20} />}
                label="FAQ"
                isActive={activeSection === "FAQ"}
                onClick={() => setActiveSection("FAQ")}
              />
            </VStack>
          </Box>
        </Box>

        {/* Vertical divider line in brand.pastelBlue */}
        <Divider orientation="vertical" borderColor="brand.pastelBlue" borderWidth="2px" mx={6} height="540px" />

        {/* Right-side content area */}
        <Box w="55%" p={5}>
          <SettingsContent activeSection={activeSection} />
        </Box>
      </Box>
    </Box>
  );
};

export default SettingsMenu;
