// components/SettingsContent.js
import { Box, VStack, HStack, Text, Switch, Select, Divider } from "@chakra-ui/react";

const SettingsContent = ({ activeSection }) => {
  const renderContent = () => {
    switch (activeSection) {
      case "App Settings":
        return (
          <VStack align="start" spacing={4}>
            <Text fontWeight="bold" fontSize="md">App Settings</Text>
            <HStack mt="5" w="100%" justifyContent="space-between">
              <Text fontSize="sm" fontWeight="semibold">Theme:</Text>
              <Select fontSize="sm" w="60%" defaultValue="Match System">
                <option value="Match System">Match System</option>
                <option value="Light">Light</option>
                <option value="Dark">Dark</option>
              </Select>
            </HStack>
            <HStack mt="5" w="100%" justifyContent="space-between">
              <Text fontSize="sm" fontWeight="semibold">Text size:</Text>
              <Select w="60%" defaultValue="Default">
                <option value="Default">Default</option>
                <option value="Large">Large</option>
                <option value="Small">Small</option>
              </Select>
            </HStack>
            <HStack mt="5" w="100%" justifyContent="space-between">
              <Text fontSize="sm" fontWeight="semibold">Auto save videos:</Text>
              <Switch mt={5} colorScheme="pink" />
            </HStack>
          </VStack>
        );
      case "Language":
        return (
          <VStack align="start" spacing={4}>
            <Text fontWeight="bold" fontSize="md">Language Settings</Text>
            <HStack mt="5" w="100%" justifyContent="space-between">
              <Text fontSize="sm" fontWeight="semibold">Select Language:</Text>
              <Select fontSize="sm" w="60%" defaultValue="English">
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
              </Select>
            </HStack>
          </VStack>
        );
      case "AIMI's Settings":
        return (
          <VStack align="start" spacing={4}>
            <Text fontWeight="bold" fontSize="md">AIMI's Settings</Text>
            <Text fontSize="sm">Adjust settings related to AIMI functionality.</Text>
            {/* Add specific AIMI settings here */}
          </VStack>
        );
      case "Privacy Policy":
        return (
          <VStack align="start" spacing={4}>
            <Text fontWeight="bold" fontSize="md">Privacy Policy</Text>
            <Text fontSize="sm">Your privacy is important to us. Please read our privacy policy.</Text>
          </VStack>
        );
      case "Terms & Conditions":
        return (
          <VStack align="start" spacing={4}>
            <Text fontWeight="bold" fontSize="md">Terms & Conditions</Text>
            <Text fontSize="sm">By using this app, you agree to our terms and conditions.</Text>
          </VStack>
        );
      case "Leave a Review!":
        return (
          <VStack align="start" spacing={4}>
            <Text fontWeight="bold" fontSize="md">Leave a Review!</Text>
            <Text fontSize="sm">We value your feedback. Please leave a review for us.</Text>
            {/* Include review form or link */}
          </VStack>
        );
      case "Contact us":
        return (
          <VStack align="start" spacing={4}>
            <Text fontWeight="bold" fontSize="md">Contact Us</Text>
            <Text fontSize="sm">If you have any questions, feel free to reach out!</Text>
            {/* Include contact form or details */}
          </VStack>
        );
      case "FAQ":
        return (
          <VStack align="start" spacing={4}>
            <Text fontWeight="bold" fontSize="md">FAQ</Text>
            <Text fontSize="sm">Find answers to common questions.</Text>
            {/* Include FAQ content */}
          </VStack>
        );
      default:
        return <Text fontWeight="bold" fontSize="md">Select a section to view its content.</Text>;
    }
  };

  return (
    <Box bg="white" shadow="sm" borderRadius="lg" p={6} minW="280px" minH="300px">
      {renderContent()}
    </Box>
  );
};

export default SettingsContent;
